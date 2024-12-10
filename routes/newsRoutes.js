const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Middleware untuk upload file

// Route untuk berita
router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), NewsController.create);
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), NewsController.update);
router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, NewsController.delete);
router.get('/',  NewsController.getAll);
router.get('/:id',  NewsController.getById);

module.exports = router;
