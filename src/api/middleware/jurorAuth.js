// Juror authorization middleware for JuryNow API

/**
 * Middleware to verify if user has juror privileges
 * Must be used after the authenticate middleware
 */
const jurorAuth = (req, res, next) => {
  try {
    // Check if user exists and is a juror
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    if (!req.user.isJuror) {
      return res.status(403).json({ success: false, error: 'Juror privileges required' });
    }
    
    // User is a juror, proceed
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = jurorAuth;
