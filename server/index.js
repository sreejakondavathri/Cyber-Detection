const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed
const path = require('path');  
const fs = require('fs');
const axios = require('axios');

const app = express();
//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

//middlewware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Use auth routes
app.use('/auth', authRoutes);

// Serve the JSON file directly
app.get('/api/dataset', (req, res) => {
    const filePath = path.join(__dirname, 'datasets', 'FinalMergedDatabase.json');
  
    // Check if the JSON file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
  
    // Read the JSON file
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read the file' });
      }
  
      // Parse and send the JSON data
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (err) {
        return res.status(500).json({ error: 'Invalid JSON file' });
      }
    });
});

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))

