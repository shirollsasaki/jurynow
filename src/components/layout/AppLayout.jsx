import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Main application layout with navigation and user menu
 */
const AppLayout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>JN</div>
          <h1 style={styles.title}>JuryNow</h1>
        </div>
        
        {isAuthenticated && (
          <div style={styles.userMenu}>
            <div style={styles.userInfo}>
              <span style={styles.welcomeText}>Welcome, </span>
              <span style={styles.userName}>{user?.displayName || 'User'}</span>
            </div>
            
            <div style={styles.userActions}>
              <button 
                onClick={() => navigate('/profile')} 
                style={styles.profileButton}
              >
                Profile
              </button>
              <button 
                onClick={handleLogout} 
                style={styles.logoutButton}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main style={styles.main}>
        {children}
      </main>
      
      <footer style={styles.footer}>
        <p>&copy; 2025 JuryNow. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '40px',
    height: '40px',
    backgroundColor: '#1976d2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '12px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: '#1a1a1a'
  },
  userMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  userInfo: {
    marginBottom: '8px'
  },
  welcomeText: {
    color: '#666'
  },
  userName: {
    fontWeight: '500',
    color: '#333'
  },
  userActions: {
    display: 'flex',
    gap: '10px'
  },
  profileButton: {
    backgroundColor: 'transparent',
    color: '#1976d2',
    border: '1px solid #1976d2',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    color: '#666',
    border: '1px solid #ddd',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  main: {
    flex: 1,
    padding: '30px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    color: '#666',
    fontSize: '14px',
    marginTop: 'auto'
  }
};

export default AppLayout;
