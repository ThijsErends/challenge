import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle4.module.css'

function Puzzle4() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [answer, setAnswer] = useState('')
  const [offsetInput, setOffsetInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [consoleLines, setConsoleLines] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const consoleRef = useRef(null)

  // The expected answer derived from executing the algorithm
  const correctAnswer = 'dak'
  const correctOffset = 6

  // Generate console output based on the offset input
  const getConsoleOutput = () => {
    const offsetNum = parseInt(offsetInput, 10)
    
    if (offsetInput === '' || isNaN(offsetNum)) {
      return [
        { text: '> DecodeerBericht() wordt uitgevoerd...', type: 'info' },
        { text: '>', type: 'empty' },
        { text: '> bericht = "pakjesavond" (11 tekens)', type: 'var' },
        { text: '> Index: p=0, a=1, k=2, j=3, e=4, s=5, a=6, v=7, o=8, n=9, d=10', type: 'index' },
        { text: '> sleutel = [4, 6, 7]', type: 'var' },
        { text: '>', type: 'empty' },
        { text: '> Bezig met uitvoeren...', type: 'info' },
        { text: '>', type: 'empty' },
        { text: '> ❌ FOUT op regel 4: offset is niet gedefinieerd!', type: 'error' },
        { text: '>', type: 'empty' },
        { text: '> 💡 HINT: "Amerigo telt zijn hoefstappen op het dak:', type: 'hint' },
        { text: '>          klip-klop, klip-klop, klip-klop"', type: 'hint' },
      ]
    }

    // Calculate the result with the given offset
    const bericht = "pakjesavond"
    const sleutel = [4, 6, 7]
    let resultaat = ""
    
    for (const pos of sleutel) {
      const nieuwe_pos = (pos + offsetNum) % 11
      resultaat += bericht[nieuwe_pos]
    }

    return [
      { text: '> DecodeerBericht() wordt uitgevoerd...', type: 'info' },
      { text: '>', type: 'empty' },
      { text: '> bericht = "pakjesavond" (11 tekens)', type: 'var' },
      { text: '> Index: p=0, a=1, k=2, j=3, e=4, s=5, a=6, v=7, o=8, n=9, d=10', type: 'index' },
      { text: '> sleutel = [4, 6, 7]', type: 'var' },
      { text: `> offset = ${offsetNum}`, type: 'var' },
      { text: '>', type: 'empty' },
      { text: '> Bezig met uitvoeren...', type: 'info' },
      { text: '>', type: 'empty' },
      { text: `> Loop: pos=4 → nieuwe_pos=(4+${offsetNum})%11=${(4 + offsetNum) % 11} → "${bericht[(4 + offsetNum) % 11]}"`, type: 'var' },
      { text: `> Loop: pos=6 → nieuwe_pos=(6+${offsetNum})%11=${(6 + offsetNum) % 11} → "${bericht[(6 + offsetNum) % 11]}"`, type: 'var' },
      { text: `> Loop: pos=7 → nieuwe_pos=(7+${offsetNum})%11=${(7 + offsetNum) % 11} → "${bericht[(7 + offsetNum) % 11]}"`, type: 'var' },
      { text: '>', type: 'empty' },
      { text: `> ✅ RETURN "${resultaat}"`, type: 'success' },
    ]
  }

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

  const runSimulation = () => {
    if (isRunning) return
    
    setIsRunning(true)
    setConsoleLines([])
    setHasRun(true)
    
    const consoleOutput = getConsoleOutput()
    
    // Progressively add lines with typing effect
    consoleOutput.forEach((line, index) => {
      setTimeout(() => {
        setConsoleLines(prev => [...prev, line])
        
        // Scroll to bottom of console
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current.scrollHeight
        }
        
        // Mark as done after last line
        if (index === consoleOutput.length - 1) {
          setIsRunning(false)
        }
      }, index * 250) // 250ms delay between each line
    })
  }

  // Auto-scroll console when new lines are added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [consoleLines])

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 4: Amerigo's Algoritme</h2>
      
      <p className={styles.intro}>
        Amerigo heeft een geheim bericht achtergelaten in code. 
        Kun jij het algoritme uitvoeren en ontdekken wat het bericht is?
      </p>
      
      <div className={styles.codeEditorContainer}>
        <div className={styles.editorHeader}>
          <span className={styles.editorDot} style={{ backgroundColor: '#ff5f56' }}></span>
          <span className={styles.editorDot} style={{ backgroundColor: '#ffbd2e' }}></span>
          <span className={styles.editorDot} style={{ backgroundColor: '#27ca40' }}></span>
          <span className={styles.editorTitle}>amerigo_code.txt</span>
        </div>
        <div className={styles.algorithmCode}>
          <pre className={styles.codeBlock}>
            <code>
<span className={styles.keyword}>FUNCTION</span> <span className={styles.funcName}>DecodeerBericht</span>() {'{'}{'\n'}
{'  '}<span className={styles.keyword}>LET</span> bericht = <span className={styles.string}>"pakjesavond"</span>{'\n'}
{'  '}<span className={styles.keyword}>LET</span> sleutel = <span className={styles.array}>[4, 6, 7]</span>{'\n'}
{'  '}<span className={styles.keyword}>LET</span> offset = <input type="text" value={offsetInput} onChange={(e) => setOffsetInput(e.target.value)} className={styles.offsetInput} placeholder="?" maxLength={2} />{'\n'}
{'  '}<span className={styles.keyword}>LET</span> resultaat = <span className={styles.string}>""</span>{'\n'}
{'\n'}
{'  '}<span className={styles.keyword}>FOR EACH</span> pos <span className={styles.keyword}>IN</span> sleutel {'{'}{'\n'}
{'    '}<span className={styles.keyword}>LET</span> nieuwe_pos = (pos + offset) <span className={styles.keyword}>MOD</span> <span className={styles.number}>11</span>{'\n'}
{'    '}resultaat = resultaat + bericht[nieuwe_pos]{'\n'}
{'  '}{'}'}{'\n'}
{'\n'}
{'  '}<span className={styles.keyword}>RETURN</span> resultaat{'\n'}
{'}'}
            </code>
          </pre>
        </div>
      </div>

      <button 
        onClick={runSimulation} 
        className={`${styles.runButton} ${isRunning ? styles.running : ''}`}
        disabled={isRunning}
      >
        {isRunning ? '⏳ Bezig...' : '▶ Run Code'}
      </button>

      <div className={styles.consoleContainer}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleIcon}>⬛</span>
          <span className={styles.consoleTitle}>Console Output</span>
        </div>
        <div className={styles.consoleOutput} ref={consoleRef}>
          {consoleLines.length === 0 && !isRunning && (
            <span className={styles.consolePlaceholder}>
              Klik op "Run Code" om het algoritme uit te voeren...
            </span>
          )}
          {consoleLines.map((line, index) => (
            <div 
              key={index} 
              className={`${styles.consoleLine} ${styles[line.type]}`}
            >
              {line.text}
            </div>
          ))}
          {isRunning && (
            <span className={styles.cursor}>▋</span>
          )}
        </div>
      </div>

      {hasRun && !isRunning && (
        <div className={styles.instructionContainer}>
          <p className={styles.instruction}>
            Wat is het resultaat van <code>DecodeerBericht()</code>?
          </p>
        </div>
      )}

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Voer het resultaat in..."
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
