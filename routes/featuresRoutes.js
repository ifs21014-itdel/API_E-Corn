const express = require('express');
const router = express.Router();
const FeaturesController = require('../controllers/featuresController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Middleware untuk mengunggah gambar

// Route untuk membuat fitur baru dengan upload gambar
router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.fields([
  { name: 'image', maxCount: 1 }
]), FeaturesController.create);

// Route untuk memperbarui fitur dengan upload gambar
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.fields([
  { name: 'image', maxCount: 1 }
]), FeaturesController.update);

router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, FeaturesController.delete);
router.get('/', FeaturesController.getAll);
router.get('/:id', FeaturesController.getById);

module.exports = router;
