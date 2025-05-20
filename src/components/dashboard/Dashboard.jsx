import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Main dashboard for JuryNow application
 * Shows user's questions, activity, and options to create new questions
 */
const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userQuestions, setUserQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Categories for the JuryNow app
  const categories = [
    'Moral', 'Fashion', 'Family', 'Workplace', 'Trivial', 'Political'
  ];

  // Load user's questions on component mount
  useEffect(() => {
    // Simulate loading user questions
    setTimeout(() => {
      setUserQuestions([
        {
          id: 'q1',
          question: 'Which outfit is better for a job interview?',
          category: 'Fashion',
          status: 'completed',
          createdAt: '2025-05-15T09:23:11Z',
          verdictSummary: { optionA: 8, optionB: 4 }
        },
        {
          id: 'q2',
          question: 'Is it ethical to report a coworker who occasionally takes office supplies home?',
          category: 'Moral',
          status: 'active',
          createdAt: '2025-05-18T14:30:22Z',
          verdictSummary: { optionA: 5, optionB: 3 }
        },
        {
          id: 'q3',
          question: 'Should I accept a higher paying job with longer hours or keep my current job with better work-life balance?',
          category: 'Workplace',
          status: 'pending',
          createdAt: '2025-05-20T08:12:45Z',
          verdictSummary: null
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle creating a new question
  const handleCreateQuestion = () => {
    navigate('/questions/new');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Welcome, {user?.name || 'Juror'}!</h1>
        <p style={styles.welcomeText}>
          Ready to get instant verdicts on your dilemmas from our diverse jury?
        </p>
        <button onClick={handleCreateQuestion} style={styles.createButton}>
          Create New Question
        </button>
      </div>
      
      <div style={styles.statsSection}>
        <div style={styles.statsCard}>
          <h3>Your Activity</h3>
          <div style={styles.statRow}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{userQuestions.length}</span>
              <span style={styles.statLabel}>Questions Asked</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>
                {userQuestions.filter(q => q.status === 'completed').length}
              </span>
              <span style={styles.statLabel}>Completed</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>
                {userQuestions.filter(q => q.status === 'active').length}
              </span>
              <span style={styles.statLabel}>Active</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.questionsSection}>
        <h2 style={styles.sectionTitle}>Your Questions</h2>
        {userQuestions.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You haven't asked any questions yet. Create your first question to get started!</p>
          </div>
        ) : (
          <div style={styles.questionsGrid}>
            {userQuestions.map(question => (
              <div key={question.id} style={styles.questionCard}>
                <div style={styles.questionHeader}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: 
                      question.status === 'completed' ? '#4caf50' :
                      question.status === 'active' ? '#2196f3' : '#ff9800'
                  }}>
                    {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                  </span>
                  <span style={styles.categoryTag}>{question.category}</span>
                </div>
                <h3 style={styles.questionTitle}>{question.question}</h3>
                <div style={styles.questionFooter}>
                  <span style={styles.dateText}>
                    {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                  {question.verdictSummary && (
                    <div style={styles.verdictPreview}>
                      <span style={styles.verdictLabel}>Verdict:</span>
                      <span style={styles.verdictCount}>
                        {question.verdictSummary.optionA} - {question.verdictSummary.optionB}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Categories</h2>
        <div style={styles.categoriesGrid}>
          {categories.map(category => (
            <div key={category} style={styles.categoryCard}>
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
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
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '40px 20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: '#1a1a1a'
  },
  welcomeText: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '25px'
  },
  createButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
  },
  statsSection: {
    marginBottom: '40px'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  questionsSection: {
    marginBottom: '40px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    color: '#888'
  },
  questionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column'
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'white'
  },
  categoryTag: {
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#f0f4f8',
    color: '#4a6fa5'
  },
  questionTitle: {
    fontSize: '16px',
    margin: '0 0 15px 0',
    lineHeight: '1.4',
    color: '#333',
    flexGrow: 1
  },
  questionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #eee'
  },
  dateText: {
    fontSize: '12px',
    color: '#999'
  },
  verdictPreview: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  verdictLabel: {
    marginRight: '5px',
    color: '#666'
  },
  verdictCount: {
    fontWeight: '600',
    color: '#333'
  },
  categoriesSection: {
    marginBottom: '40px'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px'
  },
  categoryCard: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '500',
    color: '#1976d2'
  }
};

export default Dashboard;
