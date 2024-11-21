const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import middleware CORS
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const featuresRoutes = require('./routes/featuresRoutes');

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Alamat frontend React Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    credentials: true, // Izinkan pengiriman cookies/authorization header
  })
);

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/features', featuresRoutes);

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
