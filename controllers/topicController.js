const TopicService = require('../services/topicService');

const TopicController = {
  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      const user_id = req.user.id; // Ambil user_id dari token
      const image_url = req.file ? req.file.filename : null;
      const result = await TopicService.create(title, content, user_id, image_url);
      res.status(201).json({ message: 'Topic created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const topics = await TopicService.getAll();
      res.status(200).json(topics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await TopicService.getById(id);
      res.status(200).json(topic);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const image_url = req.file ? req.file.filename : null;
      await TopicService.update(id, title, content, image_url);
      res.status(200).json({ message: 'Topic updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await TopicService.delete(id);
      res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = TopicController;
