const express = require('express')
const router = express.Router()
const userController = require('./users.controller');
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')


router.get('/:id',authMiddleware,roleMiddleware('admin'),userController.getUserById);
router.get('/',authMiddleware,roleMiddleware('admin'),userController.getAllUsers);
router.patch('/:id/role',authMiddleware,roleMiddleware('admin'),userController.updateUserRole);
router.patch('/:id/status',authMiddleware,roleMiddleware('admin'),userController.updateUserStatus);


module.exports = router;


