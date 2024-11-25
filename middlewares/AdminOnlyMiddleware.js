const AdminOnlyMiddleware = (req, res, next) => {
    // Hanya periksa apakah req.user sudah disiapkan dan role-nya adalah admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
  };
  
  module.exports = AdminOnlyMiddleware;
  