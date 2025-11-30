import { useState } from 'react'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle10.module.css'

function Puzzle10() {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { markPuzzleSolved } = usePuzzleProgress()

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase()
    if (trimmedAnswer === 'een fles') {
      setShowSuccess(true)
      setResult('')
      markPuzzleSolved(10, '1006')
    } else {
      setResult('Onjuist. Probeer opnieuw.')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (showSuccess) {
    return (
      <div className={styles.successContainer}>
        <h2>Gefeliciteerd!</h2>
        <p>Je hebt alle puzzels opgelost. De 4-cijferige code is 1006.</p>
      </div>
    )
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2>Puzzel 10</h2>
      <p>
        Ik heb een nek, maar geen hoofd. Ik heb een lichaam, maar geen benen. Ik heb een etiket, maar geen naam. Ik ben gevuld met een geest, maar ik leef niet. Wat ben ik?<br /><br />
        De 4-cijferige code wordt als volgt samengesteld:<br />
        - Het eerste cijfer is het nummer van de eerste puzzel.<br />
        - Het tweede cijfer is het laatste cijfer van het nummer van de laatste puzzel.<br />
        - Het derde cijfer is het totaal aantal puzzels, maar neem het laatste cijfer.<br />
        - Het vierde cijfer is het aantal letters in het antwoord op dit raadsel.
      </p>
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

export default Puzzle10

