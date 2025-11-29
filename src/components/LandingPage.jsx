import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <Link to="/puzzle-1" className={styles.startButton}>
        Start Challenge
      </Link>
    </div>
  )
}

export default LandingPage

