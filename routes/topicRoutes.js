const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topicController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.post('/', AuthMiddleware, upload.single('image'), TopicController.create);
router.get('/', AuthMiddleware, TopicController.getAll);
router.get('/:id', AuthMiddleware, TopicController.getById);
router.put('/:id', AuthMiddleware, upload.single('image'), TopicController.update);
router.delete('/:id', AuthMiddleware, TopicController.delete);

module.exports = router;
