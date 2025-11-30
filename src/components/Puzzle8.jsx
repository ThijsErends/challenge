import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle8.module.css'

function Puzzle8() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [inputWord, setInputWord] = useState('')
  const [removedLetters, setRemovedLetters] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [shake, setShake] = useState(false)

  // The word that sounds the same with only 1 letter remaining
  const correctAnswer = 'queue'
  const displayWord = 'QUEUE'

  // Track which letters are removed
  const handleLetterClick = (index) => {
    if (isCompleted) return
    
    if (removedLetters.includes(index)) {
      // Restore the letter
      setRemovedLetters(removedLetters.filter(i => i !== index))
    } else {
      // Remove the letter
      setRemovedLetters([...removedLetters, index])
    }
    setErrorMessage('')
  }

  // Get remaining letters
  const getRemainingWord = () => {
    return displayWord
      .split('')
      .filter((_, index) => !removedLetters.includes(index))
      .join('')
  }

  const handleCheck = () => {
    const remaining = getRemainingWord()
    
    // The puzzle is solved when exactly 4 letters are removed (1 remains)
    // AND the word was "QUEUE"
    if (removedLetters.length === 4 && remaining.length === 1) {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(8, correctAnswer)
    } else if (removedLetters.length < 4) {
      setErrorMessage(`Je moet nog ${4 - removedLetters.length} letter(s) verwijderen!`)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } else {
      setErrorMessage('Onjuist. Probeer een ander woord!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleReset = () => {
    setRemovedLetters([])
    setInputWord('')
    setErrorMessage('')
    setShowHint(false)
  }

  const handleInputSubmit = () => {
    const trimmed = inputWord.trim().toLowerCase()
    if (trimmed === correctAnswer) {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(8, correctAnswer)
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit()
    }
  }

  const handleNext = () => {
    navigate('/puzzle-9')
  }

  const remainingWord = getRemainingWord()

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 8: De Verdwijnende Letters</h2>
      
      <div className={styles.riddleBox}>
        <p className={styles.riddleText}>
          "Welk woord van 5 letters wordt hetzelfde uitgesproken als je vier van de vijf letters weghaalt?"
        </p>
      </div>

      <div className={styles.gameSection}>
        <p className={styles.instructions}>
          Klik op de letters hieronder om ze te verwijderen. 
          Vind het woord dat hetzelfde klinkt met slechts 1 letter!
        </p>

        <div className={`${styles.wordDisplay} ${shake ? styles.shake : ''}`}>
          {displayWord.split('').map((letter, index) => (
            <button
              key={index}
              className={`${styles.letterTile} ${
                removedLetters.includes(index) ? styles.removed : ''
              }`}
              onClick={() => handleLetterClick(index)}
              disabled={isCompleted}
            >
              <span className={styles.letter}>{letter}</span>
              {removedLetters.includes(index) && (
                <span className={styles.removedMark}>✕</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.resultPreview}>
          <span className={styles.resultLabel}>Overblijvend woord:</span>
          <span className={styles.resultWord}>
            {remainingWord || '—'}
          </span>
          <span className={styles.pronunciation}>
            Uitspraak: "{remainingWord ? 'kjoe' : '—'}"
          </span>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            Verwijderd: <strong>{removedLetters.length}</strong> / 4 letters
          </span>
        </div>

        <div className={styles.controls}>
          {!isCompleted ? (
            <>
              <button className={styles.resetButton} onClick={handleReset}>
                Opnieuw
              </button>
              <button className={styles.checkButton} onClick={handleCheck}>
                Controleer
              </button>
            </>
          ) : (
            <button className={styles.nextButton} onClick={handleNext}>
              Volgende Puzzel
            </button>
          )}
        </div>
      </div>

      <div className={styles.divider}>
        <span>of</span>
      </div>

      <div className={styles.inputSection}>
        <p className={styles.inputLabel}>Ken je het antwoord al? Typ het hier:</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Typ je antwoord..."
            disabled={isCompleted}
            className={styles.textInput}
          />
          <button 
            className={styles.submitButton}
            onClick={handleInputSubmit}
            disabled={isCompleted}
          >
            Indienen
          </button>
        </div>
      </div>

      {!showHint && !isCompleted && (
        <button 
          className={styles.hintButton}
          onClick={() => setShowHint(true)}
        >
          Hint nodig?
        </button>
      )}

      {showHint && !isCompleted && (
        <div className={styles.hintBox}>
          <p className={styles.hintText}>
            💡 Denk aan een Engels woord voor een rij mensen die wachten...
          </p>
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {isCompleted && (
        <div className={styles.successMessage}>
          <p className={styles.successTitle}>Correct! 🎉</p>
          <p className={styles.successExplanation}>
            Het woord "QUEUE" wordt uitgesproken als "kjoe" — 
            precies hetzelfde als alleen de letter "Q"!
          </p>
        </div>
      )}
    </div>
  )
}

export default Puzzle8
