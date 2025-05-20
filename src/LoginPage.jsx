import React, { useState } from 'react';

// A standalone Login Page that doesn't depend on Privy or Material UI
export default function LoginPage({ onLogin }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loginType, setLoginType] = useState(null); // 'farcaster' or 'demo'
  
  // Handler with visual feedback
  const handleLoginClick = (type) => {
    console.log(`${type} login button clicked`);
    setButtonClicked(true);
    setLoginType(type);
    
    // Call the actual login handler after a small delay for visual feedback
    setTimeout(() => {
      onLogin(type);
    }, 300);
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
        
        <div style={styles.buttonContainer}>
          <button 
            onClick={() => handleLoginClick('farcaster')} 
            style={{
              ...styles.loginButton,
              backgroundColor: buttonClicked && loginType === 'farcaster' ? '#0d47a1' : '#1976d2',
              transform: buttonClicked && loginType === 'farcaster' ? 'scale(0.98)' : 'scale(1)',
              opacity: buttonClicked && loginType !== 'farcaster' ? 0.7 : 1
            }}
            disabled={buttonClicked}
          >
            <span style={styles.loginIcon}>✦</span> 
            {buttonClicked && loginType === 'farcaster' ? 'Logging in...' : 'Login with Farcaster'}
          </button>
          
          <button 
            onClick={() => handleLoginClick('demo')} 
            style={{
              ...styles.demoButton,
              backgroundColor: buttonClicked && loginType === 'demo' ? '#f0f0f0' : 'transparent',
              transform: buttonClicked && loginType === 'demo' ? 'scale(0.98)' : 'scale(1)',
              opacity: buttonClicked && loginType !== 'demo' ? 0.7 : 1
            }}
            disabled={buttonClicked}
          >
            {buttonClicked && loginType === 'demo' ? 'Starting Demo...' : 'Try Demo Mode'}
          </button>
        </div>
        
        <div style={styles.footer}>
          <p>By logging in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

// Inline styles
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
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
  },
  loginIcon: {
    marginRight: '8px',
    fontSize: '18px'
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
  }
};
