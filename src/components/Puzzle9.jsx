import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle9.module.css'

// Target colors for each chimney
const CHIMNEY_COLORS = ['red', 'green', 'orange', 'blue']
const CHIMNEY_LABELS = ['Rood', 'Groen', 'Oranje', 'Blauw']

// Initial presents - all start on chimney 0 (3 per color, 12 total)
const INITIAL_PRESENTS = [
  { id: 'r1', color: 'red', size: 4 },      // Extra large red
  { id: 'r2', color: 'red', size: 3 },      // Large red
  { id: 'r3', color: 'red', size: 2 },      // Medium red
  { id: 'g1', color: 'green', size: 4 },    // Extra large green
  { id: 'g2', color: 'green', size: 3 },    // Large green
  { id: 'g3', color: 'green', size: 2 },    // Medium green
  { id: 'o1', color: 'orange', size: 4 },   // Extra large orange
  { id: 'o2', color: 'orange', size: 3 },   // Large orange
  { id: 'o3', color: 'orange', size: 2 },   // Medium orange
  { id: 'b1', color: 'blue', size: 4 },     // Extra large blue
  { id: 'b2', color: 'blue', size: 3 },     // Large blue
  { id: 'b3', color: 'blue', size: 2 },     // Medium blue
]

function initializeChimneys() {
  // All presents start on chimney 0, sorted by size (largest at bottom)
  const sorted = [...INITIAL_PRESENTS].sort((a, b) => b.size - a.size)
  return [sorted, [], [], []]
}

// Present component
function Present({ present, isSelected, isTopPresent, onClick }) {
  const sizeClass = present.size === 4 ? styles.presentExtraLarge
    : present.size === 3 ? styles.presentLarge
    : present.size === 2 ? styles.presentMedium
    : styles.presentSmall

  const colorClass = present.color === 'red' ? styles.presentRed
    : present.color === 'green' ? styles.presentGreen
    : present.color === 'blue' ? styles.presentBlue
    : styles.presentOrange

  return (
    <div
      className={`${styles.present} ${sizeClass} ${colorClass} ${isSelected ? styles.selected : ''}`}
      onClick={isTopPresent ? onClick : undefined}
      role="button"
      aria-label={`${present.color} cadeau, grootte ${present.size}${isSelected ? ', geselecteerd' : ''}`}
      tabIndex={isTopPresent ? 0 : -1}
      onKeyDown={(e) => {
        if (isTopPresent && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick?.()
        }
      }}
      style={{ cursor: isTopPresent ? 'pointer' : 'default' }}
    >
      <div className={`${styles.ribbon} ${styles.ribbonHorizontal}`} />
      <div className={`${styles.ribbon} ${styles.ribbonVertical}`} />
    </div>
  )
}

// Chimney component
function Chimney({
  index,
  color,
  label,
  presents,
  onChimneyClick,
  onPresentClick,
  selectedPresent,
  isValidDropTarget
}) {
  const ribbonClass = color === 'red' ? styles.ribbonRed
    : color === 'green' ? styles.ribbonGreen
    : color === 'blue' ? styles.ribbonBlue
    : styles.ribbonOrange

  return (
    <div className={styles.chimneyContainer}>
      <span className={styles.chimneyLabel}>{label}</span>
      <div
        className={`${styles.chimney} ${isValidDropTarget ? styles.validDrop : ''}`}
        onClick={() => onChimneyClick(index)}
        role="region"
        aria-label={`${label} schoorsteen met ${presents.length} cadeaus`}
      >
        <div className={`${styles.chimneyRibbon} ${ribbonClass}`} />
        {presents.map((present, idx) => (
          <Present
            key={present.id}
            present={present}
            isSelected={selectedPresent?.present.id === present.id}
            isTopPresent={idx === presents.length - 1}
            onClick={() => onPresentClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

function Puzzle9() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()

  const [chimneys, setChimneys] = useState(initializeChimneys)
  const [selectedPresent, setSelectedPresent] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [shake, setShake] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Check win condition
  const checkWinCondition = useCallback((currentChimneys) => {
    return CHIMNEY_COLORS.every((color, index) => {
      const stack = currentChimneys[index]
      return stack.length === 3 && stack.every(p => p.color === color)
    })
  }, [])

  // Win condition effect
  useEffect(() => {
    if (checkWinCondition(chimneys) && !isCompleted) {
      setIsCompleted(true)
      markPuzzleSolved(9, 'schoorsteen')
    }
  }, [chimneys, isCompleted, markPuzzleSolved, checkWinCondition])

  // Check if a move is valid
  const isValidMove = useCallback((fromIdx, toIdx) => {
    if (fromIdx === toIdx) return false
    const from = chimneys[fromIdx]
    const to = chimneys[toIdx]
    if (from.length === 0) return false
    if (to.length === 0) return true
    // Can only place smaller on larger
    return from[from.length - 1].size <= to[to.length - 1].size
  }, [chimneys])

  // Execute a move
  const executeMove = useCallback((fromIdx, toIdx) => {
    if (!isValidMove(fromIdx, toIdx)) {
      setErrorMessage('Dit cadeau is te groot! Je kunt alleen kleinere cadeaus op grotere stapelen.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return false
    }

    setChimneys(prev => {
      const newChimneys = prev.map(s => [...s])
      const present = newChimneys[fromIdx].pop()
      newChimneys[toIdx].push(present)
      return newChimneys
    })
    setMoveCount(p => p + 1)
    setErrorMessage('')
    return true
  }, [isValidMove])

  // Handle clicking on a present (to select it)
  const handlePresentClick = useCallback((chimneyIndex) => {
    if (isCompleted) return

    const stack = chimneys[chimneyIndex]
    if (stack.length === 0) return

    if (selectedPresent) {
      // If we already have a present selected
      if (chimneyIndex === selectedPresent.chimneyIndex) {
        // Clicked same chimney - deselect
        setSelectedPresent(null)
        setErrorMessage('')
      } else {
        // Try to move to this chimney
        if (executeMove(selectedPresent.chimneyIndex, chimneyIndex)) {
          setSelectedPresent(null)
        }
      }
    } else {
      // Select this present
      setSelectedPresent({
        chimneyIndex,
        present: stack[stack.length - 1]
      })
      setErrorMessage('')
    }
  }, [selectedPresent, chimneys, executeMove, isCompleted])

  // Handle clicking on a chimney (for placing on empty chimneys)
  const handleChimneyClick = useCallback((chimneyIndex) => {
    if (!selectedPresent || isCompleted) return

    // If clicking on the same chimney where present is from, deselect
    if (chimneyIndex === selectedPresent.chimneyIndex) {
      setSelectedPresent(null)
      setErrorMessage('')
      return
    }

    // Try to move
    if (executeMove(selectedPresent.chimneyIndex, chimneyIndex)) {
      setSelectedPresent(null)
    }
  }, [selectedPresent, executeMove, isCompleted])

  // Reset game
  const handleReset = () => {
    setChimneys(initializeChimneys())
    setSelectedPresent(null)
    setMoveCount(0)
    setErrorMessage('')
    setIsCompleted(false)
  }

  // Navigate to next puzzle
  const handleNext = () => {
    navigate('/puzzle-10')
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 9: De Vier Schoorstenen</h2>

      <p className={styles.instructions}>
        Sorteer de cadeautjes naar de juiste schoorsteen! Rode cadeaus naar de rode schoorsteen,
        groene naar de groene, oranje naar de oranje, en blauwe naar de blauwe.
        <br />
        <strong>Let op:</strong> je kunt alleen kleinere cadeaus op grotere cadeaus stapelen!
      </p>

      {selectedPresent && (
        <p className={styles.hintText}>
          Klik op een schoorsteen om het cadeau neer te zetten, of klik opnieuw om te deselecteren.
        </p>
      )}

      {!selectedPresent && !isCompleted && (
        <p className={styles.hintText}>
          Klik op het bovenste cadeau van een schoorsteen om het op te pakken.
        </p>
      )}

      <div className={`${styles.gameArea} ${shake ? styles.shake : ''}`}>
        {chimneys.map((presents, index) => (
          <Chimney
            key={index}
            index={index}
            color={CHIMNEY_COLORS[index]}
            label={CHIMNEY_LABELS[index]}
            presents={presents}
            onChimneyClick={handleChimneyClick}
            onPresentClick={handlePresentClick}
            selectedPresent={selectedPresent}
            isValidDropTarget={selectedPresent && isValidMove(selectedPresent.chimneyIndex, index)}
          />
        ))}
      </div>

      <div className={styles.stats}>
        <span>Zetten: {moveCount}</span>
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <div className={styles.controls}>
        <button className={styles.resetButton} onClick={handleReset}>
          Opnieuw Beginnen
        </button>
      </div>

      {isCompleted && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>🎁</span>
            <p className={styles.successTitle}>Fantastisch!</p>
            <p>Je hebt alle cadeaus gesorteerd in {moveCount} zetten!</p>
            <p>Sinterklaas kan nu gemakkelijk de juiste cadeaus door de juiste schoorsteen laten vallen.</p>
            <p className={styles.password}>Wachtwoord: schoorsteen</p>
            <button className={styles.nextButton} onClick={handleNext}>
              Naar de Finale!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Puzzle9
