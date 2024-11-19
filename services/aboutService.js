const About = require('../models/aboutModel');

const AboutService = {
  create: async (judul, deskripsiSingkat, deskripsiPanjang, gambar) => {
    return await About.createAbout(judul, deskripsiSingkat, deskripsiPanjang, gambar);
  },
  getById: async (id) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return about;
  },
  getAll: async () => {
    return await About.getAllAbout();
  },
  update: async (id, judul, deskripsiSingkat, deskripsiPanjang, gambar) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return await About.updateAbout(id, judul, deskripsiSingkat, deskripsiPanjang, gambar);
  },
  delete: async (id) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return await About.deleteAbout(id);
  },
};

module.exports = AboutService;
