import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Enhanced login page with Privy Farcaster authentication
 */
const LoginPage = () => {
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const [loginType, setLoginType] = useState(null); // 'farcaster' or 'demo'
  const [buttonState, setButtonState] = useState({
    farcaster: { clicked: false, loading: false },
    demo: { clicked: false, loading: false }
  });

  // Handle successful login - this would typically redirect
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User authenticated, redirecting...');
      // In a real app with routing, you would redirect here
      // navigate('/dashboard');
    }
  }, [isAuthenticated]);

  // Handle login button click
  const handleLoginClick = async (type) => {
    console.log(`${type} login button clicked`);
    
    // Update button state
    setLoginType(type);
    setButtonState(prev => ({
      ...prev,
      [type]: { clicked: true, loading: true }
    }));

    try {
      // Call login method from auth context
      const success = await login(type);
      
      if (!success) {
        // Reset button state on failure
        setTimeout(() => {
          setButtonState(prev => ({
            ...prev,
            [type]: { clicked: false, loading: false }
          }));
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Reset button state
      setTimeout(() => {
        setButtonState(prev => ({
          ...prev,
          [type]: { clicked: false, loading: false }
        }));
      }, 1000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>JN</div>
        </div>
        
        <h1 style={styles.title}>JuryNow</h1>
        <p style={styles.subtitle}>12 strangers. Instant verdict. No commentary.</p>
        
        <div style={styles.description}>
          <p>Get real-time verdicts on your questions from a diverse jury around the world.</p>
          <ul style={styles.featureList}>
            <li>Ask moral dilemmas</li>
            <li>Compare fashion choices</li>
            <li>Resolve workplace disputes</li>
            <li>Get global perspectives</li>
          </ul>
        </div>
        
        {error && <p style={styles.errorMessage}>{error}</p>}
        
        <div style={styles.buttonContainer}>
          <button 
            onClick={() => handleLoginClick('farcaster')} 
            style={{
              ...styles.loginButton,
              backgroundColor: buttonState.farcaster.clicked ? '#0d47a1' : '#1976d2',
              transform: buttonState.farcaster.clicked ? 'scale(0.98)' : 'scale(1)',
              opacity: buttonState.farcaster.loading || isLoading ? 0.7 : 1
            }}
            disabled={buttonState.farcaster.loading || buttonState.demo.loading || isLoading}
          >
            <span style={styles.loginIcon}>✦</span> 
            {buttonState.farcaster.loading ? 'Connecting to Farcaster...' : 'Login with Farcaster'}
          </button>
          
          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>
          
          <button 
            onClick={() => handleLoginClick('demo')} 
            style={{
              ...styles.demoButton,
              backgroundColor: buttonState.demo.clicked ? '#f0f0f0' : 'transparent',
              transform: buttonState.demo.clicked ? 'scale(0.98)' : 'scale(1)',
              opacity: buttonState.demo.loading || isLoading ? 0.7 : 1
            }}
            disabled={buttonState.farcaster.loading || buttonState.demo.loading || isLoading}
          >
            {buttonState.demo.loading ? 'Setting up demo...' : 'Try Demo Mode'}
          </button>
        </div>
        
        <div style={styles.footer}>
          <p>By logging in, you agree to our Terms of Service and Privacy Policy</p>
          
          {isLoading && !buttonState.farcaster.loading && !buttonState.demo.loading && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading authentication...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  logo: {
    width: '60px',
    height: '60px',
    backgroundColor: '#1976d2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginTop: '8px',
    marginBottom: '24px'
  },
  description: {
    textAlign: 'left',
    marginBottom: '32px',
    color: '#444',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  featureList: {
    textAlign: 'left',
    paddingLeft: '24px',
    marginTop: '12px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
  },
  loginIcon: {
    marginRight: '8px',
    fontSize: '18px'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    color: '#999',
    fontSize: '14px'
  },
  dividerText: {
    margin: '0 10px',
    backgroundColor: 'white',
    padding: '0 10px',
    position: 'relative',
    zIndex: 1
  },
  demoButton: {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    padding: '13px 20px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footer: {
    fontSize: '12px',
    color: '#888',
    marginTop: '16px'
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: '14px',
    margin: '16px 0',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    textAlign: 'center'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '2px solid #1976d2',
    borderRadius: '50%',
    marginBottom: '10px',
    animation: 'spin 1s linear infinite'
  }
};

export default LoginPage;
