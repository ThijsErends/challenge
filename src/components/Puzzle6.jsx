import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle6.module.css'

// The hidden answer is buried in children[3].notes.admin_log.secret_code
// Answer: "pakjesboot"
const manifestData = {
  pepernoten_production_batch: "PK-2024-12-05",
  current_presents_delivered: 127,
  amerigo_stable_location: {
    city: "Madrid",
    stable_number: 7,
    coordinates: {
      lat: 40.4168,
      lon: -3.7038
    }
  },
  children: [
    {
      name: "Emma",
      nice_status: true,
      requested_gift: "een pop",
      delivery_address: {
        street: "Kerkstraat",
        house_number: 12,
        city: "Amsterdam",
        rooftop_access_code: "ROOF-001"
      },
      notes: {
        special_instructions: "Cadeau moet voor de schoorsteen worden gezet",
        behavior_notes: "Zeer braaf geweest dit jaar"
      }
    },
    {
      name: "Lucas",
      nice_status: true,
      requested_gift: "een trein",
      delivery_address: {
        street: "Molenweg",
        house_number: 45,
        city: "Rotterdam",
        rooftop_access_code: "ROOF-002"
      },
      notes: {
        special_instructions: "Groot cadeau, gebruik de grote schoorsteen",
        behavior_notes: "Altijd beleefd tegen volwassenen"
      }
    },
    {
      name: "Sophie",
      nice_status: false,
      requested_gift: "een gouden laars",
      delivery_address: {
        street: "Dijkstraat",
        house_number: 8,
        city: "Utrecht",
        rooftop_access_code: "ROOF-003"
      },
      notes: {
        special_instructions: "Alleen kolen dit jaar",
        behavior_notes: "Veel ruzie gemaakt met broertje"
      }
    },
    {
      name: "Noah",
      nice_status: true,
      requested_gift: "een fiets",
      delivery_address: {
        street: "Veldweg",
        house_number: 23,
        city: "Den Haag",
        rooftop_access_code: "ROOF-004"
      },
      notes: {
        special_instructions: "Fiets is te groot voor schoorsteen, gebruik de voordeur",
        behavior_notes: "Zeer behulpzaam geweest",
        admin_log: {
          entry_date: "2024-12-04",
          log_notes: "Speciale levering vereist",
          secret_code: "pakjesboot"
        }
      }
    },
    {
      name: "Eva",
      nice_status: true,
      requested_gift: "een boek",
      delivery_address: {
        street: "Boslaan",
        house_number: 67,
        city: "Eindhoven",
        rooftop_access_code: "ROOF-005"
      },
      notes: {
        special_instructions: "Boek moet in het Nederlands zijn",
        behavior_notes: "Veel gelezen dit jaar, zeer leergierig"
      }
    },
    {
      name: "Daan",
      nice_status: true,
      requested_gift: "een voetbal",
      delivery_address: {
        street: "Sportweg",
        house_number: 34,
        city: "Groningen",
        rooftop_access_code: "ROOF-006"
      },
      notes: {
        special_instructions: "Voetbal is al klaar voor levering",
        behavior_notes: "Altijd buiten aan het spelen"
      }
    }
  ]
}

// Recursive component to render JSON nodes
function JsonNode({ data, path = '', level = 0, expandedPaths, togglePath }) {
  const currentPath = path
  const isExpanded = expandedPaths.has(currentPath)
  
  if (data === null || data === undefined) {
    return (
      <div className={styles.jsonValue} style={{ paddingLeft: `${level * 20}px` }}>
        <span className={styles.jsonNull}>null</span>
      </div>
    )
  }
  
  if (typeof data === 'boolean') {
    return (
      <div className={styles.jsonValue} style={{ paddingLeft: `${level * 20}px` }}>
        <span className={styles.jsonBoolean}>{data.toString()}</span>
      </div>
    )
  }
  
  if (typeof data === 'number') {
    return (
      <div className={styles.jsonValue} style={{ paddingLeft: `${level * 20}px` }}>
        <span className={styles.jsonNumber}>{data}</span>
      </div>
    )
  }
  
  if (typeof data === 'string') {
    return (
      <div className={styles.jsonValue} style={{ paddingLeft: `${level * 20}px` }}>
        <span className={styles.jsonString}>"{data}"</span>
      </div>
    )
  }
  
  if (Array.isArray(data)) {
    return (
      <div className={styles.jsonNode}>
        <div 
          className={styles.jsonKeyRow}
          onClick={() => togglePath(currentPath)}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <span className={styles.expandButton}>{isExpanded ? '−' : '+'}</span>
          <span className={styles.jsonBracket}>[</span>
          <span className={styles.jsonArrayLength}>{data.length} items</span>
          <span className={styles.jsonBracket}>]</span>
        </div>
        {isExpanded && (
          <div className={styles.jsonChildren}>
            {data.map((item, index) => (
              <JsonNode
                key={index}
                data={item}
                path={`${currentPath}[${index}]`}
                level={level + 1}
                expandedPaths={expandedPaths}
                togglePath={togglePath}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
  
  if (typeof data === 'object') {
    const keys = Object.keys(data)
    return (
      <div className={styles.jsonNode}>
        <div 
          className={styles.jsonKeyRow}
          onClick={() => togglePath(currentPath)}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <span className={styles.expandButton}>{isExpanded ? '−' : '+'}</span>
          <span className={styles.jsonBrace}>{'{'}</span>
          <span className={styles.jsonObjectLength}>{keys.length} properties</span>
          <span className={styles.jsonBrace}>{'}'}</span>
        </div>
        {isExpanded && (
          <div className={styles.jsonChildren}>
            {keys.map((key) => (
              <div key={key} className={styles.jsonProperty}>
                <div className={styles.jsonKey} style={{ paddingLeft: `${(level + 1) * 20}px` }}>
                  <span className={styles.jsonKeyName}>"{key}"</span>
                  <span className={styles.jsonColon}>:</span>
                </div>
                <JsonNode
                  data={data[key]}
                  path={currentPath ? `${currentPath}.${key}` : key}
                  level={level + 1}
                  expandedPaths={expandedPaths}
                  togglePath={togglePath}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  return null
}

function Puzzle6() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [expandedPaths, setExpandedPaths] = useState(new Set(['']))
  const [answer, setAnswer] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  
  const correctAnswer = 'pakjesboot'
  
  const togglePath = (path) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedPaths(newExpanded)
  }
  
  const handleSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase()
    if (trimmedAnswer === correctAnswer) {
      setIsCompleted(true)
      setErrorMessage('')
      markPuzzleSolved(6, correctAnswer)
      // Navigate after a brief delay to show success
      setTimeout(() => {
        navigate('/puzzle-7')
      }, 1500)
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  
  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 6: Het Grote Cadeau Manifest</h2>
      
      <div className={styles.hintContainer}>
        <p className={styles.hintText}>
          "Het manifest bevat vele geheimen, maar alleen de meest oplettende zullen de speciale vermelding vinden."
        </p>
        <p className={styles.clueText}>
          Zoek naar de geheime code in de admin log van het kind dat een fiets heeft gevraagd.
        </p>
      </div>
      
      <div className={styles.jsonContainer}>
        <div className={styles.jsonHeader}>
          <span className={styles.jsonTitle}>Sinterklaas Pakjesavond Manifest 2024</span>
        </div>
        <div className={styles.jsonContent}>
          <JsonNode
            data={manifestData}
            path=""
            level={0}
            expandedPaths={expandedPaths}
            togglePath={togglePath}
          />
        </div>
      </div>
      
      <div className={styles.inputSection}>
        <p className={styles.instructionText}>
          Wat is de geheime code die je hebt gevonden?
        </p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Voer de code in..."
            disabled={isCompleted}
            className={styles.answerInput}
          />
          <button 
            onClick={handleSubmit}
            disabled={isCompleted}
            className={styles.submitButton}
          >
            {isCompleted ? 'Correct!' : 'Indienen'}
          </button>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {isCompleted && (
          <div className={styles.successMessage}>
            Perfect! Je hebt de geheime code gevonden! 🎉
          </div>
        )}
      </div>
    </div>
  )
}

export default Puzzle6
