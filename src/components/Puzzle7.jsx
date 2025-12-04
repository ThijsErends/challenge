import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle7.module.css'

const GRID_COLS = 5
const GRID_ROWS = 6
const TOTAL_PIECES = GRID_COLS * GRID_ROWS
const PIECE_SIZE = 60 // pixels
const IMAGE_WIDTH = GRID_COLS * PIECE_SIZE  // 300
const IMAGE_HEIGHT = GRID_ROWS * PIECE_SIZE // 360

// Generate the SVG as a data URL for use as background-image
// Enhanced with many unique details to make each puzzle piece distinctive
function generateSvgDataUrl() {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360">
    <!-- Sky gradient background using stripes -->
    <rect width="300" height="360" fill="#2AB7CA"/>
    <rect width="300" height="60" y="0" fill="#3BC4D4"/>
    <rect width="300" height="40" y="320" fill="#1E9AAA"/>

    <!-- Clouds - top left area -->
    <ellipse cx="35" cy="25" rx="25" ry="12" fill="#F4F1E8" opacity="0.9"/>
    <ellipse cx="55" cy="22" rx="20" ry="10" fill="#F4F1E8" opacity="0.9"/>
    <ellipse cx="20" cy="28" rx="15" ry="8" fill="#F4F1E8" opacity="0.9"/>

    <!-- Clouds - top right area -->
    <ellipse cx="270" cy="18" rx="22" ry="11" fill="#F4F1E8" opacity="0.85"/>
    <ellipse cx="250" cy="22" rx="18" ry="9" fill="#F4F1E8" opacity="0.85"/>

    <!-- Small cloud middle-right -->
    <ellipse cx="285" cy="95" rx="14" ry="7" fill="#F4F1E8" opacity="0.7"/>

    <!-- Moon/sun in top right -->
    <circle cx="280" cy="45" r="18" fill="#F7E96B"/>
    <circle cx="275" cy="42" r="15" fill="#F7E96B"/>

    <!-- Dutch house - bottom left background -->
    <rect x="5" y="280" width="45" height="75" fill="#C94343"/>
    <polygon points="5,280 27,250 50,280" fill="#8B4513"/>
    <rect x="15" y="295" width="12" height="18" fill="#F7931E"/>
    <rect x="32" y="300" width="10" height="10" fill="#87CEEB"/>
    <rect x="15" y="330" width="12" height="25" fill="#5c4033"/>
    <ellipse cx="24" cy="342" rx="2" ry="2" fill="#F7931E"/>

    <!-- Chimney on house -->
    <rect x="35" y="255" width="8" height="20" fill="#8B4513"/>
    <rect x="33" y="252" width="12" height="5" fill="#5c4033"/>

    <!-- Smoke from chimney -->
    <ellipse cx="39" cy="245" rx="5" ry="4" fill="#E8E4DB" opacity="0.6"/>
    <ellipse cx="42" cy="235" rx="4" ry="3" fill="#E8E4DB" opacity="0.5"/>
    <ellipse cx="38" cy="225" rx="3" ry="2" fill="#E8E4DB" opacity="0.4"/>

    <!-- Stars scattered around - different sizes and positions -->
    <polygon points="50,55 52,62 60,62 54,67 56,74 50,70 44,74 46,67 40,62 48,62" fill="#F7931E"/>
    <polygon points="15,75 16,79 21,79 17,82 19,87 15,84 11,87 13,82 9,79 14,79" fill="#F7E96B"/>
    <polygon points="250,70 252,77 260,77 254,82 256,89 250,85 244,89 246,82 240,77 248,77" fill="#F7931E"/>
    <polygon points="285,130 286,134 291,134 287,137 289,142 285,139 281,142 283,137 279,134 284,134" fill="#F7E96B"/>
    <polygon points="12,150 13,154 18,154 14,157 16,162 12,159 8,162 10,157 6,154 11,154" fill="#F7931E"/>
    <polygon points="25,95" fill="#F7E96B"/>

    <!-- Flying bird silhouette - top area -->
    <path d="M 180 35 Q 185 30 190 35 Q 195 30 200 35" stroke="#1A1713" stroke-width="2" fill="none"/>

    <!-- Another bird -->
    <path d="M 220 55 Q 224 51 228 55 Q 232 51 236 55" stroke="#1A1713" stroke-width="1.5" fill="none"/>

    <!-- Ground/snow at bottom -->
    <rect x="0" y="350" width="300" height="10" fill="#F4F1E8"/>
    <ellipse cx="70" cy="355" rx="25" ry="5" fill="#E8E4DB"/>
    <ellipse cx="150" cy="357" rx="30" ry="4" fill="#E8E4DB"/>
    <ellipse cx="250" cy="354" rx="20" ry="6" fill="#E8E4DB"/>

    <!-- Pepernoten scattered - more of them in unique positions -->
    <ellipse cx="260" cy="320" rx="10" ry="8" fill="#8B4513"/>
    <ellipse cx="240" cy="338" rx="8" ry="6" fill="#8B4513"/>
    <ellipse cx="278" cy="342" rx="9" ry="7" fill="#8B4513"/>
    <ellipse cx="8" cy="345" rx="7" ry="5" fill="#8B4513"/>
    <ellipse cx="25" cy="200" rx="8" ry="6" fill="#8B4513"/>
    <ellipse cx="42" cy="175" rx="6" ry="5" fill="#8B4513"/>
    <ellipse cx="288" cy="200" rx="7" ry="5" fill="#8B4513"/>
    <ellipse cx="275" cy="240" rx="8" ry="6" fill="#8B4513"/>
    <ellipse cx="15" cy="260" rx="6" ry="5" fill="#8B4513"/>

    <!-- Small present boxes scattered -->
    <rect x="275" cy="280" width="15" height="12" fill="#439F47"/>
    <rect x="275" y="284" width="15" height="3" fill="#F4F1E8"/>
    <rect x="281" y="280" width="3" height="12" fill="#F4F1E8"/>

    <rect x="8" y="310" width="12" height="10" fill="#9B59B6"/>
    <rect x="8" y="313" width="12" height="2" fill="#F7E96B"/>
    <rect x="13" y="310" width="2" height="10" fill="#F7E96B"/>

    <!-- Gift bag - green -->
    <path d="M 200 200 Q 180 210 175 280 L 175 340 Q 175 355 190 355 L 250 355 Q 265 355 265 340 L 265 260 Q 260 200 230 195 Q 210 190 200 200 Z" fill="#439F47"/>
    <ellipse cx="215" cy="205" rx="25" ry="10" fill="#2d6b30"/>
    <!-- Presents peeking out of bag -->
    <rect x="190" y="180" width="20" height="25" fill="#C94343"/>
    <rect x="215" y="175" width="18" height="30" fill="#F7931E"/>
    <rect x="195" y="185" width="20" height="5" fill="#F4F1E8"/>
    <rect x="203" y="180" width="5" height="25" fill="#F4F1E8"/>
    <rect x="220" y="185" width="10" height="3" fill="#F4F1E8"/>
    <!-- Bag pattern -->
    <circle cx="200" cy="270" r="8" fill="#2d6b30" opacity="0.5"/>
    <circle cx="230" cy="300" r="10" fill="#2d6b30" opacity="0.5"/>
    <circle cx="190" cy="320" r="6" fill="#2d6b30" opacity="0.5"/>

    <!-- Staff -->
    <rect x="60" y="100" width="12" height="220" fill="#F7931E" rx="3"/>
    <!-- Staff curl/crook -->
    <path d="M 66 100 Q 66 60 100 60 Q 130 60 130 90 Q 130 110 115 110 Q 100 110 100 95 Q 100 80 110 80" fill="none" stroke="#F7931E" stroke-width="12" stroke-linecap="round"/>
    <!-- Staff decoration -->
    <circle cx="66" cy="140" r="4" fill="#C94343"/>
    <circle cx="66" cy="180" r="4" fill="#C94343"/>
    <circle cx="66" cy="220" r="4" fill="#C94343"/>

    <!-- Sinterklaas body/robe - red -->
    <path d="M 90 170 Q 85 200 85 280 L 85 355 L 175 355 L 175 280 Q 175 200 165 170 Q 150 150 127 150 Q 100 150 90 170 Z" fill="#C94343"/>

    <!-- Robe decorations -->
    <circle cx="120" cy="290" r="5" fill="#a33636"/>
    <circle cx="140" cy="310" r="4" fill="#a33636"/>
    <circle cx="105" cy="320" r="4" fill="#a33636"/>

    <!-- White robe trim at bottom -->
    <rect x="85" y="340" width="90" height="15" fill="#F4F1E8"/>

    <!-- Hands -->
    <ellipse cx="85" cy="240" rx="15" ry="12" fill="#FFDAB9"/>
    <ellipse cx="175" cy="250" rx="15" ry="12" fill="#FFDAB9"/>

    <!-- Cape/cloak overlay -->
    <path d="M 95 170 Q 90 180 90 200 L 95 280 Q 127 260 160 280 L 165 200 Q 165 180 160 170 Q 127 160 95 170 Z" fill="#a33636"/>

    <!-- White collar/stole -->
    <path d="M 100 155 Q 127 145 155 155 L 155 180 Q 127 170 100 180 Z" fill="#F4F1E8"/>

    <!-- Face -->
    <ellipse cx="127" cy="110" rx="35" ry="40" fill="#FFDAB9"/>

    <!-- Beard - large and white -->
    <path d="M 92 115 Q 85 120 85 140 Q 85 180 100 200 Q 115 215 127 220 Q 140 215 155 200 Q 170 180 170 140 Q 170 120 163 115 Q 145 125 127 125 Q 110 125 92 115 Z" fill="#F4F1E8"/>

    <!-- Beard texture lines -->
    <path d="M 100 140 Q 105 160 100 180" stroke="#E8E4DB" stroke-width="2" fill="none"/>
    <path d="M 127 145 Q 127 170 127 200" stroke="#E8E4DB" stroke-width="2" fill="none"/>
    <path d="M 155 140 Q 150 160 155 180" stroke="#E8E4DB" stroke-width="2" fill="none"/>

    <!-- Mustache -->
    <path d="M 105 115 Q 115 125 127 120 Q 140 125 150 115 Q 145 130 127 130 Q 110 130 105 115 Z" fill="#E8E4DB"/>

    <!-- Eyes -->
    <ellipse cx="115" cy="100" rx="5" ry="6" fill="#1A1713"/>
    <ellipse cx="140" cy="100" rx="5" ry="6" fill="#1A1713"/>
    <!-- Eye highlights -->
    <circle cx="117" cy="98" r="2" fill="#F4F1E8"/>
    <circle cx="142" cy="98" r="2" fill="#F4F1E8"/>

    <!-- Eyebrows -->
    <path d="M 108 90 Q 115 87 122 90" stroke="#F4F1E8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 133 90 Q 140 87 147 90" stroke="#F4F1E8" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Nose -->
    <ellipse cx="127" cy="110" rx="6" ry="5" fill="#E8C4A0"/>

    <!-- Rosy cheeks -->
    <ellipse cx="100" cy="115" rx="8" ry="5" fill="#E8A0A0" opacity="0.5"/>
    <ellipse cx="155" cy="115" rx="8" ry="5" fill="#E8A0A0" opacity="0.5"/>

    <!-- Smile -->
    <path d="M 118 118 Q 127 123 137 118" stroke="#d4a574" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Mitre (bishop's hat) -->
    <path d="M 85 75 L 95 20 Q 127 5 160 20 L 170 75 Q 127 85 85 75 Z" fill="#F4F1E8"/>
    <!-- Mitre band -->
    <path d="M 85 75 Q 127 85 170 75 L 170 65 Q 127 75 85 65 Z" fill="#F7931E"/>
    <!-- Mitre cross -->
    <rect x="122" y="25" width="10" height="35" fill="#C94343"/>
    <rect x="110" y="35" width="35" height="10" fill="#C94343"/>
    <!-- Mitre jewel -->
    <circle cx="127" cy="55" r="5" fill="#F7E96B"/>

    <!-- Book in hand (Grote Boek) -->
    <rect x="155" y="230" width="35" height="45" fill="#8B0000" rx="2"/>
    <rect x="158" y="233" width="29" height="39" fill="#C94343" rx="1"/>
    <!-- Book spine -->
    <rect x="155" y="230" width="5" height="45" fill="#5c0000"/>
    <!-- Book pages/text lines -->
    <rect x="161" y="237" width="23" height="2" fill="#F4F1E8"/>
    <rect x="161" y="242" width="20" height="2" fill="#F4F1E8"/>
    <rect x="161" y="247" width="23" height="2" fill="#F4F1E8"/>
    <rect x="161" y="252" width="18" height="2" fill="#F4F1E8"/>
    <rect x="161" y="257" width="22" height="2" fill="#F4F1E8"/>
    <!-- Book bookmark -->
    <rect x="183" y="230" width="4" height="15" fill="#439F47"/>

    <!-- Falling pepernoot animation suggestion -->
    <ellipse cx="55" cy="140" rx="5" ry="4" fill="#8B4513"/>
    <ellipse cx="280" cy="170" rx="6" ry="5" fill="#8B4513"/>

    <!-- Decorative swirl near staff top -->
    <circle cx="95" cy="75" r="3" fill="#F7931E" opacity="0.7"/>
    <circle cx="88" cy="82" r="2" fill="#F7931E" opacity="0.5"/>
  </svg>`

  return `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Initialize pieces - all start in tray, shuffled order
function initializePieces() {
  const pieces = Array.from({ length: TOTAL_PIECES }, (_, i) => ({
    id: i,
    currentSlot: -1, // -1 means in tray
  }))
  return shuffleArray(pieces)
}

// Component to render a piece of the puzzle image
function PieceContent({ pieceId, svgDataUrl, size = PIECE_SIZE }) {
  const col = pieceId % GRID_COLS
  const row = Math.floor(pieceId / GRID_COLS)

  // Calculate background position to show correct portion
  const bgPosX = -(col * size)
  const bgPosY = -(row * size)

  return (
    <div
      className={styles.pieceImage}
      style={{
        backgroundImage: svgDataUrl,
        backgroundSize: `${GRID_COLS * size}px ${GRID_ROWS * size}px`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
        width: size,
        height: size,
      }}
      aria-hidden="true"
    />
  )
}

function Puzzle7() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const boardRef = useRef(null)

  // Generate SVG data URL once
  const svgDataUrl = useMemo(() => generateSvgDataUrl(), [])

  const [pieces, setPieces] = useState(initializePieces)
  const [dragState, setDragState] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)

  // Check for completion
  useEffect(() => {
    const allPlaced = pieces.every(p => p.currentSlot !== -1)
    const allCorrect = pieces.every(p => p.currentSlot === p.id)

    if (allPlaced && allCorrect && !isCompleted) {
      setIsCompleted(true)
      markPuzzleSolved(7, 'legpuzzel')
    }
  }, [pieces, isCompleted, markPuzzleSolved])

  // Get slot index from screen coordinates
  const getSlotAtPosition = useCallback((clientX, clientY) => {
    if (!boardRef.current) return null

    const boardRect = boardRef.current.getBoundingClientRect()
    const x = clientX - boardRect.left
    const y = clientY - boardRect.top

    // Check if within board bounds
    if (x < 0 || y < 0 || x >= boardRect.width || y >= boardRect.height) {
      return null
    }

    // Calculate slot based on grid
    const slotWidth = boardRect.width / GRID_COLS
    const slotHeight = boardRect.height / GRID_ROWS
    const col = Math.floor(x / slotWidth)
    const row = Math.floor(y / slotHeight)

    if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
      return row * GRID_COLS + col
    }
    return null
  }, [])

  // Start dragging a piece
  const handlePointerDown = useCallback((e, pieceId) => {
    if (isCompleted) return

    e.preventDefault()
    e.stopPropagation()

    // Set pointer capture for smooth dragging
    e.target.setPointerCapture(e.pointerId)

    setDragState({
      pieceId,
      pointerId: e.pointerId,
      currentX: e.clientX,
      currentY: e.clientY,
    })
  }, [isCompleted])

  // Move dragged piece
  const handlePointerMove = useCallback((e) => {
    if (!dragState || e.pointerId !== dragState.pointerId) return

    setDragState(prev => ({
      ...prev,
      currentX: e.clientX,
      currentY: e.clientY,
    }))
  }, [dragState])

  // Drop piece
  const handlePointerUp = useCallback((e) => {
    if (!dragState || e.pointerId !== dragState.pointerId) return

    const targetSlot = getSlotAtPosition(e.clientX, e.clientY)

    if (targetSlot !== null) {
      // Place piece in slot
      setPieces(prev => {
        const newPieces = prev.map(p => {
          if (p.id === dragState.pieceId) {
            // Move dragged piece to target slot
            return { ...p, currentSlot: targetSlot }
          }
          if (p.currentSlot === targetSlot) {
            // If slot was occupied, move that piece back to tray
            return { ...p, currentSlot: -1 }
          }
          return p
        })
        return newPieces
      })
    }
    // If dropped outside board, piece stays where it was (or goes back to tray if from tray)

    setDragState(null)
  }, [dragState, getSlotAtPosition])

  // Cancel drag on pointer cancel
  const handlePointerCancel = useCallback(() => {
    setDragState(null)
  }, [])

  // Get pieces in tray (not placed on board)
  const trayPieces = pieces.filter(p => p.currentSlot === -1 && p.id !== dragState?.pieceId)

  // Get piece at a specific slot
  const getPieceAtSlot = (slotIndex) => {
    if (dragState) {
      // If dragging, check if this piece is being dragged
      const piece = pieces.find(p => p.currentSlot === slotIndex && p.id !== dragState.pieceId)
      return piece
    }
    return pieces.find(p => p.currentSlot === slotIndex)
  }

  return (
    <div
      className={styles.puzzleContainer}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <h2 className={styles.title}>Puzzel 7: De Legpuzzel van Sint</h2>

      <p className={styles.instructions}>
        Sleep de puzzelstukjes naar de juiste plek om de afbeelding te voltooien!
      </p>

      <div className={styles.puzzleLayout}>
        {/* Piece tray - shuffled pieces not yet placed (left side) */}
        <div className={styles.pieceTray} role="region" aria-label="Puzzelstukjes">
          <p className={styles.trayLabel}>Puzzelstukjes:</p>
          <div className={styles.trayGrid}>
            {trayPieces.map(piece => (
              <div
                key={piece.id}
                className={styles.jigsawPiece}
                onPointerDown={(e) => handlePointerDown(e, piece.id)}
                role="button"
                aria-label={`Puzzelstukje ${piece.id + 1}`}
                tabIndex={0}
              >
                <PieceContent pieceId={piece.id} svgDataUrl={svgDataUrl} />
              </div>
            ))}
          </div>
        </div>

        {/* The puzzle board - 5x6 grid */}
        <div
          ref={boardRef}
          className={styles.jigsawBoard}
          role="grid"
          aria-label="Puzzelbord met 30 vakjes"
        >
          {Array.from({ length: TOTAL_PIECES }, (_, slotIndex) => {
            const pieceInSlot = getPieceAtSlot(slotIndex)
            const isDropTarget = dragState && !pieceInSlot

            return (
              <div
                key={slotIndex}
                className={`${styles.jigsawSlot} ${pieceInSlot ? styles.occupied : ''} ${isDropTarget ? styles.dropTarget : ''}`}
                role="gridcell"
                aria-label={`Vakje ${slotIndex + 1}`}
              >
                {pieceInSlot && (
                  <div
                    className={styles.jigsawPiece}
                    onPointerDown={(e) => handlePointerDown(e, pieceInSlot.id)}
                    role="button"
                    aria-label={`Puzzelstukje ${pieceInSlot.id + 1}`}
                    tabIndex={0}
                  >
                    <PieceContent pieceId={pieceInSlot.id} svgDataUrl={svgDataUrl} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Dragged piece overlay */}
      {dragState && (
        <div
          className={styles.draggedPiece}
          style={{
            left: dragState.currentX,
            top: dragState.currentY,
          }}
        >
          <PieceContent pieceId={dragState.pieceId} svgDataUrl={svgDataUrl} />
        </div>
      )}

      {/* Completion message */}
      {isCompleted && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>🎉</span>
            <p>Geweldig! Je hebt de puzzel voltooid!</p>
            <p className={styles.successHint}>Sinterklaas is trots op je!</p>
            <button
              className={styles.nextButton}
              onClick={() => navigate('/puzzle-8')}
            >
              Volgende Puzzel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Puzzle7
