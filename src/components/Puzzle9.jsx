import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle9.module.css'

function Puzzle9() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [selectedPart, setSelectedPart] = useState(null)
  const [revealedHints, setRevealedHints] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [shake, setShake] = useState(false)

  const bodyParts = [
    { id: 'hoofd', label: 'Hoofd', emoji: '🗣️', description: 'Zit bovenop' },
    { id: 'arm', label: 'Arm', emoji: '💪', description: 'Aan de zijkant' },
    { id: 'been', label: 'Been', emoji: '🦵', description: 'Heeft voet onderaan' },
    { id: 'voet', label: 'Voet', emoji: '🦶', description: 'Onderste deel' },
    { id: 'hand', label: 'Hand', emoji: '✋', description: 'Aan het einde van de arm' },
    { id: 'rug', label: 'Rug', emoji: '🔙', description: 'Achterste deel' },
  ]

  const hints = [
    { id: 1, text: 'Het lichaamsdeel dat je zoekt heeft twee delen...', icon: '🔍' },
    { id: 2, text: 'Een deel ervan heet "onder" en een deel "boven"...', icon: '⬆️' },
    { id: 3, text: 'Denk aan hoe je dit lichaamsdeel noemt: onder-??? en boven-???', icon: '💡' },
  ]

  const handlePartSelect = (partId) => {
    setSelectedPart(partId)
    setErrorMessage('')
  }

  const handleHintReveal = (hintId) => {
    if (!revealedHints.includes(hintId)) {
      setRevealedHints([...revealedHints, hintId])
    }
  }

  const handleSubmit = () => {
    if (!selectedPart) {
      setErrorMessage('Selecteer eerst een lichaamsdeel!')
      return
    }

    if (selectedPart === 'been') {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(9, 'een been')
    } else {
      setErrorMessage('Onjuist. Denk goed na over het raadsel!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNext = () => {
    navigate('/puzzle-10')
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 9: Boven en Onder</h2>
      
      <div className={styles.riddleBox}>
        <p className={styles.riddleText}>
          "Wat heeft een onderkant aan de bovenkant?"
        </p>
        <p className={styles.riddleHint}>
          (Tip: Denk aan je eigen lichaam...)
        </p>
      </div>

      <div className={styles.hintsSection}>
        <p className={styles.hintsTitle}>Aanwijzingen:</p>
        <div className={styles.hintsGrid}>
          {hints.map((hint) => {
            const isRevealed = revealedHints.includes(hint.id)
            return (
              <button
                key={hint.id}
                className={`${styles.hintCard} ${isRevealed ? styles.revealed : ''}`}
                onClick={() => handleHintReveal(hint.id)}
                disabled={isRevealed || isCompleted}
              >
                <span className={styles.hintIcon}>{isRevealed ? hint.icon : '❓'}</span>
                <span className={styles.hintText}>
                  {isRevealed ? hint.text : `Aanwijzing ${hint.id}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.selectionSection}>
        <p className={styles.selectionTitle}>Selecteer het juiste lichaamsdeel:</p>
        <div className={`${styles.bodyPartsGrid} ${shake ? styles.shake : ''}`}>
          {bodyParts.map((part) => (
            <button
              key={part.id}
              className={`${styles.bodyPartCard} ${
                selectedPart === part.id ? styles.selected : ''
              } ${isCompleted && part.id === 'been' ? styles.correct : ''}`}
              onClick={() => handlePartSelect(part.id)}
              disabled={isCompleted}
            >
              <span className={styles.partEmoji}>{part.emoji}</span>
              <span className={styles.partLabel}>{part.label}</span>
              <span className={styles.partDescription}>{part.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        {!isCompleted ? (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Controleer Antwoord
          </button>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            Naar de Finale!
          </button>
        )}
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {isCompleted && (
        <div className={styles.successMessage}>
          <p className={styles.successTitle}>Correct! 🎉</p>
          <p className={styles.successExplanation}>
            Een <strong>been</strong> heeft een <strong>onderbeen</strong> aan de bovenkant 
            (dicht bij de knie) en een <strong>onderbeen</strong> dat naar beneden gaat. 
            Maar ook: de <strong>onderkant</strong> van je been (de voet) zit aan de 
            <strong> bovenkant</strong> van de grond!
          </p>
        </div>
      )}

      {/* Visual diagram of a leg */}
      {isCompleted && (
        <div className={styles.diagram}>
          <div className={styles.legDiagram}>
            <div className={styles.legPart + ' ' + styles.bovenbeen}>
              <span>Bovenbeen</span>
            </div>
            <div className={styles.knee}>🦵</div>
            <div className={styles.legPart + ' ' + styles.onderbeen}>
              <span>Onderbeen</span>
              <span className={styles.diagramNote}>(aan de bovenkant!)</span>
            </div>
            <div className={styles.foot}>🦶</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Puzzle9
