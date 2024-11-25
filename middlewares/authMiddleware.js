const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Simpan data ke req.user
    next(); // Lanjut ke middleware berikutnya
  } catch (error) {
    console.error('Error in AuthMiddleware:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = AuthMiddleware;
