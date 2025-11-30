import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import { puzzleMetadata } from '../data/puzzleMetadata'
import styles from './SidebarNavigation.module.css'

function SidebarNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { 
    isPuzzleSolved, 
    getPuzzlePassword, 
    canAccessPuzzle,
    resetProgress,
    unlockAllPuzzles
  } = usePuzzleProgress()
  
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === ''

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-close sidebar on mobile when resizing to desktop
      if (!mobile && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [location.pathname, isMobile, isOpen])

  const handlePuzzleClick = (puzzleNumber, route) => {
    if (canAccessPuzzle(puzzleNumber)) {
      navigate(route)
    }
  }

  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
    navigate('/')
  }

  const handleUnlockAll = () => {
    unlockAllPuzzles()
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className={styles.backdrop}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isMobile ? styles.mobile : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Puzzels</h2>
        </div>

        <div className={styles.puzzleList}>
          {puzzleMetadata.map((puzzle) => {
            const solved = isPuzzleSolved(puzzle.number)
            const accessible = canAccessPuzzle(puzzle.number)
            const password = getPuzzlePassword(puzzle.number)
            // Handle HashRouter - pathname is "/" and hash contains the route
            const currentHash = location.hash || ''
            const currentPath = location.pathname === '/' && currentHash ? currentHash.replace('#', '') : location.pathname
            const isActive = currentPath === puzzle.route || currentHash === `#${puzzle.route}`
            
            // Assign different colors to puzzles for variety
            const puzzleColors = [
              null, // 0 - not used
              'var(--puzzle-purple)',    // 1
              'var(--puzzle-yellow)',   // 2
              'var(--puzzle-blue)',      // 3
              'var(--puzzle-pink)',      // 4
              'var(--puzzle-cyan)',      // 5
              'var(--puzzle-indigo)',    // 6
              'var(--puzzle-coral)',     // 7
              'var(--puzzle-lavender)',  // 8
              'var(--ushanka-green)',    // 9
              'var(--parka-orange)'      // 10
            ]
            const puzzleColor = puzzleColors[puzzle.number] || 'var(--paper-white)'

            // Determine background color based on state
            // Priority: disabled > active > solved > default puzzle color
            let bgColor = puzzleColor
            if (!accessible) {
              bgColor = '#e0e0e0'
            } else if (isActive) {
              bgColor = 'var(--parka-orange)'
            } else if (solved) {
              bgColor = 'var(--ushanka-green)'
            }

            return (
              <button
                key={puzzle.number}
                className={`${styles.puzzleButton} ${
                  !accessible ? styles.disabled : ''
                } ${solved ? styles.solved : ''} ${
                  isActive ? styles.active : ''
                }`}
                style={{
                  backgroundColor: bgColor
                }}
                onClick={() => handlePuzzleClick(puzzle.number, puzzle.route)}
                disabled={!accessible}
                title={!accessible ? 'Los eerst de vorige puzzel op' : puzzle.description}
              >
                <div className={styles.puzzleButtonContent}>
                  <div className={styles.puzzleHeader}>
                    <span className={styles.puzzleNumber}>#{puzzle.number}</span>
                    <span className={styles.puzzleTitle}>{puzzle.title}</span>
                    {solved && (
                      <span className={styles.checkmark} aria-label="Opgelost">✓</span>
                    )}
                  </div>
                  {solved && password && (
                    <div className={styles.passwordDisplay}>
                      <span className={styles.passwordLabel}>Wachtwoord:</span>
                      <span className={styles.passwordValue}>{password}</span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.resetButton}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset Voortgang
          </button>

          {isLocalhost && (
            <button
              className={styles.devButton}
              onClick={handleUnlockAll}
              title="Development tool - Unlock all puzzles for testing"
            >
              [DEV] Unlock All
            </button>
          )}
        </div>

        {/* Reset confirmation dialog */}
        {showResetConfirm && (
          <div className={styles.confirmDialog}>
            <div className={styles.confirmContent}>
              <p>Weet je zeker dat je alle voortgang wilt resetten?</p>
              <div className={styles.confirmButtons}>
                <button
                  className={styles.confirmYes}
                  onClick={handleReset}
                >
                  Ja, Reset
                </button>
                <button
                  className={styles.confirmNo}
                  onClick={() => setShowResetConfirm(false)}
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default SidebarNavigation

