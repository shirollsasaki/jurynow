/**
 * Jury Service for JuryNow
 * Handles all jury-related API calls
 */

import { apiRequest } from './api';

/**
 * Jury service for handling jury operations
 */
const juryService = {
  /**
   * Register as a juror
   * @param {string} token - JWT token
   * @param {Object} registrationData - Registration data including demographics and categories
   * @returns {Promise} - Juror registration data
   */
  registerAsJuror: async (token, registrationData) => {
    return apiRequest('/jury/register', {
      method: 'POST',
      body: JSON.stringify(registrationData)
    }, token);
  },
  
  /**
   * Get a selection of 12 diverse jurors for a question
   * @param {string} token - JWT token
   * @param {string} questionId - ID of the question
   * @param {string} category - Optional category of the question
   * @returns {Promise} - Selected jurors data
   */
  getJurySelection: async (token, questionId, category = null) => {
    let endpoint = `/jury/selection?questionId=${questionId}`;
    if (category) {
      endpoint += `&category=${category}`;
    }
    return apiRequest(endpoint, { method: 'GET' }, token);
  },
  
  /**
   * Submit a verdict for a question (as a juror)
   * @param {string} token - JWT token
   * @param {string} questionId - ID of the question
   * @param {string} optionSelected - ID or index of the selected option
   * @returns {Promise} - Verdict submission confirmation
   */
  submitVerdict: async (token, questionId, optionSelected) => {
    return apiRequest('/verdicts', {
      method: 'POST',
      body: JSON.stringify({
        questionId,
        optionSelected
      })
    }, token);
  },
  
  /**
   * Get jury pool statistics (admin only)
   * @param {string} token - JWT token
   * @returns {Promise} - Jury pool statistics
   */
  getJuryStats: async (token) => {
    return apiRequest('/jury/stats', { method: 'GET' }, token);
  },
  
  /**
   * Get all jurors (admin only)
   * @param {string} token - JWT token
   * @param {number} page - Page number
   * @param {number} limit - Number of items per page
   * @returns {Promise} - List of jurors
   */
  getAllJurors: async (token, page = 1, limit = 20) => {
    return apiRequest(`/jury?page=${page}&limit=${limit}`, { method: 'GET' }, token);
  }
};

export default juryService;
