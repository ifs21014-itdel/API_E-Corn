const NewsService = require('../services/newsService');

const NewsController = {
  create: async (req, res) => {
    try {
      const { title, content, date, source_url } = req.body;
      const image_url = req.file ? req.file.path : null; // Ambil path file jika gambar diunggah
      console.log('Request Body:', req.body);
      const result = await NewsService.create(title, content, date, image_url, source_url);
      res.status(201).json({ message: 'News created successfully', id: result.insertId });
    } catch (error) {
      console.error('Error creating news:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const newsList = await NewsService.getAll();
      res.status(200).json(newsList);
    } catch (error) {
      console.error('Error fetching news list:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await NewsService.getById(id);
      res.status(200).json(news);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(404).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, date, source_url } = req.body;
      const image_url = req.file ? req.file.path : null; // Ambil path file jika gambar diunggah
      await NewsService.update(id, title, content, date, image_url, source_url);
      res.status(200).json({ message: 'News updated successfully' });
    } catch (error) {
      console.error('Error updating news:', error);
      res.status(404).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await NewsService.delete(id);
      res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = NewsController;
