const db = require('../config/db');

const Education = {
  createEducation: async (title, content, audio_url, video_url, image) => {
    const query = `
      INSERT INTO educations (title, content, audio_url, video_url, image) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [title, content, audio_url, video_url, image]);
    return result;
  },

  getAllEducations: async () => {
    const query = `SELECT * FROM educations`;
    const [rows] = await db.execute(query);
    return rows;
  },

  getEducationById: async (id) => {
    const query = `SELECT * FROM educations WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  updateEducation: async (id, title, content, audio_url, video_url, image) => {
    const query = `
      UPDATE educations 
      SET title = ?, content = ?, audio_url = ?, video_url = ?, image = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [title, content, audio_url, video_url, image, id]);
    return result;
  },

  deleteEducation: async (id) => {
    const query = `DELETE FROM educations WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Education;
