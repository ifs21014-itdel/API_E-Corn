const AuthService = require("../services/authService");

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      await AuthService.register(username, email, password, role);
      res.status(201).json({ message: "User registered successfully" });
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
  getAllUsers: async (req, res) => {
    try {
      const users = await AuthService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, role } = req.body;
      const updatedUser = await AuthService.editUser(req.user, id, { username, email, role });
      res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await AuthService.deleteUser(req.user, id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
