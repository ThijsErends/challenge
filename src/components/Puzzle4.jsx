import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle4.module.css'

function Puzzle4() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [answer, setAnswer] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  // The expected answer derived from executing the algorithm
  const correctAnswer = 'dak'

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase()
    if (trimmedAnswer === correctAnswer) {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(4, correctAnswer)
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
    }
  }

  const handleNext = () => {
    navigate('/puzzle-5')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 4: Amerigo's Algoritme voor Aankomst</h2>
      
      <div className={styles.algorithmContainer}>
        <div className={styles.algorithmCode}>
          <pre className={styles.codeBlock}>
{`FUNCTION AmerigoJourney() {
  // Op Pakjesavond, wanneer de nacht valt
  LET rooftop_count = 0
  LET pepernoten_eaten_by_Amerigo = 3
  LET rooftops_visited = []
  LET final_destination = ""
  LET base_word = "pakjesavond"
  
  // Amerigo begint zijn tocht
  FOR EACH dak IN [eerste, tweede, derde, vierde] {
    rooftop_count = rooftop_count + 1
    
    IF dak == "eerste" THEN
      rooftops_visited.push("hoog")
    ELSE IF dak == "tweede" THEN
      rooftops_visited.push("laag")
    ELSE IF dak == "derde" THEN
      rooftops_visited.push("hoog")
    ELSE
      rooftops_visited.push("laag")
    END IF
    
    // Voor elk dak eet Amerigo een pepernoot
    pepernoten_eaten_by_Amerigo = pepernoten_eaten_by_Amerigo - 1
  }
  
  // De hoefslag vertelt het verhaal van zijn pad
  IF rooftop_count == 4 THEN
    LET path_sound = rooftops_visited.join("")
    // path_sound = "hooglaaghooglaag"
    
    // Vind alle posities waar de letter 'a' voorkomt in het pad
    LET a_positions = []
    FOR i FROM 0 TO path_sound.length - 1 {
      IF path_sound[i] == "a" THEN
        a_positions.push(i)
      END IF
    }
    // path_sound = "hooglaaghooglaag"
    // Posities: 0=h, 1=o, 2=o, 3=g, 4=l, 5=a, 6=a, 7=g, 8=h, 9=o, 10=o, 11=g, 12=l, 13=a, 14=a, 15=g
    // a_positions = [5, 6, 13, 14]
    
    // Elke hoefslag heeft 4 letters ("hoog" of "laag")
    // Het antwoord heeft 3 letters
    // Gebruik de posities van 'a' om letters te extraheren
    
    // Eerste letter: laatste 'a' positie minus 4
    LET idx_1 = a_positions[3] - 4
    // idx_1 = 14 - 4 = 10
    LET letter_1 = base_word[idx_1]
    // letter_1 = base_word[10] = "d"
    
    // Tweede letter: eerste 'a' positie minus 4
    LET idx_2 = a_positions[0] - 4
    // idx_2 = 5 - 4 = 1
    LET letter_2 = base_word[idx_2]
    // letter_2 = base_word[1] = "a"
    
    // Derde letter: tweede 'a' positie minus 4
    LET idx_3 = a_positions[1] - 4
    // idx_3 = 6 - 4 = 2
    LET letter_3 = base_word[idx_3]
    // letter_3 = base_word[2] = "k"
    
    // Combineer de letters tot het antwoord
    final_destination = letter_1 + letter_2 + letter_3
    // final_destination = "d" + "a" + "k" = "dak"
  END IF
  
  RETURN final_destination
}`}
          </pre>
        </div>
      </div>

      <div className={styles.instructionContainer}>
        <p className={styles.instruction}>
          Voer het algoritme stap voor stap uit. Bereken de waarde van <code>final_destination</code> door alle berekeningen te volgen.
        </p>
        <p className={styles.hint}>
          💡 Hint: "Luister naar Amerigo's hoeven, ze vertellen het verhaal van zijn pad." Tel waar de letter 'a' voorkomt in het pad.
        </p>
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Voer je antwoord in..."
          disabled={isCompleted}
          className={styles.answerInput}
        />
        {!isCompleted ? (
          <button onClick={handleSubmit} className={styles.submitButton}>
            Controleer Antwoord
          </button>
        ) : (
          <div className={styles.successContainer}>
            <p className={styles.successMessage}>
              Perfect! Het algoritme is correct uitgevoerd! 🎉
            </p>
            <button onClick={handleNext} className={styles.nextButton}>
              Volgende Puzzel
            </button>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  )
}

export default Puzzle4
