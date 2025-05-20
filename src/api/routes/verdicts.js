// Verdict routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

/**
 * @route   POST /api/verdicts
 * @desc    Submit a verdict for a question
 * @access  Private (Juror only)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { questionId, verdict, reasoning } = req.body;
    
    // Validate request
    if (!questionId || !verdict) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }
    
    if (verdict !== 'A' && verdict !== 'B') {
      return res.status(400).json({ success: false, error: 'Verdict must be either A or B' });
    }
    
    // In actual implementation:
    // 1. Check if user is a juror
    // 2. Check if juror was selected for this question
    // 3. Check if juror has already submitted a verdict for this question
    
    // Sample response - in actual implementation, save to database
    const newVerdict = {
      id: `verdict${Math.floor(Math.random() * 1000)}`,
      questionId,
      jurorId: req.user.id,
      verdict,
      reasoning: reasoning || null, // Optional reasoning for internal metrics (not shown to users)
      submittedAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      data: newVerdict
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/verdicts/question/:questionId
 * @desc    Get all verdicts for a specific question
 * @access  Private
 */
router.get('/question/:questionId', authenticate, async (req, res) => {
  try {
    const { questionId } = req.params;
    
    // In actual implementation, check if user owns the question or is admin
    
    // Sample response - in actual implementation, fetch from database
    const verdicts = [];
    const totalJurors = 12;
    let optionA = 0;
    let optionB = 0;
    
    for (let i = 1; i <= totalJurors; i++) {
      const verdict = Math.random() > 0.5 ? 'A' : 'B';
      if (verdict === 'A') optionA++;
      else optionB++;
      
      verdicts.push({
        id: `verdict${i}`,
        jurorId: `juror${i}`,
        verdict,
        submittedAt: new Date(Date.now() - Math.random() * 3600 * 1000).toISOString()
      });
    }
    
    res.json({
      success: true,
      data: {
        questionId,
        summary: {
          total: totalJurors,
          optionA,
          optionB,
          winner: optionA > optionB ? 'A' : optionB > optionA ? 'B' : 'tie'
        },
        verdicts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/verdicts/juror/:jurorId
 * @desc    Get all verdicts by a specific juror
 * @access  Admin
 */
router.get('/juror/:jurorId', authenticate, async (req, res) => {
  try {
    const { jurorId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Sample response - in actual implementation, fetch from database
    const verdicts = [];
    for (let i = 1; i <= limit; i++) {
      verdicts.push({
        id: `verdict${(page - 1) * limit + i}`,
        questionId: `question${(page - 1) * limit + i}`,
        jurorId,
        verdict: Math.random() > 0.5 ? 'A' : 'B',
        submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 3600 * 1000).toISOString()
      });
    }
    
    res.json({
      success: true,
      data: {
        jurorId,
        verdicts,
        pagination: {
          page,
          limit,
          total: 87, // Total number of verdicts by this juror
          pages: Math.ceil(87 / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/verdicts/status/:questionId
 * @desc    Get the current verdict status for a question (how many verdicts received so far)
 * @access  Private
 */
router.get('/status/:questionId', authenticate, async (req, res) => {
  try {
    const { questionId } = req.params;
    
    // Sample response - in actual implementation, fetch from database
    const totalJurors = 12;
    const receivedVerdicts = Math.floor(Math.random() * (totalJurors + 1));
    const optionA = Math.floor(Math.random() * (receivedVerdicts + 1));
    const optionB = receivedVerdicts - optionA;
    
    res.json({
      success: true,
      data: {
        questionId,
        status: receivedVerdicts === totalJurors ? 'complete' : 'in-progress',
        progress: {
          total: totalJurors,
          received: receivedVerdicts,
          percentage: (receivedVerdicts / totalJurors * 100).toFixed(0)
        },
        currentTally: {
          optionA,
          optionB
        },
        estimatedCompletionTime: receivedVerdicts === totalJurors ? null : new Date(Date.now() + 10 * 60 * 1000).toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
