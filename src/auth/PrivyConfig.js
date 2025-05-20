// Privy configuration for JuryNow

// Privy App ID from your Privy dashboard
export const PRIVY_APP_ID = 'cm9y48w9s00s5la0m3vk0edfl';

// Privy configuration options
export const PRIVY_CONFIG = {
  // Enabled login methods
  loginMethods: ['farcaster', 'email'],
  
  // Appearance configuration
  appearance: {
    theme: 'light',
    accentColor: '#1976d2',
    logo: 'https://your-jurynow-logo-url.com/logo.png', // Replace with your actual logo URL
  },
  
  // Customize the Privy Modal
  modalOptions: {
    displayLogo: true,
    title: 'JuryNow Authentication',
    showWalletLoginFirst: true,
  },
};
