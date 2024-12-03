const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Middleware untuk mengunggah gambar

// Route untuk membuat, mengupdate, menghapus, dan mengambil data "About"
router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.fields([
  { name: 'gambar1', maxCount: 1 },
  { name: 'gambar2', maxCount: 1 },
  { name: 'gambar3', maxCount: 1 },
  { name: 'gambar4', maxCount: 1 }
]), AboutController.create);

router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.fields([
  { name: 'gambar1', maxCount: 1 },
  { name: 'gambar2', maxCount: 1 },
  { name: 'gambar3', maxCount: 1 },
  { name: 'gambar4', maxCount: 1 }
]), AboutController.update);

router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, AboutController.delete);

router.get('/', AboutController.getAll);
router.get('/:id', AuthMiddleware, AboutController.getById);

module.exports = router;
