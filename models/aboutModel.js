const db = require('../config/db');

const About = {
  createAbout: async (judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4) => {
    const query = `
      INSERT INTO about (judul, deskripsi_singkat, deskripsi_panjang, gambar1, gambar2, gambar3, gambar4) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4]);
    return result;
  },

  getAboutById: async (id) => {
    const query = `SELECT * FROM about WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  getAllAbout: async () => {
    const query = `SELECT * FROM about`;
    const [rows] = await db.execute(query);
    return rows;
  },

  updateAbout: async (id, judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4) => {
    const query = `
      UPDATE about 
      SET judul = ?, deskripsi_singkat = ?, deskripsi_panjang = ?, gambar1 = ?, gambar2 = ?, gambar3 = ?, gambar4 = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`;
    const [result] = await db.execute(query, [judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4, id]);
    return result;
  },

  deleteAbout: async (id) => {
    const query = `DELETE FROM about WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = About;
