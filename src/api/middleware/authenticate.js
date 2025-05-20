// Authentication middleware for JuryNow API

/**
 * Middleware to verify JWT token and attach user to request
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token (in actual implementation, use JWT verify)
    // For now, mocking with a simple check and attaching mock user data
    if (token) {
      // Mock user data
      req.user = {
        id: 'user123',
        farcaster: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        isJuror: Math.random() > 0.5,
        isAdmin: Math.random() > 0.8,
        createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()
      };
      
      next();
    } else {
      return res.status(401).json({ success: false, error: 'Token is not valid' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token is not valid' });
  }
};

module.exports = authenticate;
