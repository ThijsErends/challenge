import { useState, useEffect } from 'react'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle10.module.css'

// Correct passwords for puzzles 1-9
const CORRECT_PASSWORDS = {
  1: 'pepernoot',
  2: 'rood-groen-turquoise-oranje',
  3: 'schaakmat',
  4: 'dak',
  5: 'de kados zijn verborgen',
  6: 'pakjesboot',
  7: 'legpuzzel',
  8: 'queue',
  9: 'schoorsteen',
}

const FINAL_CODE = '4728'

// Generate confetti pieces with various shapes
const generateConfetti = (count) => {
  const colors = ['#C94343', '#439F47', '#2AB7CA', '#F7931E', '#9B59B6', '#F1C40F', '#FFD700', '#C0C0C0']
  const shapes = ['square', 'rectangle', 'circle', 'star']
  const confetti = []
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 14,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      spinSpeed: 0.5 + Math.random() * 1.5,
    })
  }
  return confetti
}

// Generate sparkle particles
const generateSparkles = (count) => {
  const sparkles = []
  for (let i = 0; i < count; i++) {
    sparkles.push({
      id: i,
      left: 30 + Math.random() * 40,
      top: 20 + Math.random() * 40,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 1,
      size: 4 + Math.random() * 8,
    })
  }
  return sparkles
}

// Generate firework bursts
const generateFireworks = (count) => {
  const colors = ['#C94343', '#439F47', '#2AB7CA', '#F7931E', '#FFD700']
  const fireworks = []
  for (let i = 0; i < count; i++) {
    fireworks.push({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 40,
      delay: 0.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 80 + Math.random() * 60,
    })
  }
  return fireworks
}

function Puzzle10() {
  const [passwords, setPasswords] = useState({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
  })
  const [allCorrect, setAllCorrect] = useState(false)
  const [animationPhase, setAnimationPhase] = useState('input') // input, buildup, awakening, unwrapping, reveal, victory
  const [confetti, setConfetti] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [fireworks, setFireworks] = useState([])
  const { markPuzzleSolved } = usePuzzleProgress()

  // Check if a single password is correct
  const isPasswordCorrect = (puzzleNum) => {
    const input = passwords[puzzleNum].trim().toLowerCase()
    const correct = CORRECT_PASSWORDS[puzzleNum].toLowerCase()
    return input === correct
  }

  // Check if all passwords are correct
  useEffect(() => {
    const allValid = Object.keys(CORRECT_PASSWORDS).every(num => isPasswordCorrect(Number(num)))
    if (allValid && !allCorrect) {
      setAllCorrect(true)
      startUnlockSequence()
    }
  }, [passwords])

  const startUnlockSequence = () => {
    // Phase 1: Build-up
    setAnimationPhase('buildup')

    // Phase 2: Awakening (after 0.8s)
    setTimeout(() => {
      setAnimationPhase('awakening')
      setSparkles(generateSparkles(20))
    }, 800)

    // Phase 3: Unwrapping (after 2s)
    setTimeout(() => {
      setAnimationPhase('unwrapping')
    }, 2000)

    // Phase 4: Reveal (after 3.5s)
    setTimeout(() => {
      setAnimationPhase('reveal')
      setConfetti(generateConfetti(150))
      setFireworks(generateFireworks(8))
      markPuzzleSolved(10, FINAL_CODE)
    }, 3500)

    // Phase 5: Victory (after 5s)
    setTimeout(() => {
      setAnimationPhase('victory')
    }, 5000)
  }

  const handlePasswordChange = (puzzleNum, value) => {
    setPasswords(prev => ({
      ...prev,
      [puzzleNum]: value
    }))
  }

  const getConfettiStyle = (piece) => {
    let borderRadius = '3px'
    let width = piece.size
    let height = piece.size

    if (piece.shape === 'rectangle') {
      height = piece.size * 0.4
    } else if (piece.shape === 'circle') {
      borderRadius = '50%'
    } else if (piece.shape === 'star') {
      borderRadius = '2px'
      // Star shape approximation
    }

    return {
      left: `${piece.left}%`,
      animationDelay: `${piece.delay}s`,
      animationDuration: `${piece.duration}s`,
      backgroundColor: piece.color,
      transform: `rotate(${piece.rotation}deg)`,
      width: `${width}px`,
      height: `${height}px`,
      borderRadius,
    }
  }

  // Victory screen
  if (animationPhase === 'victory') {
    return (
      <div className={styles.victoryContainer}>
        {/* Confetti */}
        <div className={styles.confettiContainer}>
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className={styles.confetti}
              style={getConfettiStyle(piece)}
            />
          ))}
        </div>

        {/* Fireworks */}
        <div className={styles.fireworksContainer}>
          {fireworks.map((fw) => (
            <div
              key={fw.id}
              className={styles.firework}
              style={{
                left: `${fw.left}%`,
                top: `${fw.top}%`,
                animationDelay: `${fw.delay}s`,
                '--firework-color': fw.color,
                '--firework-size': `${fw.size}px`,
              }}
            />
          ))}
        </div>

        {/* Victory content */}
        <div className={styles.victoryContent}>
          <div className={styles.trophyIcon}>🎁</div>
          <h1 className={styles.victoryTitle}>GEFELICITEERD!</h1>
          <p className={styles.victorySubtitle}>
            Je hebt alle wachtwoorden onthouden en het cadeau geopend!
          </p>

          {/* Code reveal */}
          <div className={`${styles.codeReveal} ${styles.revealed}`}>
            <p className={styles.codeLabel}>De 4-Cijferige Code:</p>
            <div className={styles.codeDisplay}>
              {FINAL_CODE.split('').map((digit, i) => (
                <span key={i} className={styles.codeDigit}>{digit}</span>
              ))}
            </div>
          </div>

          {/* Journey summary */}
          <div className={styles.journeySummary}>
            <h3 className={styles.journeyTitle}>Je Reis</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🧩</span>
                <span className={styles.statValue}>10</span>
                <span className={styles.statLabel}>Puzzels Opgelost</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🔑</span>
                <span className={styles.statValue}>9</span>
                <span className={styles.statLabel}>Wachtwoorden</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🎁</span>
                <span className={styles.statValue}>1</span>
                <span className={styles.statLabel}>Cadeau Geopend</span>
              </div>
            </div>
          </div>

          {/* Final message */}
          <div className={styles.finalMessage}>
            <p className={styles.glitchMessage}>
              "Uitstekend gedaan, puzzelmeester! Je hebt bewezen dat je een
              uitstekend geheugen hebt én alle uitdagingen hebt overwonnen.
              Gebruik deze code om je echte cadeau te openen!"
            </p>
            <p className={styles.signature}>— Sinterklaas</p>
          </div>
        </div>
      </div>
    )
  }

  // Main puzzle screen with present
  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 10: Het Grote Cadeau</h2>

      <p className={styles.instructions}>
        Vul alle wachtwoorden in die je tijdens je reis hebt verzameld om het cadeau te openen!
      </p>

      {/* Main content area - passwords on left, present on right */}
      <div className={styles.mainContent}>
        {/* Password input fields - two columns */}
        <div className={styles.passwordSection}>
          <div className={`${styles.passwordColumns} ${animationPhase !== 'input' ? styles.disabled : ''}`}>
            {/* Left column: puzzles 1-5 */}
            <div className={styles.passwordColumn}>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className={styles.passwordRow}>
                  <span className={styles.puzzleNumber}>{num}</span>
                  <input
                    type="text"
                    value={passwords[num]}
                    onChange={(e) => handlePasswordChange(num, e.target.value)}
                    placeholder={`Puzzel ${num}`}
                    className={styles.passwordInput}
                    disabled={animationPhase !== 'input'}
                  />
                  <span className={`${styles.validationIcon} ${
                    passwords[num].trim() === ''
                      ? ''
                      : isPasswordCorrect(num)
                        ? styles.correct
                        : styles.incorrect
                  }`}>
                    {passwords[num].trim() !== '' && (isPasswordCorrect(num) ? '✓' : '✗')}
                  </span>
                </div>
              ))}
            </div>
            {/* Right column: puzzles 6-9 */}
            <div className={styles.passwordColumn}>
              {[6, 7, 8, 9].map((num) => (
                <div key={num} className={styles.passwordRow}>
                  <span className={styles.puzzleNumber}>{num}</span>
                  <input
                    type="text"
                    value={passwords[num]}
                    onChange={(e) => handlePasswordChange(num, e.target.value)}
                    placeholder={`Puzzel ${num}`}
                    className={styles.passwordInput}
                    disabled={animationPhase !== 'input'}
                  />
                  <span className={`${styles.validationIcon} ${
                    passwords[num].trim() === ''
                      ? ''
                      : isPasswordCorrect(num)
                        ? styles.correct
                        : styles.incorrect
                  }`}>
                    {passwords[num].trim() !== '' && (isPasswordCorrect(num) ? '✓' : '✗')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(Object.keys(CORRECT_PASSWORDS).filter(num => isPasswordCorrect(Number(num))).length / 9) * 100}%`
              }}
            />
          </div>
          <p className={styles.progressText}>
            {Object.keys(CORRECT_PASSWORDS).filter(num => isPasswordCorrect(Number(num))).length} / 9 wachtwoorden correct
          </p>
        </div>

        {/* Present container */}
        <div className={`${styles.presentWrapper} ${styles[animationPhase]}`}>
          {/* Sparkles during awakening */}
          {(animationPhase === 'awakening' || animationPhase === 'unwrapping') && (
            <div className={styles.sparklesContainer}>
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className={styles.sparkle}
                  style={{
                    left: `${sp.left}%`,
                    top: `${sp.top}%`,
                    animationDelay: `${sp.delay}s`,
                    animationDuration: `${sp.duration}s`,
                    width: `${sp.size}px`,
                    height: `${sp.size}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Light beam during reveal */}
          {animationPhase === 'reveal' && (
            <div className={styles.lightBeam} />
          )}

          {/* The present box */}
          <div className={styles.present}>
            {/* Bow */}
            <div className={styles.bow}>
              <div className={styles.bowLoop1}></div>
              <div className={styles.bowLoop2}></div>
              <div className={styles.bowKnot}></div>
            </div>

            {/* Ribbon vertical */}
            <div className={styles.ribbonVertical}></div>

            {/* Ribbon horizontal */}
            <div className={styles.ribbonHorizontal}></div>

            {/* Present lid */}
            <div className={styles.presentLid}>
              <div className={styles.lidRibbon}></div>
            </div>

            {/* Present body */}
            <div className={styles.presentBody}></div>

            {/* Code reveal inside present */}
            {animationPhase === 'reveal' && (
              <div className={styles.codeInPresent}>
                {FINAL_CODE.split('').map((digit, i) => (
                  <span key={i} className={styles.revealDigit} style={{ animationDelay: `${i * 0.15}s` }}>
                    {digit}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Puzzle10
