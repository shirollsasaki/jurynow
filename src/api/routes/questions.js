// Question routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

/**
 * @route   GET /api/questions
 * @desc    Get all questions with pagination
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.user.id;
    
    // Sample response (in actual implementation, fetch from database)
    const questions = [
      { id: '1', question: 'Which outfit looks better?', optionA: 'Red dress', optionB: 'Blue suit', category: 'Fashion' },
      { id: '2', question: 'Should I take this job offer?', optionA: 'Yes', optionB: 'No', category: 'Workplace' }
    ];
    
    res.json({
      success: true,
      data: questions,
      pagination: {
        page,
        limit,
        total: 25,  // Total number of questions
        pages: 3    // Total number of pages
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/questions
 * @desc    Create a new question
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { question, optionA, optionB, category, imageA, imageB } = req.body;
    
    // Validate request
    if (!question || !optionA || !optionB || !category) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }
    
    // Sample response (in actual implementation, save to database)
    const newQuestion = {
      id: Math.floor(Math.random() * 1000).toString(),
      user: req.user.id,
      question,
      optionA,
      optionB,
      category,
      imageA: imageA || null,
      imageB: imageB || null,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, active, completed
    };
    
    res.status(201).json({
      success: true,
      data: newQuestion
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/questions/:id
 * @desc    Get a question by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const questionId = req.params.id;
    
    // Sample response (in actual implementation, fetch from database)
    const question = {
      id: questionId,
      user: req.user.id,
      question: 'Which is more ethical?',
      optionA: 'Option A',
      optionB: 'Option B',
      category: 'Moral',
      imageA: null,
      imageB: null,
      createdAt: new Date().toISOString(),
      status: 'completed',
      verdicts: {
        optionA: 7,
        optionB: 5
      }
    };
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const questionId = req.params.id;
    
    // In actual implementation, ensure the user owns this question
    
    res.json({
      success: true,
      message: `Question ${questionId} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/questions/categories
 * @desc    Get all question categories
 * @access  Public
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      'Moral', 'Fashion', 'Family', 'Workplace', 'Trivial', 'Political'
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
