import { useState, useEffect } from 'react'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle10.module.css'

// Generate confetti pieces
const generateConfetti = (count) => {
  const colors = ['#C94343', '#439F47', '#2AB7CA', '#F7931E', '#9B59B6', '#F1C40F']
  const confetti = []
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 12,
    })
  }
  return confetti
}

function Puzzle10() {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [codeRevealed, setCodeRevealed] = useState(false)
  const [shake, setShake] = useState(false)
  const { markPuzzleSolved, getAllProgress } = usePuzzleProgress()

  // Calculate journey stats
  const progress = getAllProgress()
  const solvedCount = Object.keys(progress).length
  const firstSolveTime = Object.values(progress)
    .map(p => p.solvedAt)
    .sort()[0]

  useEffect(() => {
    if (showSuccess) {
      setConfetti(generateConfetti(50))
      // Reveal code after a short delay for dramatic effect
      setTimeout(() => setCodeRevealed(true), 1500)
    }
  }, [showSuccess])

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase()
    if (trimmedAnswer === 'een fles' || trimmedAnswer === 'fles') {
      setShowSuccess(true)
      setResult('')
      markPuzzleSolved(10, '1006')
    } else {
      setResult('Onjuist. Probeer opnieuw.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (showSuccess) {
    return (
      <div className={styles.victoryContainer}>
        {/* Confetti */}
        <div className={styles.confettiContainer}>
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className={styles.confetti}
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
              }}
            />
          ))}
        </div>

        {/* Victory content */}
        <div className={styles.victoryContent}>
          <div className={styles.trophyIcon}>🏆</div>
          <h1 className={styles.victoryTitle}>GEFELICITEERD!</h1>
          <p className={styles.victorySubtitle}>
            Je hebt het labyrint van Glitch overwonnen!
          </p>

          {/* Code reveal */}
          <div className={`${styles.codeReveal} ${codeRevealed ? styles.revealed : ''}`}>
            <p className={styles.codeLabel}>De 4-Cijferige Goat Code:</p>
            <div className={styles.codeDisplay}>
              {codeRevealed ? (
                <>
                  <span className={styles.codeDigit}>1</span>
                  <span className={styles.codeDigit}>0</span>
                  <span className={styles.codeDigit}>0</span>
                  <span className={styles.codeDigit}>6</span>
                </>
              ) : (
                <>
                  <span className={styles.codeDigit}>?</span>
                  <span className={styles.codeDigit}>?</span>
                  <span className={styles.codeDigit}>?</span>
                  <span className={styles.codeDigit}>?</span>
                </>
              )}
            </div>
          </div>

          {/* Code explanation */}
          {codeRevealed && (
            <div className={styles.codeExplanation}>
              <p className={styles.explanationTitle}>Hoe de code werkt:</p>
              <ul className={styles.explanationList}>
                <li><strong>1</strong> = Nummer van puzzel 1</li>
                <li><strong>0</strong> = Laatste cijfer van puzzel 10</li>
                <li><strong>0</strong> = Laatste cijfer van 10 puzzels</li>
                <li><strong>6</strong> = Letters in "een fles" (zonder spatie)</li>
              </ul>
            </div>
          )}

          {/* Journey summary */}
          <div className={styles.journeySummary}>
            <h3 className={styles.journeyTitle}>Je Reis</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🧩</span>
                <span className={styles.statValue}>{solvedCount}</span>
                <span className={styles.statLabel}>Puzzels Opgelost</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🎯</span>
                <span className={styles.statValue}>100%</span>
                <span className={styles.statLabel}>Voltooid</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statEmoji}>🐐</span>
                <span className={styles.statValue}>1</span>
                <span className={styles.statLabel}>Geit Verdiend</span>
              </div>
            </div>
          </div>

          {/* Final message */}
          <div className={styles.finalMessage}>
            <p className={styles.glitchMessage}>
              "Uitstekend gedaan, puzzelmeester! Je hebt bewezen dat je scherp, 
              geduldig en vastberaden bent. De geit is nu van jou!"
            </p>
            <p className={styles.signature}>— Glitch</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 10: De Grand Finale</h2>
      
      <div className={styles.riddleBox}>
        <p className={styles.riddleText}>
          "Ik heb een nek, maar geen hoofd.<br />
          Ik heb een lichaam, maar geen benen.<br />
          Ik heb een etiket, maar geen naam.<br />
          Ik ben gevuld met een geest, maar ik leef niet."
        </p>
        <p className={styles.riddleQuestion}>Wat ben ik?</p>
      </div>

      <div className={styles.codeInstructions}>
        <p className={styles.instructionsTitle}>De 4-cijferige code wordt samengesteld:</p>
        <ul className={styles.instructionsList}>
          <li>Het <strong>eerste</strong> cijfer is het nummer van de eerste puzzel</li>
          <li>Het <strong>tweede</strong> cijfer is het laatste cijfer van het nummer van de laatste puzzel</li>
          <li>Het <strong>derde</strong> cijfer is het totaal aantal puzzels (neem het laatste cijfer)</li>
          <li>Het <strong>vierde</strong> cijfer is het aantal letters in het antwoord (zonder spaties)</li>
        </ul>
      </div>

      <div className={`${styles.inputSection} ${shake ? styles.shake : ''}`}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Typ je antwoord..."
          className={styles.answerInput}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          Onthul de Code
        </button>
      </div>

      {result && (
        <div className={styles.errorMessage}>{result}</div>
      )}
    </div>
  )
}

export default Puzzle10
