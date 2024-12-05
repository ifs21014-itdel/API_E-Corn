const Features = require('../models/featuresModel');

const FeaturesService = {
  create: async (title, description, imageUrl) => {
    return await Features.createFeature(title, description, imageUrl);
  },

  getById: async (id) => {
    const feature = await Features.getFeatureById(id);
    if (!feature) throw new Error('Feature not found');
    return feature;
  },

  getAll: async () => {
    return await Features.getAllFeatures();
  },

  update: async (id, title, description, imageUrl) => {
    const feature = await Features.getFeatureById(id);
    if (!feature) throw new Error('Feature not found');
    return await Features.updateFeature(id, title, description, imageUrl);
  },

  delete: async (id) => {
    const feature = await Features.getFeatureById(id);
    if (!feature) throw new Error('Feature not found');
    return await Features.deleteFeature(id);
  },
};

module.exports = FeaturesService;
