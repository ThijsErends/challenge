import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle8.module.css'

// Grid data - 8x8
const GRID = [
  ['D', 'P', 'P', 'I', 'E', 'T', 'E', 'N'],
  ['A', 'W', 'I', 'S', 'A', 'S', 'M', 'K'],
  ['K', 'O', 'N', 'C', 'J', 'T', 'I', 'P'],
  ['E', 'R', 'T', 'H', 'E', 'A', 'J', 'A'],
  ['N', 'T', 'O', 'O', 'S', 'F', 'T', 'A'],
  ['D', 'E', 'C', 'E', 'M', 'B', 'E', 'R'],
  ['A', 'L', 'H', 'N', 'V', 'O', 'R', 'D'],
  ['L', 'E', 'T', 'T', 'E', 'R', 'N', 'D'],
]

// Word definitions with their cell positions
// Note: Some words share cells (overlap), so cells can be selected multiple times
const WORDS = [
  { word: 'DAKEN', cells: [[0,0],[1,0],[2,0],[3,0],[4,0]], visible: false, hint: 'D...N' },
  { word: 'DECEMBER', cells: [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7]], visible: false, hint: 'DEC...ER' },
  { word: 'INTOCHT', cells: [[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]], visible: false, hint: '...CHT' },
  { word: 'LETTER', cells: [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5]], visible: false, hint: 'L...ER' },
  { word: 'MIJTER', cells: [[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]], visible: false, hint: 'M..TER' },
  { word: 'PAARD', cells: [[2,7],[3,7],[4,7],[5,7],[6,7]], visible: true },
  { word: 'PIETEN', cells: [[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]], visible: false, hint: 'P...EN' },
  { word: 'SCHOEN', cells: [[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]], visible: false, hint: '...OEN' },
  { word: 'STAF', cells: [[1,5],[2,5],[3,5],[4,5]], visible: false, hint: 'S..F' },
  { word: 'WORTEL', cells: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]], visible: false, hint: 'W...EL' },
]

// The answer is PAKJESAVOND
const CORRECT_ANSWER = 'pakjesavond'

// Helper to convert cell to string key
const cellKey = (row, col) => `${row},${col}`

// Get all cells used by words
const getAllWordCells = () => {
  const cells = new Set()
  WORDS.forEach(w => {
    w.cells.forEach(([r, c]) => cells.add(cellKey(r, c)))
  })
  return cells
}

// Get leftover cells (spell PAKJESAVOND)
const getLeftoverCells = () => {
  const wordCells = getAllWordCells()
  const leftover = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (!wordCells.has(cellKey(r, c))) {
        leftover.push([r, c])
      }
    }
  }
  return leftover
}

function Puzzle8() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()

  const [selectedCells, setSelectedCells] = useState([])
  const [foundWords, setFoundWords] = useState([])
  const [usedCells, setUsedCells] = useState(new Set())
  const [moveCount, setMoveCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answerInput, setAnswerInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const leftoverCells = getLeftoverCells()

  // Check if all words are found
  useEffect(() => {
    if (foundWords.length === WORDS.length && !isCompleted) {
      setShowAnswer(true)
    }
  }, [foundWords, isCompleted])

  // Check if selected cells match any unfound word
  const checkForWord = (cells) => {
    const cellSet = new Set(cells.map(([r, c]) => cellKey(r, c)))

    for (const wordDef of WORDS) {
      if (foundWords.includes(wordDef.word)) continue

      const wordCellSet = new Set(wordDef.cells.map(([r, c]) => cellKey(r, c)))

      // Check if selection matches word exactly
      if (cellSet.size === wordCellSet.size) {
        let match = true
        for (const key of cellSet) {
          if (!wordCellSet.has(key)) {
            match = false
            break
          }
        }
        if (match) {
          return wordDef
        }
      }
    }
    return null
  }

  // Check if cells form a valid line (horizontal, vertical, or diagonal)
  const isValidLine = (cells) => {
    if (cells.length < 2) return true

    const [r1, c1] = cells[0]
    const [r2, c2] = cells[1]
    const dr = r2 - r1
    const dc = c2 - c1

    // Must be adjacent and in a valid direction
    if (Math.abs(dr) > 1 || Math.abs(dc) > 1) return false
    if (dr === 0 && dc === 0) return false

    // Check all subsequent cells follow the same direction
    for (let i = 2; i < cells.length; i++) {
      const [pr, pc] = cells[i - 1]
      const [cr, cc] = cells[i]
      if (cr - pr !== dr || cc - pc !== dc) return false
    }

    return true
  }

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (isCompleted) return
    // Allow clicking on used cells (for overlapping words)

    setMoveCount(prev => prev + 1)
    setErrorMessage('')

    const newSelection = [...selectedCells, [row, col]]

    // Check if this cell continues the current line
    if (selectedCells.length > 0) {
      if (!isValidLine(newSelection)) {
        // Start new selection with this cell
        setSelectedCells([[row, col]])
        return
      }
    }

    setSelectedCells(newSelection)

    // Check if selection forms a word
    const foundWord = checkForWord(newSelection)
    if (foundWord) {
      // Word found!
      setFoundWords(prev => [...prev, foundWord.word])
      setUsedCells(prev => {
        const newSet = new Set(prev)
        foundWord.cells.forEach(([r, c]) => newSet.add(cellKey(r, c)))
        return newSet
      })
      setSelectedCells([])
    }
  }

  // Clear current selection
  const handleClearSelection = () => {
    setSelectedCells([])
  }

  // Reset entire puzzle
  const handleReset = () => {
    setSelectedCells([])
    setFoundWords([])
    setUsedCells(new Set())
    setMoveCount(0)
    setShowAnswer(false)
    setAnswerInput('')
    setErrorMessage('')
  }

  // Handle answer submission
  const handleAnswerSubmit = () => {
    const trimmed = answerInput.trim().toLowerCase()
    if (trimmed === CORRECT_ANSWER) {
      setIsCompleted(true)
      markPuzzleSolved(8, CORRECT_ANSWER)
    } else {
      setErrorMessage('Dat is niet het juiste antwoord. Probeer opnieuw!')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit()
    }
  }

  const handleNext = () => {
    navigate('/puzzle-9')
  }

  // Get cell state for styling
  // Priority: selected > answer > used > default
  const getCellState = (row, col) => {
    const key = cellKey(row, col)
    const isSelected = selectedCells.some(([r, c]) => r === row && c === col)
    if (isSelected) return 'selected'
    if (showAnswer && leftoverCells.some(([r, c]) => r === row && c === col)) return 'answer'
    if (usedCells.has(key)) return 'used'
    return 'default'
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 8: Piet's Woordzoeker</h2>

      <div className={styles.instructions}>
        <p>Sinterklaas zoekt naar woorden voor zijn gedichten. Vind alle woorden in het rooster. De overgebleven letters vormen het antwoord!</p>
        <p className={styles.moveCounter}>Aantal klikken: <strong>{moveCount}</strong></p>
      </div>

      <div className={styles.gameArea}>
        {/* Word Grid */}
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {GRID.map((row, rowIndex) => (
              row.map((letter, colIndex) => {
                const state = getCellState(rowIndex, colIndex)
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`${styles.cell} ${styles[state]}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={isCompleted}
                    aria-label={`Letter ${letter} op rij ${rowIndex + 1}, kolom ${colIndex + 1}`}
                  >
                    {letter}
                  </button>
                )
              })
            ))}
          </div>

          <div className={styles.gridButtons}>
            {selectedCells.length > 0 && (
              <button className={styles.clearButton} onClick={handleClearSelection}>
                Selectie wissen
              </button>
            )}
            {!isCompleted && (
              <button className={styles.resetButton} onClick={handleReset}>
                Opnieuw beginnen
              </button>
            )}
          </div>
        </div>

        {/* Word List - Torn Paper Style */}
        <div className={styles.wordListContainer}>
          <div className={styles.tornPaper}>
            <h3 className={styles.wordListTitle}>Woorden</h3>
            <p className={styles.wordListSubtitle}>Streep de woorden af</p>
            <ul className={styles.wordList}>
              {WORDS.map((wordDef) => {
                const isFound = foundWords.includes(wordDef.word)
                return (
                  <li
                    key={wordDef.word}
                    className={`${styles.wordItem} ${isFound ? styles.found : ''} ${!wordDef.visible ? styles.hidden : ''}`}
                  >
                    {wordDef.visible ? wordDef.word : wordDef.hint}
                  </li>
                )
              })}
            </ul>
            <p className={styles.foundCount}>{foundWords.length} / {WORDS.length} gevonden</p>
          </div>
        </div>
      </div>


      {/* Answer Input - always visible until completed */}
      {!isCompleted && (
        <div className={styles.answerSection}>
          <div className={styles.answerInput}>
            <p>Weet je het antwoord? Vul het hier in:</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Typ het antwoord..."
                className={styles.textInput}
              />
              <button className={styles.submitButton} onClick={handleAnswerSubmit}>
                Controleer
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      )}

      {/* Success Message */}
      {isCompleted && (
        <div className={styles.successMessage}>
          <p className={styles.successTitle}>Gefeliciteerd!</p>
          <p className={styles.successText}>
            Je hebt alle woorden gevonden en het geheime woord ontdekt: <strong>PAKJESAVOND</strong>!
          </p>
          <button className={styles.nextButton} onClick={handleNext}>
            Volgende Puzzel
          </button>
        </div>
      )}
    </div>
  )
}

export default Puzzle8
