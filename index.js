const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const featuresRoutes = require('./routes/featuresRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/features', featuresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
