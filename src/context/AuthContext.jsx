import React, { createContext, useEffect, useState } from 'react';
import { usePrivy, useLogin, useLogout } from '@privy-io/react-auth';

// Create the authentication context
export const AuthContext = createContext(null);

/**
 * AuthProvider component that wraps the application and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  // Authentication state
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
  });

  // Get Privy hooks
  const { ready, authenticated, user } = usePrivy();
  const login = useLogin();
  const logout = useLogout();

  // Initialize auth state from Privy on load and when Privy state changes
  useEffect(() => {
    if (ready) {
      if (authenticated && user) {
        // Format user data from Privy
        const userData = {
          id: user.id,
          wallets: user.wallets,
          email: user.email?.address,
          farcaster: user.farcaster?.username,
          displayName: user.farcaster?.displayName || user.email?.address || 'Anonymous User',
          profileImage: user.farcaster?.pfp || null
        };

        // Update auth state with authenticated user
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: userData,
          error: null
        });

        // Store auth state in localStorage for persistence
        localStorage.setItem('jurynow_auth', JSON.stringify({
          isAuthenticated: true,
          user: userData
        }));
      } else {
        // User is not authenticated
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null
        });

        // Clear localStorage
        localStorage.removeItem('jurynow_auth');
      }
    }
  }, [ready, authenticated, user]);

  // Try to restore session from localStorage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem('jurynow_auth');
    if (storedAuth && !ready) {
      try {
        const parsed = JSON.parse(storedAuth);
        setAuthState(prevState => ({
          ...prevState,
          isAuthenticated: parsed.isAuthenticated,
          user: parsed.user,
          // Still keep isLoading true until Privy confirms
        }));
      } catch (error) {
        console.error('Failed to parse stored auth state:', error);
        localStorage.removeItem('jurynow_auth');
      }
    }
  }, []);

  // Login handler
  const handleLogin = async (loginMethod = 'farcaster') => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      await login({ loginMethod });
      // Auth state will be updated by the useEffect above when Privy updates
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to login. Please try again.'
      }));
      return false;
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await logout();
      // Auth state will be updated by the useEffect above when Privy updates
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to logout. Please try again.'
      }));
      return false;
    }
  };

  // Check if user is a juror (for demo, randomly assign)
  const isJuror = authState.user && (authState.user.id?.endsWith('5') || authState.user.id?.endsWith('0'));

  // Update user profile
  const updateUserProfile = async (profileData) => {
    // In a real app, this would send the data to the backend
    // For now, we'll just update the local state
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, ...profileData }
    }));

    // Update localStorage
    const storedAuth = localStorage.getItem('jurynow_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        localStorage.setItem('jurynow_auth', JSON.stringify({
          ...parsed,
          user: { ...parsed.user, ...profileData }
        }));
      } catch (error) {
        console.error('Failed to update stored auth state:', error);
      }
    }

    return true;
  };

  // Context value with authentication state and methods
  const contextValue = {
    ...authState,
    isReady: ready,
    isJuror,
    login: handleLogin,
    logout: handleLogout,
    updateProfile: updateUserProfile,
    privy: { ready, authenticated, user, login, logout }
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
