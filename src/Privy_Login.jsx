import React from 'react';
import { PrivyProvider, usePrivy, useLogin, useLogout } from '@privy-io/react-auth';

// You need your Privy App ID from your Privy dashboard
const PRIVY_APP_ID = 'cm9y48w9s00s5la0m3vk0edfl'; // TODO: Replace with your real Privy App ID

export function PrivyLoginProvider({ children }) {
  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={{
      // Enable Farcaster as a login method
      loginMethods: ['farcaster'],
    }}>
      {children}
    </PrivyProvider>
  );
}

export function FarcasterLoginButton() {
  const { ready, authenticated, user } = usePrivy();
  const login = useLogin();
  const logout = useLogout();

  if (!ready) return <button disabled>Loading...</button>;
  if (authenticated) {
    return (
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <div>Signed in as <b>{user?.farcaster?.username || user?.email || 'Unknown'}</b></div>
        <button onClick={logout} style={{ marginTop: 8 }}>Logout</button>
      </div>
    );
  }
  return (
    <button onClick={login} style={{ margin: '1rem 0', padding: '0.5rem 1rem', fontSize: '1rem' }}>
      Login with Farcaster
    </button>
  );
}
