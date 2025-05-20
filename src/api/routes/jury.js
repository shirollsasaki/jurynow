// Jury routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

/**
 * @route   GET /api/jury
 * @desc    Get all available jurors
 * @access  Admin
 */
router.get('/', authenticate, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    // Sample response
    const jurors = [];
    for (let i = 1; i <= limit; i++) {
      jurors.push({
        id: `juror${(page - 1) * limit + i}`,
        farcaster: `juror${i}`,
        demographics: {
          region: ['North America', 'Asia', 'Europe', 'Africa', 'South America'][Math.floor(Math.random() * 5)],
          age_group: ['18-24', '25-34', '35-44', '45-54', '55+'][Math.floor(Math.random() * 5)],
        },
        stats: {
          questionsJudged: Math.floor(Math.random() * 500),
          reliability: (0.7 + Math.random() * 0.3).toFixed(2),
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)]
      });
    }
    
    res.json({
      success: true,
      data: jurors,
      pagination: {
        page,
        limit,
        total: 120,  // Total number of jurors
        pages: Math.ceil(120 / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/jury/selection
 * @desc    Get a diverse selection of 12 jurors for a question
 * @access  Private
 */
router.get('/selection', authenticate, async (req, res) => {
  try {
    const { questionId, category } = req.query;
    
    if (!questionId) {
      return res.status(400).json({ success: false, error: 'QuestionId is required' });
    }
    
    // Sample response - algorithm would select diverse jurors based on demographics
    const selectedJurors = [];
    for (let i = 1; i <= 12; i++) {
      selectedJurors.push({
        id: `juror${i}`,
        farcaster: `juror${i}`,
        demographics: {
          region: ['North America', 'Asia', 'Europe', 'Africa', 'South America'][Math.floor(Math.random() * 5)],
          age_group: ['18-24', '25-34', '35-44', '45-54', '55+'][Math.floor(Math.random() * 5)],
        }
      });
    }
    
    res.json({
      success: true,
      data: {
        questionId,
        jurors: selectedJurors,
        diversityScore: 0.87 // Metric indicating how diverse the jury selection is
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/jury/register
 * @desc    Register as a juror
 * @access  Private
 */
router.post('/register', authenticate, async (req, res) => {
  try {
    const { categories, demographics } = req.body;
    
    // Validate request
    if (!demographics) {
      return res.status(400).json({ success: false, error: 'Demographics information is required' });
    }
    
    // Sample response - in actual implementation, save to database
    const juror = {
      id: `juror${Math.floor(Math.random() * 1000)}`,
      user: req.user.id,
      categories: categories || ['Moral', 'Fashion', 'Family', 'Workplace', 'Trivial', 'Political'],
      demographics,
      stats: {
        questionsJudged: 0,
        reliability: 1.0,
        lastActive: new Date().toISOString()
      },
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      data: juror
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/jury/stats
 * @desc    Get jury pool statistics
 * @access  Admin
 */
router.get('/stats', authenticate, adminAuth, async (req, res) => {
  try {
    // Sample response - in actual implementation, calculate from database
    const stats = {
      totalJurors: 120,
      activeJurors: 98,
      demographics: {
        regions: {
          'North America': 35,
          'Europe': 30,
          'Asia': 25,
          'Africa': 15,
          'South America': 15
        },
        ageGroups: {
          '18-24': 20,
          '25-34': 35,
          '35-44': 30,
          '45-54': 25,
          '55+': 10
        }
      },
      averageReliability: 0.89,
      avgQuestionsPerJuror: 127
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
