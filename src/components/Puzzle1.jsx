import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle1.module.css'

// Moved outside component to avoid recreating on every render
// Rainbow line with speed-based thickness
const drawPath = (ctx, pathPoints) => {
  if (!ctx || pathPoints.length < 2) return
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Draw each segment with rainbow color and variable thickness
  for (let i = 1; i < pathPoints.length; i++) {
    const prev = pathPoints[i - 1]
    const curr = pathPoints[i]

    // Rainbow color: cycle through hue based on index
    const hue = (i * 3) % 360  // 3 degrees per point for smooth rainbow
    ctx.strokeStyle = `hsl(${hue}, 80%, 50%)`

    // Speed-based thickness
    ctx.lineWidth = curr.lineWidth || 4

    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)
    ctx.lineTo(curr.x, curr.y)
    ctx.stroke()
  }
}

function Puzzle1() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const [accuracy, setAccuracy] = useState(0)
  const [resultMessage, setResultMessage] = useState('')
  const [showPepernoot, setShowPepernoot] = useState(false)
  const [shake, setShake] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const minPoints = 20

  // Drawing is now handled directly in draw() for immediate feedback
  // No useEffect needed for points changes

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
    setResultMessage('')
    setShake(false)

    const point = getPointFromEvent(e)
    if (point) {
      const ctx = canvasRef.current?.getContext('2d')
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      setPoints([{
        x: point.x,
        y: point.y,
        timestamp: Date.now(),
        lineWidth: 6
      }])
      setAccuracy(0)
      setShowPepernoot(false)
    }
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()

    const point = getPointFromEvent(e)
    if (!point) return

    const now = Date.now()

    setPoints((prevPoints) => {
      const newPoints = [...prevPoints]

      // Calculate speed-based line width
      let lineWidth = 6 // default thickness
      if (newPoints.length > 0) {
        const lastPoint = newPoints[newPoints.length - 1]
        const dx = point.x - lastPoint.x
        const dy = point.y - lastPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const timeDelta = now - (lastPoint.timestamp || now)

        if (timeDelta > 0) {
          const speed = distance / timeDelta // pixels per ms
          // Map speed to line width: slow (0) = 8px, fast (2+) = 2px
          lineWidth = Math.max(2, Math.min(8, 8 - speed * 3))
        }
      }

      newPoints.push({
        x: point.x,
        y: point.y,
        timestamp: now,
        lineWidth: lineWidth
      })

      // Draw with new point
      const ctx = canvasRef.current?.getContext('2d')
      drawPath(ctx, newPoints)

      // Update accuracy in real-time
      if (newPoints.length >= minPoints) {
        const acc = calculateAccuracyFromPoints(newPoints)
        setAccuracy(acc)
      }

      return newPoints
    })
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
    if (pointArray.length < minPoints) return 0

    // Trim start/end points to ignore wobble when starting/stopping
    const trimAmount = Math.min(5, Math.floor(pointArray.length * 0.1))
    const trimmedPoints = trimAmount > 0
      ? pointArray.slice(trimAmount, -trimAmount)
      : pointArray

    if (trimmedPoints.length < 10) return 0

    // Calculate centroid
    let sumX = 0
    let sumY = 0
    for (const p of trimmedPoints) {
      sumX += p.x
      sumY += p.y
    }
    const centerX = sumX / trimmedPoints.length
    const centerY = sumY / trimmedPoints.length

    // Calculate distances from centroid and average radius
    const distances = trimmedPoints.map(p =>
      Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
    )
    const averageRadius = distances.reduce((a, b) => a + b, 0) / distances.length

    // Use standard deviation instead of max deviation (more forgiving)
    const sumSquaredDeviation = distances.reduce((sum, dist) =>
      sum + Math.pow(dist - averageRadius, 2), 0
    )
    const stdDeviation = Math.sqrt(sumSquaredDeviation / distances.length)

    // Calculate accuracy (scale factor ~2.5 to make std dev comparable to old scoring)
    let acc = (1 - (stdDeviation / averageRadius) * 2.5) * 100
    return Math.max(0, Math.min(100, acc))
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

    if (acc >= 75) {
      const password = 'pepernoot'
      setResultMessage('Perfect! Hier is de code voor de volgende puzzel: pepernoot')
      setShowPepernoot(true)
      setIsCompleted(true)
      markPuzzleSolved(1, password)
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

      <h2 className={styles.title}>Puzzel 1: Piet's Perfect Pepernoot</h2>

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
        <p className={styles.accuracyDisplay} style={{ color: accuracy >= 75 ? 'var(--ushanka-green)' : accuracy >= 65 ? 'var(--parka-orange)' : 'var(--poofball-red)' }}>
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
        <div className={styles.resultMessage} style={{ color: accuracy >= 75 ? 'var(--ushanka-green)' : 'var(--poofball-red)' }}>
          {resultMessage}
        </div>
      </div>
    </div>
  )
}

export default Puzzle1

