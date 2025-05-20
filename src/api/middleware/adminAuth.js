// Admin authorization middleware for JuryNow API

/**
 * Middleware to verify if user has admin privileges
 * Must be used after the authenticate middleware
 */
const adminAuth = (req, res, next) => {
  try {
    // Check if user exists and is an admin
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, error: 'Admin privileges required' });
    }
    
    // User is an admin, proceed
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = adminAuth;
