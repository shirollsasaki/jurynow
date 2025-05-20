// JuryNow API Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../build')));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
const juryRoutes = require('./routes/jury');
const verdictRoutes = require('./routes/verdicts');
const analyticsRoutes = require('./routes/analytics');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/jury', juryRoutes);
app.use('/api/verdicts', verdictRoutes);
app.use('/api/analytics', analyticsRoutes);

// SPA catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server error',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JuryNow API server running on port ${PORT}`);
});

module.exports = app;
