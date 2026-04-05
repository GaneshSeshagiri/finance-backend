const pool = require('../../config/db');

const getSummary = async () => {
  // Total income
  const incomeResult = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) as total 
     FROM finance_records WHERE type = 'income'`
  );

  // Total expenses
  const expenseResult = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) as total 
     FROM finance_records WHERE type = 'expense'`
  );

  const totalIncome = parseFloat(incomeResult.rows[0].total);
  const totalExpenses = parseFloat(expenseResult.rows[0].total);
  const netBalance = totalIncome - totalExpenses;

  return {
    total_income: totalIncome,
    total_expenses: totalExpenses,
    net_balance: netBalance
  };
};

const getCategoryWise = async () => {
  const result = await pool.query(
    `SELECT category, type, SUM(amount) as total
     FROM finance_records
     GROUP BY category, type
     ORDER BY total DESC`
  );

  return result.rows;
};

const getMonthlyTrends = async () => {
  const result = await pool.query(
    `SELECT 
       TO_CHAR(date, 'YYYY-MM') as month,
       type,
       SUM(amount) as total
     FROM finance_records
     GROUP BY month, type
     ORDER BY month DESC`
  );

  return result.rows;
};

const getRecentActivity = async () => {
  const result = await pool.query(
    `SELECT * FROM finance_records
     ORDER BY created_at DESC
     LIMIT 10`
  );

  return result.rows;
};

module.exports = { getSummary, getCategoryWise, getMonthlyTrends, getRecentActivity };