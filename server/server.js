const path = require('path');
require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
