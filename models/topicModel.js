const db = require('../config/db');

const Topic = {
  createTopic: async (title, content, user_id, image_url) => {
    const query = `
      INSERT INTO topics (title, content, user_id, image_url)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [title, content, user_id, image_url]);
    return result;
  },

  getAllTopics: async () => {
    const query = `
      SELECT t.*, 
             u.username AS author,
             (SELECT COUNT(*) FROM comments c WHERE c.topic_id = t.id) AS comment_count
      FROM topics t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  getTopicById: async (id) => {
    const query = `
      SELECT t.*, u.username AS author
      FROM topics t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  updateTopic: async (id, title, content, image_url) => {
    const query = `
      UPDATE topics
      SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [title, content, image_url, id]);
    return result;
  },

  deleteTopic: async (id) => {
    const query = `DELETE FROM topics WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Topic;
