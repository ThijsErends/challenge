import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Puzzle2.module.css'

function Puzzle2() {
  const navigate = useNavigate()
  const [selectedSequence, setSelectedSequence] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [shake, setShake] = useState(false)

  // Definieer de juiste volgorde (4 kleuren)
  const correctSequence = ['red', 'green', 'teal', 'orange']

  // Definieer Roetveegpieten met hun posities, kleuren en kostuumkleuren
  const pieten = [
    { id: 1, color: 'red', position: { top: '25%', left: '8%' }, roof: 1, costumeColor: 'var(--poofball-red)' },
    { id: 2, color: 'green', position: { top: '20%', left: '35%' }, roof: 2, costumeColor: 'var(--ushanka-green)' },
    { id: 3, color: 'teal', position: { top: '18%', left: '62%' }, roof: 3, costumeColor: 'var(--teal-toque)' },
    { id: 4, color: 'orange', position: { top: '22%', left: '85%' }, roof: 4, costumeColor: 'var(--parka-orange)' },
    { id: 5, color: 'purple', position: { top: '45%', left: '20%' }, roof: 5, costumeColor: '#9B59B6' },
    { id: 6, color: 'yellow', position: { top: '42%', left: '75%' }, roof: 6, costumeColor: '#F1C40F' },
    { id: 7, color: 'blue', position: { top: '65%', left: '50%' }, roof: 7, costumeColor: '#3498DB' },
  ]

  const addColorToSequence = (color) => {
    if (selectedSequence.length >= correctSequence.length) {
      return // Voeg niet meer toe dan nodig
    }
    
    setSelectedSequence([...selectedSequence, color])
    setErrorMessage('')
    setSuccessMessage('')
  }

  const clearSelection = () => {
    setSelectedSequence([])
    setErrorMessage('')
    setSuccessMessage('')
    setShake(false)
  }

  const checkAnswer = () => {
    if (selectedSequence.length !== correctSequence.length) {
      setErrorMessage('Selecteer eerst alle ' + correctSequence.length + ' kleuren!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    const userAnswer = selectedSequence.join('-').toLowerCase()
    const correctAnswer = correctSequence.join('-').toLowerCase()

    if (userAnswer === correctAnswer) {
      setSuccessMessage('Perfect! De route is correct!')
      setErrorMessage('')
      setTimeout(() => {
        navigate('/puzzle-3')
      }, 2000)
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const isPietSelected = (pietId) => {
    const piet = pieten.find(p => p.id === pietId)
    if (!piet) return false
    return selectedSequence.includes(piet.color)
  }

  const getColorValue = (colorName) => {
    const colorMap = {
      red: 'var(--poofball-red)',
      green: 'var(--ushanka-green)',
      teal: 'var(--teal-toque)',
      orange: 'var(--parka-orange)',
      purple: '#9B59B6',
      yellow: '#F1C40F',
      blue: '#3498DB'
    }
    return colorMap[colorName] || '#000000'
  }

  const getColorNameDutch = (colorName) => {
    const colorMap = {
      red: 'rood',
      green: 'groen',
      teal: 'turquoise',
      orange: 'oranje',
      purple: 'paars',
      yellow: 'geel',
      blue: 'blauw'
    }
    return colorMap[colorName] || colorName
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.puzzleTitle}>Puzzel 2: De Dakroute</h2>
      
      <div className={styles.hintContainer}>
        <p className={styles.hintText}>
          "Over de daken, waar de maan helder schijnt,<br />
          Volg de kleuren die de geschenken van de nacht brengen.<br />
          Rood begint, groen volgt, turquoise wacht,<br />
          Oranje eindigt waar cadeaus vliegen."
        </p>
      </div>

      <div className={`${styles.rooftopScene} ${shake ? styles.shake : ''}`}>
        {/* Nachtelijke hemel met maan */}
        <div className={styles.nightSky}>
          <div className={styles.moon}></div>
          <div className={styles.star} style={{ top: '15%', left: '20%', animationDelay: '0s' }}></div>
          <div className={styles.star} style={{ top: '25%', left: '80%', animationDelay: '1s' }}></div>
          <div className={styles.star} style={{ top: '10%', left: '60%', animationDelay: '2s' }}></div>
        </div>

        {/* Daken */}
        {[1, 2, 3, 4, 5, 6, 7].map((roofNum) => (
          <div key={roofNum} className={styles.roof} style={{
            left: pieten.find(p => p.roof === roofNum)?.position.left || '0%',
            top: pieten.find(p => p.roof === roofNum)?.position.top || '0%',
          }}>
            <div className={styles.roofGable}></div>
            <div className={styles.roofBase}></div>
          </div>
        ))}

        {/* Roetveegpieten */}
        {pieten.map((piet) => (
          <div
            key={piet.id}
            className={`${styles.piet} ${isPietSelected(piet.id) ? styles.selected : ''}`}
            style={{
              top: piet.position.top,
              left: piet.position.left,
            }}
            onClick={() => addColorToSequence(piet.color)}
          >
            {/* Piet lichaam (eenvoudige geometrische vorm) */}
            <div 
              className={styles.pietBody}
              style={{ backgroundColor: piet.costumeColor }}
            ></div>
            {/* Piet hoofd */}
            <div className={styles.pietHead}>
              {/* Roetvegen (soot smudges) - variatie per Piet */}
              <div 
                className={styles.roetveeg1}
                style={{ 
                  top: `${15 + (piet.id % 3) * 2}px`,
                  left: `${5 + (piet.id % 2) * 2}px`,
                  transform: `rotate(${-15 + (piet.id % 5) * 5}deg)`
                }}
              ></div>
              <div 
                className={styles.roetveeg2}
                style={{ 
                  top: `${18 + (piet.id % 3) * 2}px`,
                  right: `${5 + (piet.id % 2) * 2}px`,
                  transform: `rotate(${20 + (piet.id % 5) * 5}deg)`
                }}
              ></div>
              <div 
                className={styles.roetveeg3}
                style={{ 
                  top: `${26 + (piet.id % 2) * 2}px`,
                  width: `${6 + (piet.id % 3)}px`,
                  height: `${8 + (piet.id % 2)}px`
                }}
              ></div>
            </div>
            {/* Cape/Collar */}
            <div 
              className={styles.pietCape}
              style={{ backgroundColor: piet.costumeColor }}
            ></div>
            {/* Cadeauzak */}
            <div 
              className={styles.giftBag}
              style={{ backgroundColor: getColorValue(piet.color) }}
            ></div>
          </div>
        ))}
      </div>

      {/* Volgorde Weergave */}
      <div className={styles.sequenceContainer}>
        <p className={styles.sequenceLabel}>Geselecteerde route:</p>
        <div className={styles.sequenceDisplay}>
          {selectedSequence.length === 0 ? (
            <span className={styles.emptySequence}>Klik op de Pieten om de route te volgen...</span>
          ) : (
            selectedSequence.map((color, index) => (
              <div key={index} className={styles.colorBadge}>
                <div 
                  className={styles.badgeColor}
                  style={{ backgroundColor: getColorValue(color) }}
                ></div>
                <span className={styles.badgeText}>{getColorNameDutch(color)}</span>
                {index < selectedSequence.length - 1 && (
                  <span className={styles.arrow}>→</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bediening */}
      <div className={styles.controls}>
        <button 
          className={styles.clearButton}
          onClick={clearSelection}
          disabled={selectedSequence.length === 0}
        >
          Begin Opnieuw
        </button>
        <button 
          className={styles.submitButton}
          onClick={checkAnswer}
          disabled={selectedSequence.length === 0}
        >
          Controleer Route
        </button>
      </div>

      {/* Feedback Berichten */}
      <div className={styles.feedbackContainer}>
        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  )
}

export default Puzzle2
