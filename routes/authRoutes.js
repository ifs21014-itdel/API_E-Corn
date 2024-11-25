const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController'); 
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');


router.post('/login', AuthController.login);
router.post('/register', AuthMiddleware, AdminOnlyMiddleware, AuthController.register);
module.exports = router;
