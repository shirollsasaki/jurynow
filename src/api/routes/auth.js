// Authentication routes for JuryNow API
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

/**
 * @route   POST /api/auth/privy-verify
 * @desc    Verify Privy authentication and issue JuryNow JWT
 * @access  Public
 */
router.post('/privy-verify', async (req, res) => {
  try {
    const { privyToken, farcasterUser } = req.body;
    
    // Validate request
    if (!privyToken) {
      return res.status(400).json({ success: false, error: 'Privy token is required' });
    }
    
    // In actual implementation:
    // 1. Verify the Privy token with Privy API
    // 2. Check if user exists in database, if not create a new user
    // 3. Generate a JWT token for the user
    
    // Sample response
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
    const user = {
      id: 'user123',
      farcaster: farcasterUser?.username || 'user123',
      name: farcasterUser?.displayName || 'User',
      email: farcasterUser?.email,
      isJuror: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        token: jwt,
        user
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', authenticate, async (req, res) => {
  try {
    // In actual implementation, verify the old token and issue a new one
    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.new';
    
    res.json({
      success: true,
      data: {
        token: newToken,
        expiresIn: '7d'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    // In actual implementation, add token to blacklist
    
    res.json({
      success: true,
      message: 'Successfully logged out'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/auth/status
 * @desc    Check authentication status
 * @access  Public
 */
router.get('/status', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.json({
        success: true,
        data: {
          authenticated: false
        }
      });
    }
    
    // In actual implementation, validate the token
    // For demo purposes, we'll assume it's valid if it exists
    
    res.json({
      success: true,
      data: {
        authenticated: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/auth/demo
 * @desc    Login with demo account
 * @access  Public
 */
router.post('/demo', async (req, res) => {
  try {
    // Create a demo user and JWT token
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vdXNlciIsIm5hbWUiOiJEZW1vIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9';
    const user = {
      id: 'demouser',
      farcaster: 'demouser',
      name: 'Demo User',
      email: 'demo@jurynow.com',
      isJuror: true, // Demo users can be jurors
      isDemo: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        token: jwt,
        user,
        expiresIn: '1d' // Demo tokens expire in 1 day
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
