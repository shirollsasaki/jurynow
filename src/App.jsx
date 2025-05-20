import React, { useState, useEffect } from 'react';
import JurySelectionDemo from './components/jury/JurySelectionDemo';

/**
 * JuryNow App Component - Improved version with demo functionality and jury selection
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerdict, setShowVerdict] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  // Apply the spin animation with proper CSS
  useEffect(() => {
    // Dynamically inject keyframes if not already present
    if (!document.getElementById('spinKeyframes')) {
      const style = document.createElement('style');
      style.id = 'spinKeyframes';
      style.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Styles for the app
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f5f7fa'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      width: '100%'
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
      fontWeight: 'bold',
      margin: '0 auto 16px'
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
      marginTop: '8px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px'
    },
    button: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '20px'
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginRight: '8px',
      borderRadius: '50%',
      borderTop: '2px solid white',
      borderRight: '2px solid transparent',
      animation: 'spin 1s linear infinite'
    },
    verdictCard: {
      backgroundColor: '#f0f7ff',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '30px',
      width: '100%'
    },
    verdictTitle: {
      color: '#1976d2',
      marginBottom: '15px'
    },
    jurorsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    juror: {
      width: '40px',
      height: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '50%',
      margin: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    jurorVoted: {
      backgroundColor: '#c8e6c9',
      color: '#2e7d32'
    },
    resultBar: {
      display: 'flex',
      height: '30px',
      borderRadius: '15px',
      overflow: 'hidden',
      marginBottom: '10px'
    },
    resultOption1: {
      backgroundColor: '#f44336',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    resultOption2: {
      backgroundColor: '#2196f3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !options[0] || !options[1]) {
      alert('Please fill in the question and both options');
      return;
    }
    
    setIsLoading(true);
    setShowVerdict(false);
    
    // Simulate jury verdict (in a real app, this would be an API call)
    setTimeout(() => {
      const option1Votes = Math.floor(Math.random() * 12);
      const option2Votes = 12 - option1Votes;
      
      setVerdict({
        question,
        options: [options[0], options[1]],
        votes: [option1Votes, option2Votes],
        totalJurors: 12
      });
      
      setIsLoading(false);
      setShowVerdict(true);
    }, 3000);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // State to toggle between simple demo and advanced jury selection demo
  const [showAdvancedDemo, setShowAdvancedDemo] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>J</div>
        <h1 style={styles.title}>JuryNow</h1>
        <p style={styles.subtitle}>Get instant verdicts from around the world</p>
        
        <div style={{marginTop: '20px'}}>
          <button
            style={{...styles.button, marginRight: '10px', backgroundColor: !showAdvancedDemo ? '#1976d2' : '#9e9e9e'}}
            onClick={() => setShowAdvancedDemo(false)}
          >
            Simple Demo
          </button>
          <button
            style={{...styles.button, backgroundColor: showAdvancedDemo ? '#1976d2' : '#9e9e9e'}}
            onClick={() => setShowAdvancedDemo(true)}
          >
            Jury Selection Demo
          </button>
        </div>
      </div>
      
      {!showAdvancedDemo ? (
        <>
          <div style={styles.card}>
            <h2>Submit Your Question</h2>
            <p>Ask a jury of 12 to decide between two options</p>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Question:</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="e.g., Which outfit looks better?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Option 1:</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="First option"
                  value={options[0]}
                  onChange={(e) => handleOptionChange(0, e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Option 2:</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Second option"
                  value={options[1]}
                  onChange={(e) => handleOptionChange(1, e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <button 
                type="submit"
                style={styles.button} 
                disabled={isLoading}
              >
                {isLoading && <span style={styles.spinner}></span>}
                {isLoading ? 'Collecting Verdicts...' : 'Ask the Jury'}
              </button>
            </form>
          </div>
          
          {showVerdict && verdict && (
            <div style={styles.card}>
              <h2 style={styles.verdictTitle}>Jury Verdict</h2>
              
              <p><strong>Question:</strong> {verdict.question}</p>
              
              <div style={styles.jurorsContainer}>
                {Array.from({ length: verdict.totalJurors }).map((_, index) => (
                  <div 
                    key={index} 
                    style={{
                      ...styles.juror,
                      ...((index < verdict.votes[0]) ? { backgroundColor: '#ffcdd2' } : { backgroundColor: '#bbdefb' })
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              
              <div style={styles.resultBar}>
                <div 
                  style={{
                    ...styles.resultOption1,
                    width: `${(verdict.votes[0] / verdict.totalJurors) * 100}%`
                  }}
                >
                  {verdict.votes[0]}
                </div>
                <div 
                  style={{
                    ...styles.resultOption2,
                    width: `${(verdict.votes[1] / verdict.totalJurors) * 100}%`
                  }}
                >
                  {verdict.votes[1]}
                </div>
              </div>
              
              <div>
                <p><strong>{verdict.options[0]}</strong>: {verdict.votes[0]} votes</p>
                <p><strong>{verdict.options[1]}</strong>: {verdict.votes[1]} votes</p>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <strong>Verdict: </strong> 
                {verdict.votes[0] > verdict.votes[1] ? verdict.options[0] : verdict.options[1]}
                {verdict.votes[0] === verdict.votes[1] && "It's a tie!"}
              </div>
              
              <button 
                style={styles.button} 
                onClick={() => {
                  setShowVerdict(false);
                  setQuestion('');
                  setOptions(['', '']);
                }}
              >
                Ask Another Question
              </button>
            </div>
          )}
        </>
      ) : (
        <JurySelectionDemo />
      )}
    </div>
  );
}
