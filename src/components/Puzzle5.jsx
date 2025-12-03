import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle5.module.css'

// Puzzle configuration
const CORRECT_SHIFT = 5 // December 5th - Pakjesavond
const ENCRYPTED_MESSAGE = 'IJ PFITX ENOS AJWGTWLJS'
const CORRECT_ANSWER = 'DE KADOS ZIJN VERBORGEN'
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function Puzzle5() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  
  // State
  const [shift, setShift] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartAngle, setDragStartAngle] = useState(0)
  const [dragStartShift, setDragStartShift] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [wheelSize, setWheelSize] = useState(320)
  
  // Refs
  const wheelRef = useRef(null)
  const containerRef = useRef(null)

  // Caesar cipher decryption
  const decryptLetter = useCallback((char, currentShift) => {
    if (char >= 'A' && char <= 'Z') {
      const index = char.charCodeAt(0) - 65
      const shifted = ((index - currentShift % 26) + 26) % 26
      return String.fromCharCode(shifted + 65)
    }
    return char
  }, [])

  const decryptMessage = useCallback((text, currentShift) => {
    return text.split('').map(char => decryptLetter(char, currentShift)).join('')
  }, [decryptLetter])

  // Get current decrypted message
  const decryptedMessage = decryptMessage(ENCRYPTED_MESSAGE, shift)

  // Handle responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const maxSize = Math.min(containerWidth - 40, 380)
        setWheelSize(Math.max(260, maxSize))
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCompleted) return
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault()
        setShift(prev => (prev - 1 + 26) % 26)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault()
        setShift(prev => (prev + 1) % 26)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCompleted])

  // Calculate angle from wheel center to a point
  const getAngleFromCenter = useCallback((clientX, clientY) => {
    if (!wheelRef.current) return 0
    
    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate angle (0 = top, clockwise positive)
    const angle = Math.atan2(clientX - centerX, -(clientY - centerY)) * (180 / Math.PI)
    return (angle + 360) % 360
  }, [])

  // Mouse/touch handlers
  const handleStart = useCallback((clientX, clientY) => {
    if (isCompleted) return
    
    setIsDragging(true)
    setDragStartAngle(getAngleFromCenter(clientX, clientY))
    setDragStartShift(shift)
  }, [isCompleted, getAngleFromCenter, shift])

  const handleMove = useCallback((clientX, clientY) => {
    if (!isDragging) return
    
    const currentAngle = getAngleFromCenter(clientX, clientY)
    let angleDiff = currentAngle - dragStartAngle
    
    // Handle wrap-around
    if (angleDiff > 180) angleDiff -= 360
    if (angleDiff < -180) angleDiff += 360
    
    // Convert angle to shift steps (360 degrees = 26 letters)
    const shiftDiff = Math.round(angleDiff / (360 / 26))
    let newShift = (dragStartShift + shiftDiff) % 26
    if (newShift < 0) newShift += 26
    
    setShift(newShift)
  }, [isDragging, dragStartAngle, dragStartShift, getAngleFromCenter])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY)
      }
    }
    
    const handleMouseUp = () => {
      handleEnd()
    }
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMove, handleEnd])

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault()
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }
  }

  // Shift control buttons
  const decrementShift = () => {
    if (!isCompleted) {
      setShift(prev => (prev - 1 + 26) % 26)
    }
  }

  const incrementShift = () => {
    if (!isCompleted) {
      setShift(prev => (prev + 1) % 26)
    }
  }

  // Check answer
  const handleCheck = () => {
    if (shift === CORRECT_SHIFT) {
      setIsCompleted(true)
      setShowSuccess(true)
      markPuzzleSolved(5, CORRECT_ANSWER.toLowerCase())
    }
  }

  // Navigate to next puzzle
  const handleNext = () => {
    navigate('/puzzle-6')
  }

  // Reset puzzle
  const handleReset = () => {
    setShift(0)
    setIsCompleted(false)
    setShowSuccess(false)
  }

  // Calculate ring dimensions based on wheel size
  const outerRadius = wheelSize / 2 - 10
  const innerRadius = wheelSize / 2 - 60
  const letterRadiusOuter = outerRadius - 25
  const letterRadiusInner = innerRadius - 20

  // Inner ring rotation angle
  const innerRotation = (shift * 360) / 26

  // Get the letter that aligns with 'A' on the outer ring
  const alignedLetter = ALPHABET[(0 + shift) % 26]

  return (
    <div className={styles.puzzleContainer} ref={containerRef}>
      <h2 className={styles.title}>Puzzel 5: Piet's Cijferwiel</h2>
      
      {/* Clue section */}
      <div className={styles.clueBox}>
        <p className={styles.clueText}>
          Een geheime boodschap van Piet! Draai het wiel om de code te kraken.
        </p>
        <p className={styles.hintText}>
          💡 Hint: Wanneer vieren we Pakjesavond?
        </p>
      </div>

      {/* Encrypted message display */}
      <div className={styles.messageSection}>
        <span className={styles.messageLabel}>Versleuteld:</span>
        <div className={styles.encryptedMessage}>
          {ENCRYPTED_MESSAGE.split('').map((char, i) => (
            <span key={i} className={char === ' ' ? styles.space : styles.letter}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Cipher wheel */}
      <div 
        className={styles.wheelWrapper}
        style={{ width: wheelSize, height: wheelSize }}
      >
        <div 
          ref={wheelRef}
          className={`${styles.wheel} ${isDragging ? styles.dragging : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          role="slider"
          aria-label="Cipher wheel rotation"
          aria-valuenow={shift}
          aria-valuemin={0}
          aria-valuemax={25}
          tabIndex={0}
        >
          {/* Outer ring (fixed - ciphertext) */}
          <div className={styles.outerRing} style={{ width: outerRadius * 2, height: outerRadius * 2 }}>
            {ALPHABET.split('').map((letter, index) => {
              const angle = (index * 360 / 26) - 90 // Start from top
              const radian = (angle * Math.PI) / 180
              const x = Math.cos(radian) * letterRadiusOuter
              const y = Math.sin(radian) * letterRadiusOuter
              const isHighlighted = index === 0 // Highlight 'A' as reference
              
              return (
                <span
                  key={`outer-${index}`}
                  className={`${styles.outerLetter} ${isHighlighted ? styles.highlighted : ''}`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  {letter}
                </span>
              )
            })}
          </div>

          {/* Inner ring (rotatable - plaintext) */}
          <div 
            className={styles.innerRing}
            style={{ 
              width: innerRadius * 2, 
              height: innerRadius * 2,
              transform: `translate(-50%, -50%) rotate(${innerRotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {ALPHABET.split('').map((letter, index) => {
              const angle = (index * 360 / 26) - 90 // Start from top
              const radian = (angle * Math.PI) / 180
              const x = Math.cos(radian) * letterRadiusInner
              const y = Math.sin(radian) * letterRadiusInner
              const isAligned = index === 0 // 'A' on inner ring
              
              return (
                <span
                  key={`inner-${index}`}
                  className={`${styles.innerLetter} ${isAligned ? styles.alignedInner : ''}`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-innerRotation}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                  }}
                >
                  {letter}
                </span>
              )
            })}
          </div>

          {/* Center hub */}
          <div className={styles.centerHub}>
            <span className={styles.hubIcon}>🔐</span>
          </div>
        </div>

        {/* Alignment indicator arrow */}
        <div className={styles.alignmentArrow}>▼</div>
      </div>

      {/* Shift display and controls */}
      <div className={styles.shiftControls}>
        <button 
          className={styles.shiftButton} 
          onClick={decrementShift}
          disabled={isCompleted}
          aria-label="Decrease shift"
        >
          ◀
        </button>
        
        <div className={styles.shiftDisplay}>
          <span className={styles.shiftLabel}>Verschuiving</span>
          <span className={styles.shiftValue}>{shift}</span>
          <span className={styles.alignmentInfo}>A → {alignedLetter}</span>
        </div>
        
        <button 
          className={styles.shiftButton} 
          onClick={incrementShift}
          disabled={isCompleted}
          aria-label="Increase shift"
        >
          ▶
        </button>
      </div>

      {/* Decrypted message display */}
      <div className={styles.messageSection}>
        <span className={styles.messageLabel}>Ontcijferd:</span>
        <div className={`${styles.decryptedMessage} ${showSuccess ? styles.success : ''}`}>
          {decryptedMessage.split('').map((char, i) => {
            const originalChar = ENCRYPTED_MESSAGE[i]
            const isCorrect = shift === CORRECT_SHIFT && originalChar !== ' '
            
            return (
              <span 
                key={i} 
                className={`${char === ' ' ? styles.space : styles.letter} ${isCorrect ? styles.correctLetter : ''}`}
                style={{ animationDelay: isCorrect ? `${i * 30}ms` : '0ms' }}
              >
                {char}
              </span>
            )
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        {!isCompleted ? (
          <>
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
            <button className={styles.checkButton} onClick={handleCheck}>
              Controleer
            </button>
          </>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            Volgende Puzzel →
          </button>
        )}
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className={styles.successMessage}>
          🎉 Perfect! Je hebt de code gekraakt!
        </div>
      )}

      {/* Instructions */}
      <div className={styles.instructions}>
        <p>Draai het binnenste wiel of gebruik de knoppen. Je kunt ook de pijltjestoetsen gebruiken.</p>
      </div>
    </div>
  )
}

export default Puzzle5
