import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * User profile component for viewing and editing user information
 */
const UserProfile = () => {
  const { user, updateProfile, isJuror } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    preferences: user?.preferences || { notifications: true, emailUpdates: false }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle profile save
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      const success = await updateProfile(profileData);
      
      if (success) {
        setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setSaveMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setSaveMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSaving(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Profile</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            style={styles.editButton}
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {saveMessage && (
        <div style={{
          ...styles.message,
          backgroundColor: saveMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: saveMessage.type === 'success' ? '#2e7d32' : '#c62828'
        }}>
          {saveMessage.text}
        </div>
      )}
      
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                style={styles.avatar} 
              />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {profileData.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div style={styles.userInfo}>
            {isEditing ? (
              <input
                type="text"
                name="displayName"
                value={profileData.displayName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Display Name"
              />
            ) : (
              <h3 style={styles.userName}>{user?.displayName}</h3>
            )}
            
            <p style={styles.userDetail}>
              <span style={styles.detailLabel}>Farcaster: </span>
              {user?.farcaster || 'Not connected'}
            </p>
            
            {isJuror && (
              <div style={styles.jurorBadge}>Jury Member</div>
            )}
          </div>
        </div>
        
        <div style={styles.profileBody}>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Contact Information</h4>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Email Address"
                />
              ) : (
                <p style={styles.fieldValue}>{user?.email || 'No email provided'}</p>
              )}
            </div>
          </div>
          
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>About</h4>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  style={{...styles.input, minHeight: '100px'}}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p style={styles.fieldValue}>{user?.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
          
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Preferences</h4>
            
            {isEditing ? (
              <>
                <div style={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={profileData.preferences?.notifications}
                    onChange={handleChange}
                  />
                  <label htmlFor="notifications" style={styles.checkboxLabel}>
                    Receive question verdict notifications
                  </label>
                </div>
                
                <div style={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="emailUpdates"
                    name="emailUpdates"
                    checked={profileData.preferences?.emailUpdates}
                    onChange={handleChange}
                  />
                  <label htmlFor="emailUpdates" style={styles.checkboxLabel}>
                    Receive email updates
                  </label>
                </div>
              </>
            ) : (
              <>
                <p style={styles.preference}>
                  Notifications: {user?.preferences?.notifications ? 'Enabled' : 'Disabled'}
                </p>
                <p style={styles.preference}>
                  Email Updates: {user?.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
                </p>
              </>
            )}
          </div>
          
          {isEditing && (
            <div style={styles.actions}>
              <button 
                onClick={() => setIsEditing(false)}
                style={styles.cancelButton}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={styles.saveButton}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div style={styles.statsCard}>
        <h3 style={styles.statsTitle}>Your Activity</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>0</div>
            <div style={styles.statLabel}>Questions Asked</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>0</div>
            <div style={styles.statLabel}>Verdicts Received</div>
          </div>
          {isJuror && (
            <div style={styles.statItem}>
              <div style={styles.statValue}>0</div>
              <div style={styles.statLabel}>Verdicts Given</div>
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
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333'
  },
  editButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  message: {
    padding: '12px 16px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  profileHeader: {
    display: 'flex',
    padding: '20px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f9fafb'
  },
  avatarContainer: {
    marginRight: '20px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1976d2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    margin: '0 0 8px 0',
    fontSize: '20px',
    color: '#333'
  },
  userDetail: {
    margin: '0 0 5px 0',
    color: '#666',
    fontSize: '14px'
  },
  detailLabel: {
    fontWeight: '500',
    color: '#555'
  },
  jurorBadge: {
    display: 'inline-block',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 8px',
    borderRadius: '4px',
    marginTop: '8px'
  },
  profileBody: {
    padding: '20px'
  },
  section: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginTop: 0,
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #eee'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff'
  },
  fieldValue: {
    margin: '0',
    color: '#333',
    fontSize: '14px'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  checkboxLabel: {
    marginLeft: '8px',
    fontSize: '14px',
    color: '#333'
  },
  preference: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#333'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  saveButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    padding: '20px'
  },
  statsTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#333'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '20px'
  },
  statItem: {
    textAlign: 'center',
    padding: '15px 10px',
    backgroundColor: '#f5f7fa',
    borderRadius: '6px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#666'
  }
};

export default UserProfile;
