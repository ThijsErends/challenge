import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Puzzle Error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  handleGoHome = () => {
    window.location.hash = '#/'
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>🔧</div>
          <h2 className={styles.errorTitle}>Oeps! Er ging iets mis</h2>
          <p className={styles.errorMessage}>
            Deze puzzel werkt even niet mee. Geen zorgen, Piet is al bezig met de reparatie!
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className={styles.errorDetails}>
              <summary>Technische details (voor ontwikkelaars)</summary>
              <pre className={styles.errorStack}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          
          <div className={styles.errorActions}>
            <button 
              className={styles.retryButton}
              onClick={this.handleRetry}
            >
              Probeer Opnieuw
            </button>
            <button 
              className={styles.homeButton}
              onClick={this.handleGoHome}
            >
              Terug naar Start
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

