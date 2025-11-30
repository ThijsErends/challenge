import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Puzzle5.module.css'

function Puzzle5() {
  const navigate = useNavigate()
  
  // Cipher details: Shift of 5 (December 5th - Pakjesavond)
  const SHIFT = 5
  const ENCRYPTED_MESSAGE = 'IJ PFITX EONS AJWGTWLJS'
  const CORRECT_ANSWER = 'DE KADOS ZIJN VERBORGEN'
  
  const [innerRingPosition, setInnerRingPosition] = useState(0) // 0-25 for A-Z
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartAngle, setDragStartAngle] = useState(0)
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const [hasDragged, setHasDragged] = useState(false)
  const [decryptedMessage, setDecryptedMessage] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [shake, setShake] = useState(false)
  
  const wheelRef = useRef(null)
  const innerRingRef = useRef(null)

  // Caesar cipher decryption
  const decryptCaesar = (text, shift) => {
    return text
      .split('')
      .map((char) => {
        if (char >= 'A' && char <= 'Z') {
          const shifted = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
          return String.fromCharCode(shifted)
        } else if (char >= 'a' && char <= 'z') {
          const shifted = ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
          return String.fromCharCode(shifted)
        }
        return char // Preserve spaces and punctuation
      })
      .join('')
  }

  // Calculate current shift based on ring position
  const getCurrentShift = () => {
    // The shift is the difference between outer (fixed at 0) and inner ring positions
    return innerRingPosition
  }

  // Update decrypted message in real-time
  useEffect(() => {
    const currentShift = getCurrentShift()
    const decrypted = decryptCaesar(ENCRYPTED_MESSAGE, currentShift)
    setDecryptedMessage(decrypted)
  }, [innerRingPosition])

  // Get angle from center of wheel to a point (in degrees, 0 = top, clockwise)
  const getAngle = (centerX, centerY, pointX, pointY) => {
    // Math.atan2 returns angle from positive x-axis (right), we want from top
    const angle = Math.atan2(pointY - centerY, pointX - centerX) * (180 / Math.PI)
    // Convert to 0 = top, clockwise positive
    return (angle + 90 + 360) % 360
  }

  // Handle mouse/touch start
  const handleStart = (clientX, clientY) => {
    if (!wheelRef.current || !innerRingRef.current) return
    
    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const angle = getAngle(centerX, centerY, clientX, clientY)
    
    setIsDragging(true)
    setHasDragged(false)
    setDragStartAngle(angle)
    setDragStartPosition(innerRingPosition)
  }

  // Handle mouse/touch move
  const handleMove = (clientX, clientY) => {
    if (!isDragging || !wheelRef.current) return
    
    setHasDragged(true)
    
    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const currentAngle = getAngle(centerX, centerY, clientX, clientY)
    let angleDiff = currentAngle - dragStartAngle
    
    // Handle angle wrapping (shortest path)
    if (angleDiff > 180) angleDiff -= 360
    if (angleDiff < -180) angleDiff += 360
    
    // Convert angle difference to position change
    // Use a more precise calculation
    const totalAngle = (dragStartPosition * 360) / 26 + angleDiff
    let newPosition = Math.round((totalAngle / 360) * 26)
    
    // Wrap around 0-25
    newPosition = ((newPosition % 26) + 26) % 26
    setInnerRingPosition(newPosition)
  }

  // Handle mouse/touch end
  const handleEnd = () => {
    setIsDragging(false)
    // Reset hasDragged after a short delay to allow click handler to check it
    setTimeout(() => setHasDragged(false), 100)
  }

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY)
    }
  }

  const handleMouseUp = () => {
    handleEnd()
  }

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

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Click to rotate by one position
  const handleRingClick = (e) => {
    // Don't rotate on click if we just dragged
    if (hasDragged || isDragging) {
      e.stopPropagation()
      return
    }
    
    e.stopPropagation()
    setInnerRingPosition((prev) => (prev + 1) % 26)
  }

  // Reset rings to starting position
  const handleReset = () => {
    setInnerRingPosition(0)
    setErrorMessage('')
    setShake(false)
    setIsCompleted(false)
  }

  // Check answer
  const handleCheck = () => {
    const trimmedAnswer = decryptedMessage.trim().toUpperCase()
    const trimmedCorrect = CORRECT_ANSWER.trim().toUpperCase()
    
    if (trimmedAnswer === trimmedCorrect) {
      setIsCompleted(true)
      setErrorMessage('')
    } else {
      setErrorMessage('Onjuist. Probeer opnieuw.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  // Navigate to next puzzle
  const handleNext = () => {
    navigate('/puzzle-6')
  }

  // Generate alphabet array
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

  // Calculate rotation angle for inner ring
  const innerRingRotation = (innerRingPosition * 360) / 26

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 5: Piet's Cijferwiel</h2>
      
      <div className={styles.clueContainer}>
        <p className={styles.clueText}>
          Zoek naar de verborgen getallen in Sinterklaas tradities.
        </p>
        <p className={styles.hintText}>
          (Tip: Wanneer vieren we Pakjesavond?)
        </p>
      </div>

      <div className={styles.messageContainer}>
        <p className={styles.messageLabel}>Versleuteld bericht:</p>
        <div className={styles.encryptedMessage}>{ENCRYPTED_MESSAGE}</div>
      </div>

      <div 
        className={`${styles.wheelContainer} ${shake ? styles.shake : ''}`}
        ref={wheelRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Outer ring (fixed) */}
        <div className={styles.outerRing}>
          {alphabet.map((letter, index) => {
            // Start from top (90 degrees offset), then go clockwise
            const angle = (index * 360) / 26 - 90
            const radian = (angle * Math.PI) / 180
            const radius = 140
            const x = Math.cos(radian) * radius
            const y = Math.sin(radian) * radius
            
            return (
              <div
                key={`outer-${index}`}
                className={styles.outerLetter}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                {letter}
              </div>
            )
          })}
        </div>

        {/* Inner ring (rotatable) */}
        <div
          ref={innerRingRef}
          className={styles.innerRing}
          style={{
            transform: `translate(-50%, -50%) rotate(${innerRingRotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
          onClick={handleRingClick}
        >
          {alphabet.map((letter, index) => {
            // Start from top (90 degrees offset), then go clockwise
            const angle = (index * 360) / 26 - 90
            const radian = (angle * Math.PI) / 180
            const radius = 100
            const x = Math.cos(radian) * radius
            const y = Math.sin(radian) * radius
            
            return (
              <div
                key={`inner-${index}`}
                className={styles.innerLetter}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-innerRingRotation}deg)`,
                }}
              >
                {letter}
              </div>
            )
          })}
        </div>

        {/* Center pin */}
        <div className={styles.centerPin}></div>
      </div>

      <div className={styles.decryptedContainer}>
        <p className={styles.decryptedLabel}>Ontcijferd bericht:</p>
        <div className={styles.decryptedMessage}>{decryptedMessage || ENCRYPTED_MESSAGE}</div>
      </div>

      <div className={styles.controls}>
        {!isCompleted ? (
          <>
            <button className={styles.resetButton} onClick={handleReset}>
              Begin Opnieuw
            </button>
            <button className={styles.checkButton} onClick={handleCheck}>
              Controleer
            </button>
          </>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            Volgende Puzzel
          </button>
        )}
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {isCompleted && (
        <div className={styles.successMessage}>
          Perfect! Het bericht is ontcijferd!
        </div>
      )}
    </div>
  )
}

export default Puzzle5
