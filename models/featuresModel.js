const db = require('../config/db');

const Features = {
  createFeature: async (title, description, image) => {
    const query = `INSERT INTO features (title, description, image) VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [title, description, image]);
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

  updateFeature: async (id, title, description, image) => {
    let query, params;

    // Jika ada gambar baru, masukkan juga ke dalam query
    if (image) {
      query = `
        UPDATE features 
        SET title = ?, description = ?, image = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?`;
      params = [title, description, image, id];
    } else {
      // Jika tidak ada gambar, update hanya title dan description
      query = `
        UPDATE features 
        SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?`;
      params = [title, description, id];
    }

    const [result] = await db.execute(query, params);
    return result;
  },

  deleteFeature: async (id) => {
    const query = `DELETE FROM features WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Features;
