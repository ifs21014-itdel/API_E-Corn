const FeaturesService = require('../services/featuresService');

const FeaturesController = {
  create: async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
      const result = await FeaturesService.create(title, description, imageUrl);
      res.status(201).json({ message: 'Feature created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const feature = await FeaturesService.getById(id);
      res.status(200).json(feature);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const features = await FeaturesService.getAll();
      res.status(200).json(features);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, imageUrl } = req.body;
      await FeaturesService.update(id, title, description, imageUrl);
      res.status(200).json({ message: 'Feature updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await FeaturesService.delete(id);
      res.status(200).json({ message: 'Feature deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = FeaturesController;
