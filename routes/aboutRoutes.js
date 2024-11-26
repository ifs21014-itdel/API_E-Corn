const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Admin-only routes
router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.single('gambar'), AboutController.create);
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.single('gambar'), AboutController.update);
router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, AboutController.delete);

// Routes untuk semua user
router.get('/', AuthMiddleware, AboutController.getAll);
router.get('/:id', AuthMiddleware, AboutController.getById);

module.exports = router;
