const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), NewsController.create);
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), NewsController.update);
router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, NewsController.delete);


router.get('/', AuthMiddleware, NewsController.getAll);
router.get('/:id', AuthMiddleware, NewsController.getById);

module.exports = router;
