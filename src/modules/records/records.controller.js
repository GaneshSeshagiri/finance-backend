const recordsService = require('./records.service');

const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    const userId = req.user.id;

    const record = await recordsService.createRecord(
      userId, amount, type, category, date, notes
    );

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: record
    });

  } catch (err) {
    next(err);
  }
};

const getAllRecords = async (req, res, next) => {
  try {
    const filters = req.query;

    const records = await recordsService.getAllRecords(filters);

    res.json({
      success: true,
      count: records.length,
      data: records
    });

  } catch (err) {
    next(err);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    const record = await recordsService.updateRecord(
      id, amount, type, category, date, notes
    );

    res.json({
      success: true,
      message: 'Record updated successfully',
      data: record
    });

  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await recordsService.deleteRecord(id);

    res.json({
      success: true,
      message: result.message
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { createRecord, getAllRecords, updateRecord, deleteRecord };