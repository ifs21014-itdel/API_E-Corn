const AuthService = require('../services/authService');

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      await AuthService.register(username, email, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
