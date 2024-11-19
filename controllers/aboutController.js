const AboutService = require('../services/aboutService');

const AboutController = {
  create: async (req, res) => {
    try {
      const { judul, deskripsiSingkat, deskripsiPanjang, gambar } = req.body;
      const result = await AboutService.create(judul, deskripsiSingkat, deskripsiPanjang, gambar);
      res.status(201).json({ message: 'About entry created successfully', id: result.insertId });
    } catch (error) {
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
      const { judul, deskripsiSingkat, deskripsiPanjang, gambar } = req.body;
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
