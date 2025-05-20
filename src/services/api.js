/**
 * API service for JuryNow
 * Handles all API requests to the backend
 */

// Base API URL - should be set from environment variables in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - API response
 */
async function apiRequest(endpoint, options = {}, token = null) {
  // Build full URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Send request
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Parse JSON response
    const data = await response.json();
    
    // Check if response is successful
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Authentication service
 */
const authService = {
  /**
   * Verify Privy authentication and get JuryNow JWT
   * @param {string} privyToken - Privy authentication token
   * @param {Object} farcasterUser - Farcaster user data
   * @returns {Promise} - Authentication data
   */
  verifyPrivyAuth: async (privyToken, farcasterUser = null) => {
    return apiRequest('/auth/privy-verify', {
      method: 'POST',
      body: JSON.stringify({ privyToken, farcasterUser })
    });
  },
  
  /**
   * Log in with demo account
   * @returns {Promise} - Demo user data
   */
  loginWithDemo: async () => {
    return apiRequest('/auth/demo', { method: 'POST' });
  },
  
  /**
   * Check authentication status
   * @param {string} token - JWT token
   * @returns {Promise} - Authentication status
   */
  checkAuthStatus: async (token) => {
    return apiRequest('/auth/status', { method: 'GET' }, token);
  },
  
  /**
   * Refresh authentication token
   * @param {string} token - Current JWT token
   * @returns {Promise} - New token data
   */
  refreshToken: async (token) => {
    return apiRequest('/auth/refresh', { method: 'POST' }, token);
  },
  
  /**
   * Log out user
   * @param {string} token - JWT token
   * @returns {Promise} - Logout confirmation
   */
  logout: async (token) => {
    return apiRequest('/auth/logout', { method: 'POST' }, token);
  }
};

/**
 * User service
 */
const userService = {
  /**
   * Get current user profile
   * @param {string} token - JWT token
   * @returns {Promise} - User profile data
   */
  getProfile: async (token) => {
    return apiRequest('/users/me', { method: 'GET' }, token);
  },
  
  /**
   * Update user profile
   * @param {string} token - JWT token
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - Updated profile data
   */
  updateProfile: async (token, profileData) => {
    return apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }, token);
  },
  
  /**
   * Get user's questions
   * @param {string} token - JWT token
   * @param {number} page - Page number for pagination
   * @param {number} limit - Number of items per page
   * @returns {Promise} - User's questions
   */
  getUserQuestions: async (token, page = 1, limit = 10) => {
    return apiRequest(`/users/me/questions?page=${page}&limit=${limit}`, { method: 'GET' }, token);
  },
  
  /**
   * Delete user account
   * @param {string} token - JWT token
   * @returns {Promise} - Deletion confirmation
   */
  deleteAccount: async (token) => {
    return apiRequest('/users/me', { method: 'DELETE' }, token);
  }
};

// Export all services
export {
  apiRequest,
  authService,
  userService
};
