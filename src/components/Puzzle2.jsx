import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle2.module.css'

function Puzzle2() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [selectedSequence, setSelectedSequence] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [shake, setShake] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const sceneRef = useRef(null)
  const [housePositions, setHousePositions] = useState([])

  // Correct sequence (4 colors)
  const correctSequence = ['rood', 'groen', 'turquoise', 'oranje']

  // Define houses with their styles and associated Pieten
  const houses = [
    { 
      id: 1, 
      gableType: 'step', 
      colorClass: 'houseRed',
      height: 140,
      piet: { color: 'rood', costumeColor: 'var(--poofball-red)' }
    },
    { 
      id: 2, 
      gableType: 'bell', 
      colorClass: 'houseCream',
      height: 160,
      piet: { color: 'paars', costumeColor: '#9B59B6' }
    },
    { 
      id: 3, 
      gableType: 'pointed', 
      colorClass: 'houseGreen',
      height: 130,
      piet: { color: 'groen', costumeColor: 'var(--ushanka-green)' }
    },
    { 
      id: 4, 
      gableType: 'neck', 
      colorClass: 'houseBlue',
      height: 150,
      piet: { color: 'turquoise', costumeColor: 'var(--teal-toque)' }
    },
    { 
      id: 5, 
      gableType: 'step', 
      colorClass: 'houseYellow',
      height: 145,
      piet: { color: 'geel', costumeColor: '#F1C40F' }
    },
    { 
      id: 6, 
      gableType: 'bell', 
      colorClass: 'houseOrange',
      height: 155,
      piet: { color: 'oranje', costumeColor: 'var(--parka-orange)' }
    },
    { 
      id: 7, 
      gableType: 'pointed', 
      colorClass: 'houseBrown',
      height: 135,
      piet: { color: 'blauw', costumeColor: '#3498DB' }
    },
  ]

  // Star positions for night sky - many more stars!
  const stars = [
    { top: '5%', left: '8%', delay: '0s' },
    { top: '8%', left: '15%', delay: '0.2s' },
    { top: '12%', left: '22%', delay: '0.5s' },
    { top: '3%', left: '30%', delay: '0.8s' },
    { top: '10%', left: '38%', delay: '1s' },
    { top: '6%', left: '45%', delay: '1.2s' },
    { top: '15%', left: '52%', delay: '1.5s' },
    { top: '8%', left: '58%', delay: '1.7s' },
    { top: '4%', left: '65%', delay: '2s' },
    { top: '12%', left: '72%', delay: '2.2s' },
    { top: '18%', left: '78%', delay: '2.5s' },
    { top: '7%', left: '85%', delay: '2.8s' },
    { top: '20%', left: '12%', delay: '0.3s' },
    { top: '22%', left: '28%', delay: '0.6s' },
    { top: '25%', left: '42%', delay: '1.1s' },
    { top: '18%', left: '5%', delay: '0.4s' },
    { top: '28%', left: '60%', delay: '1.8s' },
    { top: '16%', left: '90%', delay: '3s' },
    { top: '24%', left: '18%', delay: '0.9s' },
    { top: '30%', left: '35%', delay: '1.4s' },
  ]

  // Clouds for atmosphere - more clouds!
  const clouds = [
    { top: '8%', width: '100px', height: '30px', delay: '0s' },
    { top: '18%', width: '70px', height: '22px', delay: '12s' },
    { top: '28%', width: '85px', height: '25px', delay: '25s' },
    { top: '12%', width: '55px', height: '18px', delay: '35s' },
  ]

  const addColorToSequence = (color) => {
    if (selectedSequence.length >= correctSequence.length) {
      return
    }
    if (selectedSequence.includes(color)) {
      return // Already selected
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
    setIsCompleted(false)
  }

  const handleNext = () => {
    navigate('/puzzle-3')
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
      const password = correctSequence.join('-')
      setSuccessMessage(`Perfect! De route is correct!`)
      setErrorMessage('')
      setIsCompleted(true)
      markPuzzleSolved(2, password)
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const isPietSelected = (color) => {
    return selectedSequence.includes(color)
  }

  const getSelectionOrder = (color) => {
    const index = selectedSequence.indexOf(color)
    return index >= 0 ? index + 1 : null
  }

  const getColorValue = (colorName) => {
    const colorMap = {
      rood: 'var(--poofball-red)',
      groen: 'var(--ushanka-green)',
      turquoise: 'var(--teal-toque)',
      oranje: 'var(--parka-orange)',
      paars: '#9B59B6',
      geel: '#F1C40F',
      blauw: '#3498DB'
    }
    return colorMap[colorName] || '#000000'
  }

  const getColorNameDutch = (colorName) => {
    return colorName // Already Dutch
  }

  // Render gable based on type
  const renderGable = (type) => {
    switch (type) {
      case 'step':
        return (
          <div className={styles.stepGable}>
            <div className={styles.gableTop}>
              <div className={`${styles.step} ${styles.step1}`}></div>
              <div className={`${styles.step} ${styles.step2}`}></div>
              <div className={`${styles.step} ${styles.step3}`}></div>
              <div className={`${styles.step} ${styles.step4}`}></div>
            </div>
          </div>
        )
      case 'bell':
        return <div className={styles.bellGable}></div>
      case 'neck':
        return (
          <div className={styles.neckGable}>
            <div className={styles.neckTop}></div>
            <div className={styles.neckBase}></div>
          </div>
        )
      case 'pointed':
        return <div className={styles.pointedGable}></div>
      default:
        return null
    }
  }

  // Render windows based on house height
  const renderWindows = (height) => {
    const rows = height > 150 ? 3 : 2
    return (
      <>
        {[...Array(rows)].map((_, i) => (
          <div key={i} className={styles.windowRow}>
            <div className={styles.window}></div>
            <div className={styles.window}></div>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.puzzleTitle}>Puzzel 2: De Dakroute</h2>
      
      <div className={styles.contentRow}>
        <div className={styles.hintContainer}>
          <p className={styles.hintText}>
            "Bij maanlicht, over de daken zo stil,<br />
            Volg jij de kleuren, dat is wat ik wil.<br />
            Begin bij rood, waar de haard nog gloeit,<br />
            Naar groen, waar de lente volop bloeit.<br />
            Dan turquoise, waar de golven zacht ruisen,<br />
            Tot oranje, waar dag en nacht zich kruisen."
          </p>
        </div>

        <div 
          ref={sceneRef}
          className={`${styles.rooftopScene} ${shake ? styles.shake : ''}`}
        >
        {/* Night sky with moon and stars */}
        <div className={styles.nightSky}>
          <div className={styles.moon}></div>
          {stars.map((star, i) => (
            <div 
              key={i}
              className={styles.star} 
              style={{ 
                top: star.top, 
                left: star.left, 
                animationDelay: star.delay 
              }}
            ></div>
          ))}
          {clouds.map((cloud, i) => (
            <div
              key={i}
              className={styles.cloud}
              style={{
                top: cloud.top,
                width: cloud.width,
                height: cloud.height,
                animationDelay: cloud.delay,
                left: '-100px'
              }}
            ></div>
          ))}
        </div>

        {/* Houses Row */}
        <div className={styles.housesContainer}>
          {houses.map((house) => (
            <div 
              key={house.id}
              className={`${styles.house} ${styles[house.colorClass]} ${isPietSelected(house.piet.color) ? styles.selected : ''}`}
              onClick={() => addColorToSequence(house.piet.color)}
            >
              {/* Chimney with smoke */}
              <div className={`${styles.chimney} ${styles.chimneyLeft}`}>
                <div className={styles.smoke}></div>
              </div>
              
              {/* Piet on roof */}
              <div 
                className={`${styles.piet} ${isPietSelected(house.piet.color) ? styles.selected : ''}`}
                style={{ position: 'relative', top: 0, left: 0, marginBottom: '-15px' }}
              >
                {/* Selection order badge */}
                {getSelectionOrder(house.piet.color) && (
                  <div className={styles.selectionBadge}>
                    {getSelectionOrder(house.piet.color)}
                  </div>
                )}
                <div className={styles.pietHat}></div>
                <div className={styles.pietHead}>
                  <div 
                    className={styles.roetveeg1}
                    style={{ 
                      top: `${12 + (house.id % 3) * 2}px`,
                      left: `${4 + (house.id % 2) * 2}px`,
                      transform: `rotate(${-15 + (house.id % 5) * 5}deg)`
                    }}
                  ></div>
                  <div 
                    className={styles.roetveeg2}
                    style={{ 
                      top: `${14 + (house.id % 3) * 2}px`,
                      right: `${4 + (house.id % 2) * 2}px`,
                      transform: `rotate(${20 + (house.id % 5) * 5}deg)`
                    }}
                  ></div>
                  <div 
                    className={styles.roetveeg3}
                    style={{ 
                      top: `${20 + (house.id % 2) * 2}px`,
                      width: `${5 + (house.id % 3)}px`,
                      height: `${6 + (house.id % 2)}px`
                    }}
                  ></div>
                </div>
                <div 
                  className={styles.pietBody}
                  style={{ backgroundColor: house.piet.costumeColor }}
                ></div>
                <div 
                  className={styles.giftBag}
                  style={{ backgroundColor: getColorValue(house.piet.color) }}
                ></div>
              </div>

              {/* Gable */}
              {renderGable(house.gableType)}

              {/* House Wall */}
              <div 
                className={styles.houseWall}
                style={{ 
                  width: '70px',
                  height: `${house.height}px`
                }}
              >
                {renderWindows(house.height)}
                <div className={styles.door}></div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Sequence Display */}
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

      {/* Controls */}
      <div className={styles.controls}>
        {!isCompleted ? (
          <>
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
          </>
        ) : (
          <button 
            className={styles.submitButton}
            onClick={handleNext}
          >
            Volgende Puzzel
          </button>
        )}
      </div>

      {/* Feedback Messages */}
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
