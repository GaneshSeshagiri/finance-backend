const express = require('express');
const router = express.Router();
const recordsController = require('./records.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const roleMiddleware = require('../../middleware/role.middleware');

router.post('/', authMiddleware, roleMiddleware('admin'), recordsController.createRecord);
router.get('/', authMiddleware, roleMiddleware('admin', 'analyst'), recordsController.getAllRecords);
router.put('/:id', authMiddleware, roleMiddleware('admin'), recordsController.updateRecord);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), recordsController.deleteRecord);

module.exports = router;