import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Check if we need to load Privy (try-catch to prevent crashes if package is missing)
let PrivyProvider, AuthProvider;
try {
  // Dynamic imports to handle missing packages gracefully
  const PrivyModule = await import('@privy-io/react-auth').catch(() => null);
  PrivyProvider = PrivyModule?.PrivyProvider;
  
  const AuthContextModule = await import('./context/AuthContext').catch(() => null);
  AuthProvider = AuthContextModule?.AuthProvider;
} catch (error) {
  console.warn('Authentication modules could not be loaded. Running in demo mode.');
}

// Privy configuration
const PRIVY_APP_ID = 'cm9y48w9s00s5la0m3vk0edfl';
const PRIVY_CONFIG = {
  appearance: {
    theme: 'light',
    accentColor: '#1976d2',
    logo: '/logo.png',
  },
  loginMethods: ['farcaster', 'email', 'wallet'],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
  },
};

// Demo mode if Privy is not available
const renderApp = () => {
  // If Privy is available, use it
  if (PrivyProvider && AuthProvider && PRIVY_APP_ID !== 'demo-mode') {
    return (
      <React.StrictMode>
        <PrivyProvider appId={PRIVY_APP_ID} config={PRIVY_CONFIG}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PrivyProvider>
      </React.StrictMode>
    );
  } else {
    // Fallback to demo mode without authentication
    console.log('Running JuryNow in demo mode (no authentication)');
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(renderApp());
