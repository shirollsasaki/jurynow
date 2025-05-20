// Main API router for JuryNow
const express = require('express');
const router = express.Router();

// Import route modules
const questionRoutes = require('./routes/questions');
const juryRoutes = require('./routes/jury');
const verdictRoutes = require('./routes/verdicts');
const userRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');

// Register route handlers
router.use('/questions', questionRoutes);
router.use('/jury', juryRoutes);
router.use('/verdicts', verdictRoutes);
router.use('/users', userRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/auth', authRoutes);

// API status endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
