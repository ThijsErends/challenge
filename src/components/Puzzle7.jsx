import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle7.module.css'

function Puzzle7() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [revealedClues, setRevealedClues] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [shake, setShake] = useState(false)

  const clues = [
    { id: 1, icon: '⛏️', label: 'Mijn', hint: 'Grafiet komt uit een mijn', revealed: false },
    { id: 2, icon: '🪵', label: 'Hout', hint: 'Het zit in een houten omhulsel', revealed: false },
    { id: 3, icon: '✏️', label: 'Schrijven', hint: 'Bijna iedereen gebruikt het', revealed: false },
    { id: 4, icon: '🔒', label: 'Opgesloten', hint: 'Het komt er nooit meer uit', revealed: false },
  ]

  const answerOptions = [
    { id: 'potlood', label: 'Potlood', icon: '✏️' },
    { id: 'kolen', label: 'Kolen', icon: '�ite' },
    { id: 'diamant', label: 'Diamant', icon: '💎' },
    { id: 'goud', label: 'Goud', icon: '🥇' },
  ]

  const handleClueClick = (clueId) => {
    if (!revealedClues.includes(clueId)) {
      setRevealedClues([...revealedClues, clueId])
    }
  }

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId)
    setErrorMessage('')
  }

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setErrorMessage('Selecteer eerst een antwoord!')
      return
    }

    if (selectedAnswer === 'potlood') {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(7, 'potlood')
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNext = () => {
    navigate('/puzzle-8')
  }

  const allCluesRevealed = revealedClues.length === clues.length

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 7: Het Mysterie van de Mijn</h2>
      
      <div className={styles.riddleBox}>
        <p className={styles.riddleText}>
          "Ik word uit een mijn gehaald en opgesloten in een houten kist, 
          waaruit ik nooit word vrijgelaten, en toch word ik door bijna iedereen gebruikt."
        </p>
        <p className={styles.riddleSubtext}>Wat ben ik?</p>
      </div>

      <div className={styles.clueSection}>
        <p className={styles.clueInstructions}>
          Klik op de aanwijzingen om ze te onthullen:
        </p>
        <div className={`${styles.clueGrid} ${shake ? styles.shake : ''}`}>
          {clues.map((clue) => {
            const isRevealed = revealedClues.includes(clue.id)
            return (
              <button
                key={clue.id}
                className={`${styles.clueCard} ${isRevealed ? styles.revealed : ''}`}
                onClick={() => handleClueClick(clue.id)}
                disabled={isRevealed}
              >
                <div className={styles.clueIcon}>
                  {isRevealed ? clue.icon : '❓'}
                </div>
                <div className={styles.clueContent}>
                  <span className={styles.clueLabel}>
                    {isRevealed ? clue.label : 'Aanwijzing'}
                  </span>
                  {isRevealed && (
                    <span className={styles.clueHint}>{clue.hint}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {allCluesRevealed && (
        <div className={styles.answerSection}>
          <p className={styles.answerInstructions}>
            Alle aanwijzingen onthuld! Wat is het antwoord?
          </p>
          <div className={styles.answerGrid}>
            {answerOptions.map((option) => (
              <button
                key={option.id}
                className={`${styles.answerCard} ${
                  selectedAnswer === option.id ? styles.selected : ''
                } ${isCompleted && option.id === 'potlood' ? styles.correct : ''}`}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isCompleted}
              >
                <span className={styles.answerIcon}>{option.icon}</span>
                <span className={styles.answerLabel}>{option.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.controls}>
            {!isCompleted ? (
              <button className={styles.submitButton} onClick={handleSubmit}>
                Controleer Antwoord
              </button>
            ) : (
              <button className={styles.nextButton} onClick={handleNext}>
                Volgende Puzzel
              </button>
            )}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {isCompleted && (
        <div className={styles.successMessage}>
          Correct! Een potlood wordt gemaakt van grafiet uit een mijn, 
          opgesloten in hout, en gebruikt door bijna iedereen!
        </div>
      )}
    </div>
  )
}

export default Puzzle7
