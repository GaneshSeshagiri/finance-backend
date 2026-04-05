const dashboardService = require('./dashboard.service');

const getSummary = async (req, res, next) => {
  try {
    const summary = await dashboardService.getSummary();

    res.json({
      success: true,
      data: summary
    });

  } catch (err) {
    next(err);
  }
};

const getCategoryWise = async (req, res, next) => {
  try {
    const data = await dashboardService.getCategoryWise();

    res.json({
      success: true,
      data: data
    });

  } catch (err) {
    next(err);
  }
};

const getMonthlyTrends = async (req, res, next) => {
  try {
    const data = await dashboardService.getMonthlyTrends();

    res.json({
      success: true,
      data: data
    });

  } catch (err) {
    next(err);
  }
};

const getRecentActivity = async (req, res, next) => {
  try {
    const data = await dashboardService.getRecentActivity();

    res.json({
      success: true,
      data: data
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getSummary, getCategoryWise, getMonthlyTrends, getRecentActivity };