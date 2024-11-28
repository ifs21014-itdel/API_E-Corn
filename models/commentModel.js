const db = require('../config/db');

const Comment = {
  createComment: async (topic_id, user_id, content) => {
    const query = `
      INSERT INTO comments (topic_id, user_id, content)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [topic_id, user_id, content]);
    return result;
  },

  getCommentsByTopicId: async (topic_id) => {
    const query = `
      SELECT c.*, u.username AS author
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.topic_id = ?
      ORDER BY c.created_at ASC
    `;
    const [rows] = await db.execute(query, [topic_id]);
    return rows;
  },

  countCommentsByTopicId: async (topic_id) => {
    const query = `
      SELECT COUNT(*) AS comment_count
      FROM comments
      WHERE topic_id = ?
    `;
    const [rows] = await db.execute(query, [topic_id]);
    return rows[0].comment_count;
  },

  deleteComment: async (id) => {
    const query = `DELETE FROM comments WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Comment;
