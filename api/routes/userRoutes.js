const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyTokenAndAdmin } = require('./verifyToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getuser/:userId', verifyTokenAndAdmin, userController.getUserProfile);

module.exports = router;
