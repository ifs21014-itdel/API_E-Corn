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
};

module.exports = User;
