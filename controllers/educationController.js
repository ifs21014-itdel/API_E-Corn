const EducationService = require('../services/educationService');

const EducationController = {
  create: async (req, res) => {
    try {
      console.log('File:', req.file); // Log file yang diunggah
      console.log('Body:', req.body); // Log data body
      const { title, content, audio_url, video_url } = req.body;
      const image = req.file ? req.file.filename : null; // Nama file yang diunggah
      const result = await EducationService.create(title, content, audio_url, video_url, image);
      res.status(201).json({ message: 'File uploaded successfully', image });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const educations = await EducationService.getAll();
      res.status(200).json(educations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const education = await EducationService.getById(id);
      res.status(200).json(education);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, audio_url, video_url } = req.body;
      const image = req.file ? req.file.filename : null;
      await EducationService.update(id, title, content, audio_url, video_url, image);
      res.status(200).json({ message: 'Education entry updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await EducationService.delete(id);
      res.status(200).json({ message: 'Education entry deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = EducationController;
