// Analytics routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

/**
 * @route   GET /api/analytics/dashboard
 * @desc    Get analytics dashboard data
 * @access  Admin
 */
router.get('/dashboard', authenticate, adminAuth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || 'week'; // day, week, month, year
    
    // Sample response - in actual implementation, calculate from database
    const stats = {
      questions: {
        total: 3417,
        completed: 2953,
        pending: 464,
        byCategory: {
          'Moral': 785,
          'Fashion': 643,
          'Family': 524,
          'Workplace': 672,
          'Trivial': 496,
          'Political': 297
        },
        growth: {
          weekly: '+12.3%',
          monthly: '+42.7%'
        }
      },
      users: {
        total: 1253,
        active: 876,
        jurors: 485,
        growth: {
          weekly: '+5.7%',
          monthly: '+24.1%'
        }
      },
      verdicts: {
        total: 35412,
        averagePerQuestion: 12,
        averageTime: '1.7 hours'
      },
      system: {
        uptime: '99.7%',
        averageResponseTime: '213ms',
        errorRate: '0.3%'
      }
    };
    
    // Generate time series data based on timeframe
    const timeSeriesData = getTimeSeriesData(timeframe);
    
    res.json({
      success: true,
      data: {
        stats,
        timeframe,
        timeSeriesData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/analytics/users
 * @desc    Get user analytics
 * @access  Admin
 */
router.get('/users', authenticate, adminAuth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || 'week';
    
    // Sample response
    const userAnalytics = {
      newUsers: {
        count: 237,
        trend: '+18.2%'
      },
      activeUsers: {
        count: 876,
        trend: '+7.3%',
        byRegion: {
          'North America': 352,
          'Europe': 268,
          'Asia': 145,
          'South America': 73,
          'Africa': 38
        }
      },
      retention: {
        overall: '72%',
        bySignupMethod: {
          'Farcaster': '81%',
          'Email': '67%',
          'Other': '59%'
        }
      },
      engagement: {
        averageQuestionsPerUser: 3.7,
        averageSessionDuration: '4m 12s'
      }
    };
    
    // Time series data for user growth
    const timeSeriesData = getTimeSeriesData(timeframe, 'users');
    
    res.json({
      success: true,
      data: {
        userAnalytics,
        timeframe,
        timeSeriesData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/analytics/questions
 * @desc    Get question analytics
 * @access  Admin
 */
router.get('/questions', authenticate, adminAuth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || 'week';
    
    // Sample response
    const questionAnalytics = {
      volume: {
        total: 3417,
        trend: '+15.3%',
        byCategory: {
          'Moral': 785,
          'Fashion': 643,
          'Family': 524,
          'Workplace': 672,
          'Trivial': 496,
          'Political': 297
        }
      },
      completionRate: {
        overall: '86.4%',
        byCategory: {
          'Moral': '88.2%',
          'Fashion': '91.7%',
          'Family': '85.3%',
          'Workplace': '83.8%',
          'Trivial': '90.1%',
          'Political': '79.5%'
        }
      },
      responseTime: {
        average: '1.7 hours',
        byCategory: {
          'Moral': '1.9 hours',
          'Fashion': '1.3 hours',
          'Family': '1.8 hours',
          'Workplace': '2.1 hours',
          'Trivial': '1.2 hours',
          'Political': '2.3 hours'
        }
      },
      popularTimes: {
        dayOfWeek: 'Wednesday',
        timeOfDay: '8pm - 10pm'
      }
    };
    
    // Time series data for questions
    const timeSeriesData = getTimeSeriesData(timeframe, 'questions');
    
    res.json({
      success: true,
      data: {
        questionAnalytics,
        timeframe,
        timeSeriesData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/analytics/user-insight/:userId
 * @desc    Get insights for a specific user
 * @access  Private (Admin or Own User)
 */
router.get('/user-insight/:userId', authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Check authorization - must be admin or own user
    if (userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ success: false, error: 'Not authorized to view these insights' });
    }
    
    // Sample response
    const userInsight = {
      questionStats: {
        total: 27,
        completed: 24,
        pending: 3
      },
      categoryBreakdown: {
        'Moral': 5,
        'Fashion': 8,
        'Family': 3,
        'Workplace': 6,
        'Trivial': 4,
        'Political': 1
      },
      verdictTrends: {
        optionAWins: 14,
        optionBWins: 10,
        ties: 0,
        winPercentage: {
          optionA: '58.3%',
          optionB: '41.7%'
        }
      },
      responseTime: {
        average: '1.4 hours',
        fastest: '17 minutes',
        slowest: '3.2 hours'
      },
      activity: {
        mostActiveDay: 'Friday',
        mostActiveTime: '7pm - 9pm',
        questionsLastMonth: 12
      }
    };
    
    // Recent activity
    const recentActivity = [];
    for (let i = 1; i <= 5; i++) {
      recentActivity.push({
        type: ['question_created', 'verdict_received'][Math.floor(Math.random() * 2)],
        questionId: `question${i}`,
        timestamp: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString(),
        details: {
          question: `Sample question ${i}`,
          result: Math.random() > 0.5 ? 'Option A won (7-5)' : 'Option B won (8-4)'
        }
      });
    }
    
    res.json({
      success: true,
      data: {
        userInsight,
        recentActivity
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to generate time series data
function getTimeSeriesData(timeframe, type = 'general') {
  const now = new Date();
  const data = [];
  let points = 0;
  
  // Determine number of data points based on timeframe
  switch (timeframe) {
    case 'day':
      points = 24; // 24 hours
      break;
    case 'week':
      points = 7; // 7 days
      break;
    case 'month':
      points = 30; // 30 days
      break;
    case 'year':
      points = 12; // 12 months
      break;
    default:
      points = 7; // Default to week
  }
  
  // Generate data based on type
  for (let i = 0; i < points; i++) {
    let date;
    
    // Calculate date based on timeframe
    switch (timeframe) {
      case 'day':
        date = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
        break;
      case 'week':
        date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        date = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
        break;
      default:
        date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
    }
    
    // Create different metrics based on type
    if (type === 'users') {
      data.push({
        date: date.toISOString(),
        newUsers: Math.floor(30 + Math.random() * 20),
        activeUsers: Math.floor(100 + Math.random() * 80),
        jurors: Math.floor(40 + Math.random() * 30)
      });
    } else if (type === 'questions') {
      data.push({
        date: date.toISOString(),
        newQuestions: Math.floor(50 + Math.random() * 30),
        completedQuestions: Math.floor(40 + Math.random() * 30),
        averageResponseTime: (1 + Math.random()).toFixed(1)
      });
    } else { // general
      data.push({
        date: date.toISOString(),
        questions: Math.floor(50 + Math.random() * 30),
        users: Math.floor(30 + Math.random() * 20),
        verdicts: Math.floor(500 + Math.random() * 300)
      });
    }
  }
  
  return data;
}

module.exports = router;
