const AboutService = require('../services/aboutService');

const AboutController = {
  create: async (req, res) => {
    try {
      const { judul, deskripsiSingkat, deskripsiPanjang } = req.body;

      // Menangani gambar
      const gambar1 = req.files?.gambar1 ? req.files.gambar1[0].filename : null;
      const gambar2 = req.files?.gambar2 ? req.files.gambar2[0].filename : null;
      const gambar3 = req.files?.gambar3 ? req.files.gambar3[0].filename : null;
      const gambar4 = req.files?.gambar4 ? req.files.gambar4[0].filename : null;

      // Menyimpan data
      const result = await AboutService.create(judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4);
      res.status(201).json({ message: 'About entry created successfully', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const about = await AboutService.getById(id);
      res.status(200).json(about);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const aboutList = await AboutService.getAll();
      res.status(200).json(aboutList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { judul, deskripsiSingkat, deskripsiPanjang } = req.body;

      // Menangani gambar
      const gambar1 = req.files?.gambar1 ? req.files.gambar1[0].filename : null;
      const gambar2 = req.files?.gambar2 ? req.files.gambar2[0].filename : null;
      const gambar3 = req.files?.gambar3 ? req.files.gambar3[0].filename : null;
      const gambar4 = req.files?.gambar4 ? req.files.gambar4[0].filename : null;

      // Memperbarui data
      await AboutService.update(id, judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4);
      res.status(200).json({ message: 'About entry updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await AboutService.delete(id);
      res.status(200).json({ message: 'About entry deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = AboutController;
