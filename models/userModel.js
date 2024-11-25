const db = require("../config/db");

const User = {
  createUser: async (username, email, password, role = "user") => {
    const query = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(query, [username, email, password, role]);
    return result;
  },
  getUserByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },
  getAllUsers: async () => {
    const query = `SELECT id, username, email, role FROM users`;
    const [rows] = await db.execute(query);
    return rows;
  },
  updateUser: async (id, updates) => {
    const { username, email, role } = updates;
    const query = `UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?`;
    const [result] = await db.execute(query, [username, email, role, id]);
    return result;
  },
  deleteUser: async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = User;
