import React, { useState } from 'react';
import juryService from '../../services/juryService';

/**
 * Jury Selection Demo Component
 * Demonstrates the jury selection and voting process
 */
const JurySelectionDemo = () => {
  // State for the question
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [category, setCategory] = useState('Moral');
  
  // State for the process
  const [questionId, setQuestionId] = useState(null);
  const [jurors, setJurors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [step, setStep] = useState(1); // 1: Question, 2: Jurors, 3: Voting, 4: Results

  // Available categories
  const categories = ['Moral', 'Fashion', 'Family', 'Workplace', 'Trivial', 'Political'];

  // Handle option change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Create a new question
  const createQuestion = async (e) => {
    e.preventDefault();
    
    if (!question || !options[0] || !options[1]) {
      setError('Please enter a question and both options');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll create a mock question ID
      const mockQuestionId = `q-${Date.now()}`;
      setQuestionId(mockQuestionId);
      setStep(2); // Move to jury selection step
    } catch (err) {
      setError(err.message || 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  // Select jurors for the question
  const selectJurors = async () => {
    if (!questionId) {
      setError('No question ID found');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // This would normally call your API
      // For demo, we'll use the mock data structure from your API route
      const selectedJurors = [];
      
      for (let i = 1; i <= 12; i++) {
        selectedJurors.push({
          id: `juror${i}`,
          farcaster: `juror${i}`,
          demographics: {
            region: ['North America', 'Asia', 'Europe', 'Africa', 'South America'][Math.floor(Math.random() * 5)],
            age_group: ['18-24', '25-34', '35-44', '45-54', '55+'][Math.floor(Math.random() * 5)],
          }
        });
      }
      
      setJurors(selectedJurors);
      setStep(3); // Move to voting step
    } catch (err) {
      setError(err.message || 'Failed to select jurors');
    } finally {
      setLoading(false);
    }
  };

  // Simulate jury voting
  const simulateVoting = async () => {
    if (!questionId || jurors.length === 0) {
      setError('Question ID or jurors missing');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate voting - in real app this would happen asynchronously
      // as real jurors submit their votes
      const votes = [];
      let option1Count = 0;
      let option2Count = 0;
      
      // Assign random votes to each juror
      jurors.forEach(juror => {
        const voteForOption1 = Math.random() < 0.5;
        if (voteForOption1) {
          option1Count++;
          votes.push({ jurorId: juror.id, option: 0 });
        } else {
          option2Count++;
          votes.push({ jurorId: juror.id, option: 1 });
        }
      });
      
      // Create verdict result
      const verdictResult = {
        questionId,
        question,
        options,
        votes: [option1Count, option2Count],
        jurors: jurors.map((juror, index) => ({
          ...juror,
          vote: votes[index].option
        })),
        winner: option1Count > option2Count ? 0 : 1,
        tie: option1Count === option2Count
      };
      
      setVerdict(verdictResult);
      setStep(4); // Move to results step
    } catch (err) {
      setError(err.message || 'Failed to simulate voting');
    } finally {
      setLoading(false);
    }
  };

  // Reset the demo
  const resetDemo = () => {
    setQuestion('');
    setOptions(['', '']);
    setCategory('Moral');
    setQuestionId(null);
    setJurors([]);
    setVerdict(null);
    setError(null);
    setStep(1);
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1976d2',
      marginBottom: '10px',
    },
    step: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
    },
    stepItem: {
      flex: 1,
      textAlign: 'center',
      padding: '15px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      margin: '0 5px',
    },
    activeStep: {
      backgroundColor: '#bbdefb',
      fontWeight: 'bold',
    },
    completedStep: {
      backgroundColor: '#c8e6c9',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '20px',
    },
    form: {
      width: '100%',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    jurorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '15px',
      marginTop: '20px',
    },
    jurorCard: {
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      padding: '15px',
      textAlign: 'center',
    },
    jurorName: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    progressBar: {
      height: '30px',
      marginTop: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '15px',
      overflow: 'hidden',
      display: 'flex',
    },
    progressOption1: {
      backgroundColor: '#ef5350',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      transition: 'width 1s ease-in-out',
    },
    progressOption2: {
      backgroundColor: '#42a5f5',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      transition: 'width 1s ease-in-out',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Jury Selection and Voting Demo</h1>
        <p>See how the jury selection and voting process works</p>
      </div>
      
      <div style={styles.step}>
        <div style={{
          ...styles.stepItem,
          ...(step === 1 ? styles.activeStep : (step > 1 ? styles.completedStep : {}))
        }}>
          1. Create Question
        </div>
        <div style={{
          ...styles.stepItem,
          ...(step === 2 ? styles.activeStep : (step > 2 ? styles.completedStep : {}))
        }}>
          2. Select Jurors
        </div>
        <div style={{
          ...styles.stepItem,
          ...(step === 3 ? styles.activeStep : (step > 3 ? styles.completedStep : {}))
        }}>
          3. Jury Voting
        </div>
        <div style={{
          ...styles.stepItem,
          ...(step === 4 ? styles.activeStep : {})
        }}>
          4. Results
        </div>
      </div>
      
      {error && <div style={styles.error}>{error}</div>}
      
      {/* Step 1: Create Question */}
      {step === 1 && (
        <div style={styles.card}>
          <h2>Create Your Question</h2>
          <form style={styles.form} onSubmit={createQuestion}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Question:</label>
              <input
                type="text"
                style={styles.input}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question..."
                disabled={loading}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Option 1:</label>
              <input
                type="text"
                style={styles.input}
                value={options[0]}
                onChange={(e) => handleOptionChange(0, e.target.value)}
                placeholder="First option..."
                disabled={loading}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Option 2:</label>
              <input
                type="text"
                style={styles.input}
                value={options[1]}
                onChange={(e) => handleOptionChange(1, e.target.value)}
                placeholder="Second option..."
                disabled={loading}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Category:</label>
              <select
                style={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit" 
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Question & Continue'}
            </button>
          </form>
        </div>
      )}
      
      {/* Step 2: Select Jurors */}
      {step === 2 && (
        <div style={styles.card}>
          <h2>Select Jurors</h2>
          <p>
            <strong>Question:</strong> {question}<br />
            <strong>Options:</strong> {options[0]} or {options[1]}<br />
            <strong>Category:</strong> {category}<br />
            <strong>Question ID:</strong> {questionId}
          </p>
          
          <p>Click the button below to select a diverse panel of 12 jurors for this question.</p>
          
          <button 
            style={styles.button}
            onClick={selectJurors}
            disabled={loading}
          >
            {loading ? 'Selecting Jurors...' : 'Select 12 Diverse Jurors'}
          </button>
        </div>
      )}
      
      {/* Step 3: Jury Voting */}
      {step === 3 && (
        <div style={styles.card}>
          <h2>Jury Voting</h2>
          <p>
            <strong>Question:</strong> {question}<br />
            <strong>Options:</strong> {options[0]} or {options[1]}<br />
            <strong>Category:</strong> {category}<br />
            <strong>Question ID:</strong> {questionId}
          </p>
          
          <h3>Selected Jurors:</h3>
          <div style={styles.jurorGrid}>
            {jurors.map((juror) => (
              <div key={juror.id} style={styles.jurorCard}>
                <div style={styles.jurorName}>{juror.farcaster}</div>
                <div>Region: {juror.demographics.region}</div>
                <div>Age: {juror.demographics.age_group}</div>
              </div>
            ))}
          </div>
          
          <p style={{ marginTop: '20px' }}>Click the button below to simulate the voting process.</p>
          <p>In a real app, these jurors would vote asynchronously over time.</p>
          
          <button 
            style={styles.button}
            onClick={simulateVoting}
            disabled={loading}
          >
            {loading ? 'Collecting Votes...' : 'Simulate Jury Voting'}
          </button>
        </div>
      )}
      
      {/* Step 4: Results */}
      {step === 4 && verdict && (
        <div style={styles.card}>
          <h2>Jury Verdict Results</h2>
          
          <p>
            <strong>Question:</strong> {verdict.question}<br />
            <strong>Question ID:</strong> {verdict.questionId}
          </p>
          
          {/* Vote results progress bar */}
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressOption1,
                width: `${(verdict.votes[0] / 12) * 100}%`,
              }}
            >
              {verdict.votes[0]}
            </div>
            <div 
              style={{
                ...styles.progressOption2,
                width: `${(verdict.votes[1] / 12) * 100}%`,
              }}
            >
              {verdict.votes[1]}
            </div>
          </div>
          
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div><strong style={{ color: '#ef5350' }}>{options[0]}:</strong> {verdict.votes[0]} votes</div>
            <div><strong style={{ color: '#42a5f5' }}>{options[1]}:</strong> {verdict.votes[1]} votes</div>
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>Final Verdict</h3>
            {verdict.tie ? (
              <p>It's a tie! The jury is equally divided.</p>
            ) : (
              <p>The jury has decided: <strong>{options[verdict.winner]}</strong></p>
            )}
          </div>
          
          <h3>How Each Juror Voted:</h3>
          <div style={styles.jurorGrid}>
            {verdict.jurors.map((juror) => (
              <div 
                key={juror.id} 
                style={{
                  ...styles.jurorCard,
                  backgroundColor: juror.vote === 0 ? '#ffcdd2' : '#bbdefb'
                }}
              >
                <div style={styles.jurorName}>{juror.farcaster}</div>
                <div>Region: {juror.demographics.region}</div>
                <div>Age: {juror.demographics.age_group}</div>
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                  Voted: {options[juror.vote]}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            style={styles.button}
            onClick={resetDemo}
          >
            Start Over with New Question
          </button>
        </div>
      )}
    </div>
  );
};

export default JurySelectionDemo;
