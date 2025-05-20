import React from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * @param {Object} props Component props
 * @param {ReactNode} props.children Children components to render if authenticated
 * @param {ReactNode} props.fallback Component to render if not authenticated (defaults to null)
 * @param {boolean} props.requireJuror Whether this route requires juror status
 */
const ProtectedRoute = ({ children, fallback = null, requireJuror = false }) => {
  const { isAuthenticated, isLoading, isJuror, user } = useAuth();

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, show fallback or null
  if (!isAuthenticated) {
    return fallback;
  }

  // If route requires juror status and user is not a juror, show unauthorized message
  if (requireJuror && !isJuror) {
    return (
      <div style={styles.unauthorizedContainer}>
        <h2>Juror Access Required</h2>
        <p>You need to be a registered juror to access this page.</p>
        <button 
          style={styles.button}
          onClick={() => window.location.href = '/register-juror'}
        >
          Register as Juror
        </button>
      </div>
    );
  }

  // User is authenticated and meets all requirements, render children
  return children;
};

// Styles
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    padding: '20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #1976d2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  unauthorizedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  }
};

export default ProtectedRoute;
