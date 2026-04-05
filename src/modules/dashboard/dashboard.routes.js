const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const roleMiddleware = require('../../middleware/role.middleware');

router.get('/summary', authMiddleware, roleMiddleware('admin', 'analyst'), dashboardController.getSummary);
router.get('/category-wise', authMiddleware, roleMiddleware('admin', 'analyst'), dashboardController.getCategoryWise);
router.get('/trends', authMiddleware, roleMiddleware('admin', 'analyst'), dashboardController.getMonthlyTrends);
router.get('/recent', authMiddleware, roleMiddleware('admin', 'analyst'), dashboardController.getRecentActivity);

module.exports = router;