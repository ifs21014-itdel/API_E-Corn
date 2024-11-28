const News = require('../models/newsModel');

const NewsService = {
  create: async (title, content, image_url, source_url) => {
    return await News.createNews(title, content, image_url, source_url);
  },

  getAll: async () => {
    return await News.getAllNews();
  },

  getById: async (id) => {
    const news = await News.getNewsById(id);
    if (!news) throw new Error('News not found');
    return news;
  },

  update: async (id, title, content, image_url, source_url) => {
    const news = await News.getNewsById(id);
    if (!news) throw new Error('News not found');
    return await News.updateNews(id, title, content, image_url, source_url);
  },

  delete: async (id) => {
    const news = await News.getNewsById(id);
    if (!news) throw new Error('News not found');
    return await News.deleteNews(id);
  },
};

module.exports = NewsService;
