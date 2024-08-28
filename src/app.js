const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Use middleware for JSON request bodies
app.use(express.json());

// API routes
app.use('/api', require('./routes/userRoutes'));

// Serve the main HTML file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Sync database and start server
const { sequelize } = require('../models'); // Adjusted path to models

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = app;
