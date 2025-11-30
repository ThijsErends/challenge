import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Puzzle1.module.css'

function Puzzle1() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const [accuracy, setAccuracy] = useState(0)
  const [resultMessage, setResultMessage] = useState('')
  const [showPepernoot, setShowPepernoot] = useState(false)
  const [shake, setShake] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const minPoints = 20

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    drawPath(ctx, points)
  }, [points])

  const drawPath = (ctx, pathPoints) => {
    if (!ctx || pathPoints.length === 0) return
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.beginPath()
    ctx.moveTo(pathPoints[0].x, pathPoints[0].y)
    for (let i = 1; i < pathPoints.length; i++) {
      ctx.lineTo(pathPoints[i].x, pathPoints[i].y)
    }
    ctx.strokeStyle = 'var(--marker-black)'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  const getPointFromEvent = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const point = getPointFromEvent(e)
    if (point) {
      setPoints([point])
      setAccuracy(0)
      setResultMessage('')
      setShowPepernoot(false)
    }
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    const point = getPointFromEvent(e)
    if (point) {
      const newPoints = [...points, point]
      setPoints(newPoints)
      // Calculate accuracy in real-time
      if (newPoints.length >= minPoints) {
        const acc = calculateAccuracyFromPoints(newPoints)
        setAccuracy(acc)
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    setPoints([])
    setAccuracy(0)
    setResultMessage('')
    setShowPepernoot(false)
    setShake(false)
    setIsCompleted(false)
  }

  const calculateAccuracyFromPoints = (pointArray) => {
    if (pointArray.length < minPoints) {
      return 0
    }

    // Calculate centroid
    let sumX = 0
    let sumY = 0
    for (const p of pointArray) {
      sumX += p.x
      sumY += p.y
    }
    const centerX = sumX / pointArray.length
    const centerY = sumY / pointArray.length

    // Calculate distances from centroid and average radius
    let distances = []
    let sumDistances = 0
    for (const p of pointArray) {
      const dist = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
      distances.push(dist)
      sumDistances += dist
    }
    const averageRadius = sumDistances / pointArray.length

    // Calculate max deviation from average radius
    let maxDeviation = 0
    for (const dist of distances) {
      maxDeviation = Math.max(maxDeviation, Math.abs(dist - averageRadius))
    }

    // Accuracy decreases as maxDeviation increases relative to averageRadius
    let acc = (1 - (maxDeviation / averageRadius)) * 100
    acc = Math.max(0, Math.min(100, acc))

    return acc
  }

  const calculateAccuracy = () => {
    if (points.length < minPoints) {
      setResultMessage('Teken eerst een cirkel!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return 0
    }

    return calculateAccuracyFromPoints(points)
  }

  const checkCircle = () => {
    const acc = calculateAccuracy()
    setAccuracy(acc)

    if (acc >= 80) {
      setResultMessage('Perfect! Hier is de code voor de volgende puzzel: pepernoot')
      setShowPepernoot(true)
      setIsCompleted(true)
    } else {
      setResultMessage('Niet helemaal rond. Probeer het opnieuw, Piet!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNext = () => {
    navigate('/puzzle-2')
  }

  // Generate chocolate pepernoten with different sizes
  const pepernoten = [
    { id: 1, size: 'small', delay: 0, duration: 15, top: '10%', left: '5%', rotation: -5 },
    { id: 2, size: 'medium', delay: 2, duration: 18, top: '15%', left: '85%', rotation: 8 },
    { id: 3, size: 'large', delay: 4, duration: 20, top: '70%', left: '3%', rotation: -3 },
    { id: 4, size: 'small', delay: 1, duration: 16, top: '80%', left: '88%', rotation: 12 },
    { id: 5, size: 'medium', delay: 3, duration: 17, top: '45%', left: '2%', rotation: -7 },
    { id: 6, size: 'small', delay: 5, duration: 19, top: '30%', left: '90%', rotation: 6 },
    { id: 7, size: 'medium', delay: 1.5, duration: 21, top: '60%', left: '92%', rotation: -9 },
    { id: 8, size: 'small', delay: 2.5, duration: 14, top: '25%', left: '8%', rotation: 4 },
  ]

  return (
    <div className={styles.puzzleContainer}>
      {/* Animated pepernoten background */}
      <div className={styles.notesBackground}>
        {pepernoten.map((pepernoot) => (
          <div
            key={pepernoot.id}
            className={`${styles.pepernoot} ${styles[pepernoot.size]}`}
            style={{
              top: pepernoot.top,
              left: pepernoot.left,
              animationDelay: `${pepernoot.delay}s`,
              animationDuration: `${pepernoot.duration}s`,
              ['--base-rotation']: `${pepernoot.rotation}deg`,
            }}
          />
        ))}
      </div>
      
      <p className={styles.instructionText}>
        Help Piet een perfecte pepernoot tekenen. Probeer een zo rond mogelijke cirkel te tekenen met je muis of vinger.
      </p>
      <div className={`${styles.drawingContainer} ${shake ? styles.shake : ''}`}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={400}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
        {showPepernoot && <div className={`${styles.pepernootGraphic} ${styles.visible}`}></div>}
      </div>
      
      <div className={styles.feedbackArea}>
        <p className={styles.accuracyDisplay} style={{ color: accuracy >= 80 ? 'var(--ushanka-green)' : accuracy >= 70 ? 'var(--parka-orange)' : 'var(--poofball-red)' }}>
          Accuraat: {Math.round(accuracy)}%
        </p>
        <div className={styles.buttonContainer}>
          {!isCompleted ? (
            <>
              <button className={styles.resetButton} onClick={clearCanvas}>Begin Opnieuw</button>
              <button className={styles.checkButton} onClick={checkCircle}>Controleer Cirkel</button>
            </>
          ) : (
            <button className={styles.checkButton} onClick={handleNext}>Volgende Puzzel</button>
          )}
        </div>
        <div className={styles.resultMessage} style={{ color: accuracy >= 80 ? 'var(--ushanka-green)' : 'var(--poofball-red)' }}>
          {resultMessage}
        </div>
      </div>
    </div>
  )
}

export default Puzzle1

