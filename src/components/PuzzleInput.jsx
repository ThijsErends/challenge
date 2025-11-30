import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './PuzzleInput.module.css'

function PuzzleInput({ puzzleNumber, question, correctAnswer, nextPuzzle }) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase()
    if (trimmedAnswer === correctAnswer) {
      markPuzzleSolved(puzzleNumber, correctAnswer)
      if (nextPuzzle) {
        navigate(`/puzzle-${nextPuzzle}`)
      }
    } else {
      setResult('Onjuist. Probeer opnieuw.')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2>Puzzel {puzzleNumber}</h2>
      <p>{question}</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Indienen</button>
      </div>
      <div className={styles.result} style={{ color: result ? 'var(--poofball-red)' : 'transparent' }}>
        {result}
      </div>
    </div>
  )
}

export default PuzzleInput

