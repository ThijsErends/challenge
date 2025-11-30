import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Puzzle4.module.css'

function Puzzle4() {
  const navigate = useNavigate()
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
  
  // De hoefslag vertelt het verhaal
  IF rooftop_count == 4 THEN
    LET path_sound = rooftops_visited.join("")
    // path_sound = "hooglaaghooglaag"
    
    // Tel de letters in het geluid
    LET letter_count = path_sound.length
    // letter_count = 16
    
    // Deel door het aantal daken
    LET magic_number = letter_count / rooftop_count
    // magic_number = 4
    
    // Het antwoord is het woord met 4 letters
    // dat Amerigo het meest hoort tijdens zijn reis
    final_destination = "dak"
  END IF
  
  RETURN final_destination
}`}
          </pre>
        </div>
      </div>

      <div className={styles.instructionContainer}>
        <p className={styles.instruction}>
          Volg het algoritme stap voor stap. Wat is de waarde die <code>final_destination</code> krijgt?
        </p>
        <p className={styles.hint}>
          💡 Hint: "Luister naar Amerigo's hoeven, ze vertellen het verhaal van zijn pad."
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
