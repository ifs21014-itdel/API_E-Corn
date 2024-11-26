const AboutService = require('../services/aboutService');

const AboutController = {
  create: async (req, res) => {
    try {
      console.log(req.file); // Log untuk memeriksa apakah file diterima
      console.log(req.body); // Log untuk memeriksa data lainnya
  
      const { judul, deskripsiSingkat, deskripsiPanjang } = req.body;
      const gambar = req.file ? req.file.filename : null; // Ambil nama file atau null
      const result = await AboutService.create(judul, deskripsiSingkat, deskripsiPanjang, gambar);
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
      const gambar = req.file ? req.file.filename : null; // Ambil nama file yang diunggah
      await AboutService.update(id, judul, deskripsiSingkat, deskripsiPanjang, gambar);
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
