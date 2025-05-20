import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

/**
 * Custom hook for making authenticated API calls
 * @returns {Object} API methods and state
 */
export function useApi() {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base API URL (from environment or default)
  const API_BASE_URL = '/api';

  /**
   * Make an authenticated API request
   * @param {string} endpoint - API endpoint (without base URL)
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response data
   */
  const apiRequest = useCallback(async (endpoint, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo mode, return mock data
      if (user?.isDemo) {
        return await getMockData(endpoint, options);
      }

      // Ensure endpoint starts with a slash
      const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const url = `${API_BASE_URL}${formattedEndpoint}`;

      // Add authorization header if authenticated
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (isAuthenticated) {
        // Normally we would get the token from auth context or storage
        headers['Authorization'] = `Bearer mock-token-${user?.id || 'anonymous'}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || 'An error occurred while making the request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  /**
   * GET request helper
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} API response data
   */
  const get = useCallback((endpoint) => {
    return apiRequest(endpoint, { method: 'GET' });
  }, [apiRequest]);

  /**
   * POST request helper
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise<Object>} API response data
   */
  const post = useCallback((endpoint, data) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [apiRequest]);

  /**
   * PUT request helper
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise<Object>} API response data
   */
  const put = useCallback((endpoint, data) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }, [apiRequest]);

  /**
   * DELETE request helper
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} API response data
   */
  const del = useCallback((endpoint) => {
    return apiRequest(endpoint, { method: 'DELETE' });
  }, [apiRequest]);

  return {
    get,
    post,
    put,
    delete: del, // 'delete' is a reserved word, so use 'del' for the function name
    isLoading,
    error,
  };
}

/**
 * Generate mock data for demo mode
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<Object>} Mock data
 */
async function getMockData(endpoint, options) {
  // Add a slight delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock responses based on endpoint and method
  const method = options.method || 'GET';

  // Questions endpoints
  if (endpoint.includes('/questions')) {
    if (method === 'GET') {
      return {
        success: true,
        data: [
          { id: '1', question: 'Which outfit looks better?', optionA: 'Red dress', optionB: 'Blue suit', category: 'Fashion', status: 'completed' },
          { id: '2', question: 'Should I take this job offer?', optionA: 'Yes', optionB: 'No', category: 'Workplace', status: 'pending' }
        ]
      };
    }
    if (method === 'POST') {
      const requestData = JSON.parse(options.body);
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000).toString(),
          ...requestData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
    }
  }

  // User profile endpoint
  if (endpoint.includes('/users/me')) {
    return {
      success: true,
      data: {
        id: 'demo-user',
        farcaster: 'demouser',
        email: 'demo@jurynow.com',
        displayName: 'Demo User',
        isJuror: true,
        stats: {
          questionsAsked: 2,
          questionsCompleted: 1
        },
        preferences: {
          notifications: true,
          emailUpdates: false
        }
      }
    };
  }

  // Verdicts endpoint
  if (endpoint.includes('/verdicts')) {
    return {
      success: true,
      data: {
        questionId: '1',
        summary: {
          total: 12,
          optionA: 7,
          optionB: 5,
          winner: 'A'
        },
        verdicts: Array(12).fill(0).map((_, i) => ({
          id: `v${i}`,
          jurorId: `juror${i}`,
          verdict: Math.random() > 0.4 ? 'A' : 'B',
          submittedAt: new Date(Date.now() - Math.random() * 3600 * 1000).toISOString()
        }))
      }
    };
  }

  // Fallback for unknown endpoints
  return {
    success: true,
    data: { message: 'Mock data not implemented for this endpoint' }
  };
}
