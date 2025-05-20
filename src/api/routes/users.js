// User routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

/**
 * @route   GET /api/users/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    // In actual implementation, fetch user from database
    const user = {
      id: req.user.id,
      farcaster: req.user.farcaster,
      email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
      isJuror: req.user.isJuror || false,
      stats: {
        questionsAsked: 15,
        questionsCompleted: 12,
        averageResponseTime: '3.2 hours'
      },
      preferences: {
        notifications: true,
        emailUpdates: false
      }
    };
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   PUT /api/users/me
 * @desc    Update current user's profile
 * @access  Private
 */
router.put('/me', authenticate, async (req, res) => {
  try {
    const { name, email, preferences } = req.body;
    
    // In actual implementation, update user in database
    const updatedUser = {
      id: req.user.id,
      farcaster: req.user.farcaster,
      email: email || req.user.email,
      name: name || req.user.name,
      createdAt: req.user.createdAt,
      preferences: {
        ...req.user.preferences,
        ...preferences
      },
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/users/:id/questions
 * @desc    Get all questions by a specific user
 * @access  Private (Admin or Own User)
 */
router.get('/:id/questions', authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Check authorization - must be admin or own user
    if (userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ success: false, error: 'Not authorized to view these questions' });
    }
    
    // Sample response - in actual implementation, fetch from database
    const questions = [];
    for (let i = 1; i <= limit; i++) {
      questions.push({
        id: `question${(page - 1) * limit + i}`,
        question: `Sample question ${(page - 1) * limit + i}`,
        category: ['Moral', 'Fashion', 'Family', 'Workplace', 'Trivial', 'Political'][Math.floor(Math.random() * 6)],
        status: ['pending', 'active', 'completed'][Math.floor(Math.random() * 3)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 3600 * 1000).toISOString(),
        verdictSummary: {
          optionA: Math.floor(Math.random() * 13),
          optionB: Math.floor(Math.random() * 13)
        }
      });
    }
    
    res.json({
      success: true,
      data: questions,
      pagination: {
        page,
        limit,
        total: 28, // Total number of questions by this user
        pages: Math.ceil(28 / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   DELETE /api/users/me
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/me', authenticate, async (req, res) => {
  try {
    // In actual implementation, mark user as deleted in database
    // Note: Consider GDPR and data retention policies
    
    res.json({
      success: true,
      message: 'Account successfully deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users (with pagination)
 * @access  Admin
 */
router.get('/', authenticate, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    // Sample response - in actual implementation, fetch from database
    const users = [];
    for (let i = 1; i <= limit; i++) {
      users.push({
        id: `user${(page - 1) * limit + i}`,
        farcaster: `farcaster${(page - 1) * limit + i}`,
        isJuror: Math.random() > 0.5,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 3600 * 1000).toISOString(),
        questionCount: Math.floor(Math.random() * 50),
        status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)]
      });
    }
    
    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total: 352, // Total number of users
        pages: Math.ceil(352 / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
