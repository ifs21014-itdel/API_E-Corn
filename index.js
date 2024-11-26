const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import middleware CORS
const fs = require('fs'); // File system module
const path = require('path'); // Path module
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const featuresRoutes = require('./routes/featuresRoutes'); // Import sekali saja

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: 'http://localhost:5174', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, // Izinkan pengiriman cookies/authorization header
  })
);

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Pastikan folder `uploads` tersedia
const uploadDir = path.join(__dirname, 'uploads'); // Path folder `uploads` di root proyek
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Buat folder jika belum ada
  console.log('Folder uploads dibuat');
}

// Berikan akses publik ke file dalam folder `uploads`
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/features', featuresRoutes);

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
