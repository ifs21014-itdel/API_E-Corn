const Comment = require('../models/commentModel');

const CommentService = {
  create: async (topic_id, user_id, content) => {
    return await Comment.createComment(topic_id, user_id, content);
  },

  getByTopicId: async (topic_id) => {
    return await Comment.getCommentsByTopicId(topic_id);
  },

  countByTopicId: async (topic_id) => {
    return await Comment.countCommentsByTopicId(topic_id);
  },

  delete: async (id) => {
    return await Comment.deleteComment(id);
  },
};

module.exports = CommentService;
