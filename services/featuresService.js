const Features = require('../models/featuresModel');

const FeaturesService = {
  getAll: async () => {
    return await Features.getAll();
  },
  getById: async (id) => {
    const feature = await Features.getById(id);
    if (!feature) throw new Error('Feature not found');
    return feature;
  },
  create: async (title, description, imageUrl) => {
    return await Features.create(title, description, imageUrl);
  },
  update: async (id, title, description, imageUrl) => {
    const feature = await Features.getById(id);
    if (!feature) throw new Error('Feature not found');
    return await Features.update(id, title, description, imageUrl);
  },
  delete: async (id) => {
    const feature = await Features.getById(id);
    if (!feature) throw new Error('Feature not found');
    return await Features.delete(id);
  },
};

module.exports = FeaturesService;
