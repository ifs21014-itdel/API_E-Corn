const Education = require('../models/educationModel');

const EducationService = {
  create: async (title, content, audio_url, video_url, image) => {
    return await Education.createEducation(title, content, audio_url, video_url, image);
  },

  getAll: async () => {
    return await Education.getAllEducations();
  },

  getById: async (id) => {
    const education = await Education.getEducationById(id);
    if (!education) throw new Error('Education entry not found');
    return education;
  },

  update: async (id, title, content, audio_url, video_url, image) => {
    const education = await Education.getEducationById(id);
    if (!education) throw new Error('Education entry not found');
    return await Education.updateEducation(id, title, content, audio_url, video_url, image);
  },

  delete: async (id) => {
    const education = await Education.getEducationById(id);
    if (!education) throw new Error('Education entry not found');
    return await Education.deleteEducation(id);
  },
};

module.exports = EducationService;
