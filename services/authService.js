const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const AuthService = {
  register: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.createUser(username, email, hashedPassword);
  },
  login: async (email, password) => {
    const user = await User.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, user };
  },
};

module.exports = AuthService;
