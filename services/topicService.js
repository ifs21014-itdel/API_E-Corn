const Topic = require('../models/topicModel');

const TopicService = {
  create: async (title, content, user_id, image_url) => {
    return await Topic.createTopic(title, content, user_id, image_url);
  },

  getAll: async () => {
    return await Topic.getAllTopics();
  },

  getById: async (id) => {
    const topic = await Topic.getTopicById(id);
    if (!topic) throw new Error('Topic not found');
    return topic;
  },

  update: async (id, title, content, image_url) => {
    const topic = await Topic.getTopicById(id);
    if (!topic) throw new Error('Topic not found');
    return await Topic.updateTopic(id, title, content, image_url);
  },

  delete: async (id) => {
    const topic = await Topic.getTopicById(id);
    if (!topic) throw new Error('Topic not found');
    return await Topic.deleteTopic(id);
  },
};

module.exports = TopicService;
