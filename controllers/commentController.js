const CommentService = require('../services/commentService');

const CommentController = {
  create: async (req, res) => {
    try {
      const { topic_id, content } = req.body;
      const user_id = req.user.id; // Ambil user_id dari token autentikasi
      const result = await CommentService.create(topic_id, user_id, content);
      res.status(201).json({ message: 'Comment created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByTopicId: async (req, res) => {
    try {
      const { topic_id } = req.params;
      const comments = await CommentService.getByTopicId(topic_id);
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  countByTopicId: async (req, res) => {
    try {
      const { topic_id } = req.params;
      const commentCount = await CommentService.countByTopicId(topic_id);
      res.status(200).json({ topic_id, comment_count: commentCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await CommentService.delete(id);
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = CommentController;
