const db = require('../config/db');

const User = {
  createUser: async (username, email, password) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [username, email, password]);
    return result;
  },
  getUserByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },
};

module.exports = User;
