import React from 'react';

/**
 * Error boundary component to catch JavaScript errors
 * and display a fallback UI instead of crashing the app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={styles.errorContainer}>
          <h2 style={styles.errorTitle}>Something went wrong</h2>
          <p style={styles.errorMessage}>
            An error occurred while rendering the JuryNow application.
          </p>
          <details style={styles.errorDetails}>
            <summary style={styles.errorSummary}>Error details (for developers)</summary>
            <pre style={styles.errorCode}>{this.state.error?.toString()}</pre>
            <pre style={styles.errorStack}>
              {this.state.errorInfo?.componentStack || 'No stack trace available'}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Styles
const styles = {
  errorContainer: {
    padding: '20px',
    backgroundColor: '#fff8f8',
    border: '1px solid #ffcdd2',
    borderRadius: '4px',
    margin: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  errorTitle: {
    color: '#d32f2f',
    marginBottom: '10px'
  },
  errorMessage: {
    marginBottom: '15px'
  },
  errorDetails: {
    marginTop: '20px'
  },
  errorSummary: {
    cursor: 'pointer',
    color: '#0277bd',
    padding: '8px 0'
  },
  errorCode: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px',
    marginBottom: '10px'
  },
  errorStack: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '300px',
    fontSize: '12px',
    fontFamily: 'monospace'
  }
};

export default ErrorBoundary;
