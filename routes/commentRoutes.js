const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.post('/', AuthMiddleware, CommentController.create); 
router.get('/:topic_id', AuthMiddleware, CommentController.getByTopicId); 
router.get('/:topic_id/count', AuthMiddleware, CommentController.countByTopicId); 
router.delete('/:id', AuthMiddleware, CommentController.delete); 

module.exports = router;
