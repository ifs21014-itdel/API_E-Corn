const db = require('../config/db');

const News = {
  createNews: async (title, content, image_url, source_url) => {
    const query = `
      INSERT INTO news (title, content, image_url, source_url)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [title, content, image_url, source_url]);
    return result;
  },

  getAllNews: async () => {
    const query = `SELECT * FROM news ORDER BY created_at DESC`;
    const [rows] = await db.execute(query);
    return rows;
  },

  getNewsById: async (id) => {
    const query = `SELECT * FROM news WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  updateNews: async (id, title, content, image_url, source_url) => {
    const query = `
      UPDATE news
      SET title = ?, content = ?, image_url = ?, source_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [title, content, image_url, source_url, id]);
    return result;
  },

  deleteNews: async (id) => {
    const query = `DELETE FROM news WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = News;
