const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', userController.getIndex);
router.get('/register', userController.getRegister);
router.post('/register', userController.registerUser);
router.get('/login', userController.getLogin);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);

// Protected routes
router.get('/dashboard', protect, userController.getDashboard);

module.exports = router;