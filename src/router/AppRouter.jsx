import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes from '../auth/routes';
import LoginPage from '../components/auth/LoginPage';

/**
 * Main application router that handles all routes and authentication
 */
const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading JuryNow...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (accessible to everyone) */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Map all protected routes from auth/routes.jsx */}
        {Object.values(routes).map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        
        {/* Default route - redirect to dashboard if authenticated, otherwise to login */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

// Styles
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #1976d2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  }
};

export default AppRouter;
