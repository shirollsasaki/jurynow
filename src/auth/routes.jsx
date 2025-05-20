import React from 'react';
import LoginPage from '../components/auth/LoginPage';
import UserProfile from '../components/auth/UserProfile';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Dashboard from '../components/dashboard/Dashboard';

/**
 * Application routes with authentication protection
 */
const Routes = {
  // Public routes
  Login: {
    path: '/login',
    element: <LoginPage />
  },
  
  // Protected routes (require authentication)
  Dashboard: {
    path: '/dashboard',
    element: <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  },
  Profile: {
    path: '/profile',
    element: <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  },
  CreateQuestion: {
    path: '/questions/new',
    element: <ProtectedRoute>
      {/* Question creation form would go here */}
      <div>Create Question Form</div>
    </ProtectedRoute>
  },
  
  // Juror routes (require juror status)
  JurorDashboard: {
    path: '/juror',
    element: <ProtectedRoute requireJuror={true}>
      {/* Juror dashboard would go here */}
      <div>Juror Dashboard</div>
    </ProtectedRoute>
  },
  ReviewQuestion: {
    path: '/juror/review',
    element: <ProtectedRoute requireJuror={true}>
      {/* Question review interface would go here */}
      <div>Question Review Interface</div>
    </ProtectedRoute>
  }
};

export default Routes;
