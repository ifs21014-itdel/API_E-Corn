const db = require('../config/db');

const Features = {
  createFeature: async (title, description, imageUrl) => {
    const query = `INSERT INTO features (title, description, image_url) VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [title, description, imageUrl]);
    return result;
  },
  getFeatureById: async (id) => {
    const query = `SELECT * FROM features WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },
  getAllFeatures: async () => {
    const query = `SELECT * FROM features`;
    const [rows] = await db.execute(query);
    return rows;
  },
  updateFeature: async (id, title, description, imageUrl) => {
    const query = `
      UPDATE features 
      SET title = ?, description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?`;
    const [result] = await db.execute(query, [title, description, imageUrl, id]);
    return result;
  },
  deleteFeature: async (id) => {
    const query = `DELETE FROM features WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Features;
