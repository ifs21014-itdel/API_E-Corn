const About = require('../models/aboutModel');

const AboutService = {
  create: async (judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4) => {
    return await About.createAbout(judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4);
  },

  getById: async (id) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return about;
  },

  getAll: async () => {
    return await About.getAllAbout();
  },

  update: async (id, judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return await About.updateAbout(id, judul, deskripsiSingkat, deskripsiPanjang, gambar1, gambar2, gambar3, gambar4);
  },

  delete: async (id) => {
    const about = await About.getAboutById(id);
    if (!about) throw new Error('About entry not found');
    return await About.deleteAbout(id);
  },
};

module.exports = AboutService;
