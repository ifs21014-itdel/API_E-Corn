const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');

// Admin-only routes
router.post('/', AuthMiddleware, AdminOnlyMiddleware, AboutController.create);
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, AboutController.update);
router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, AboutController.delete);

// Routes untuk semua user
router.get('/', AuthMiddleware, AboutController.getAll);
router.get('/:id', AuthMiddleware, AboutController.getById);

module.exports = router;
