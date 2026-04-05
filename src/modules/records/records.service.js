const pool = require('../../config/db');

const createRecord = async (userId, amount, type, category, date, notes) => {
  if (!amount || amount <= 0) {
    const error = new Error('Amount must be greater than 0');
    error.status = 400;
    throw error;
  }

  const allowedTypes = ['income', 'expense'];
  if (!allowedTypes.includes(type)) {
    const error = new Error('Type must be income or expense');
    error.status = 400;
    throw error;
  }

  if (!category) {
    const error = new Error('Category is required');
    error.status = 400;
    throw error;
  }

  if (!date) {
    const error = new Error('Date is required');
    error.status = 400;
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO finance_records 
     (user_id, amount, type, category, date, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, amount, type, category, date, notes]
  );

  return result.rows[0];
};

const getAllRecords = async (filters) => {
  const { type, category, date } = filters;

  let query = 'SELECT * FROM finance_records WHERE 1=1';
  const params = [];

  if (type) {
    params.push(type);
    query += ` AND type = $${params.length}`;
  }

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (date) {
    params.push(date);
    query += ` AND date = $${params.length}`;
  }

  query += ' ORDER BY date DESC';

  const result = await pool.query(query, params);
  return result.rows;
};

const updateRecord = async (id, amount, type, category, date, notes) => {
  const existing = await pool.query(
    'SELECT id FROM finance_records WHERE id = $1',
    [id]
  );

  if (existing.rowCount === 0) {
    const error = new Error('Record not found');
    error.status = 404;
    throw error;
  }

  const result = await pool.query(
    `UPDATE finance_records 
     SET amount = $1, type = $2, category = $3, date = $4, notes = $5
     WHERE id = $6
     RETURNING *`,
    [amount, type, category, date, notes, id]
  );

  return result.rows[0];
};

const deleteRecord = async (id) => {
  const existing = await pool.query(
    'SELECT id FROM finance_records WHERE id = $1',
    [id]
  );

  if (existing.rowCount === 0) {
    const error = new Error('Record not found');
    error.status = 404;
    throw error;
  }

  await pool.query(
    'DELETE FROM finance_records WHERE id = $1',
    [id]
  );

  return { message: 'Record deleted successfully' };
};

module.exports = { createRecord, getAllRecords, updateRecord, deleteRecord };