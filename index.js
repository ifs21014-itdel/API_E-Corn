const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs'); 
const path = require('path'); 
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const featuresRoutes = require('./routes/featuresRoutes'); 
const educationRoutes = require('./routes/educationRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const topicRoutes = require('./routes/topicRoutes'); 




const app = express();


app.use(
  cors({
    origin: 'http://localhost:5176', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  })
);


app.use(bodyParser.json());


const uploadDir = path.join(__dirname, 'uploads'); 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Folder uploads dibuat');
}


app.use('/uploads', express.static(uploadDir));

app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/features', featuresRoutes);
app.use('/educations', educationRoutes); 
app.use('/news', newsRoutes);
app.use('/topics', topicRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
