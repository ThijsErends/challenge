import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chess } from 'chess.js'
import { usePuzzleProgress } from '../contexts/PuzzleProgressContext'
import styles from './Puzzle3.module.css'

function Puzzle3() {
  const navigate = useNavigate()
  const { markPuzzleSolved } = usePuzzleProgress()
  const [chess] = useState(() => {
    const game = new Chess()
    // Set up a checkmate-in-2 position
    // White to move, can checkmate in 2 moves
    // Position: White Queen on d1, Rook on a1, King on e1
    // Black King on h8, needs to be checkmated
    // This is a classic checkmate puzzle position
    game.load('r5k1/5ppp/8/8/8/8/3Q1PPP/R3K2R w KQ - 0 1')
    return game
  })
  
  const [board, setBoard] = useState(chess.board())
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [availableMoves, setAvailableMoves] = useState([])
  const [isCheckmate, setIsCheckmate] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [dragOverSquare, setDragOverSquare] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [initialPosition] = useState(() => {
    const game = new Chess()
    game.load('r5k1/5ppp/8/8/8/8/3Q1PPP/R3K2R w KQ - 0 1')
    return game.fen()
  })
  const boardRef = useRef(null)

  useEffect(() => {
    setBoard(chess.board())
    if (chess.isCheckmate()) {
      setIsCheckmate(true)
      setIsCompleted(true)
      markPuzzleSolved(3, 'schaakmat')
    }
  }, [chess, markPuzzleSolved])

  const getSquareFromPosition = (row, col) => {
    const files = 'abcdefgh'
    const ranks = '87654321'
    return `${files[col]}${ranks[row]}`
  }

  const getPositionFromSquare = (square) => {
    const files = 'abcdefgh'
    const ranks = '87654321'
    const col = files.indexOf(square[0])
    const row = ranks.indexOf(square[1])
    return { row, col }
  }

  const handleSquareClick = (row, col) => {
    const square = getSquareFromPosition(row, col)
    const piece = board[row][col]

    // If clicking on a selected square, deselect
    if (selectedSquare === square) {
      setSelectedSquare(null)
      setAvailableMoves([])
      return
    }

    // If clicking on a piece of the current player's color
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(square)
      const moves = chess.moves({ square, verbose: true })
      setAvailableMoves(moves.map(m => m.to))
      setErrorMessage('')
      return
    }

    // If a square is selected and clicking on a valid move square
    if (selectedSquare) {
      try {
        const move = chess.move({
          from: selectedSquare,
          to: square,
        })
        
        if (move) {
          setBoard(chess.board())
          setSelectedSquare(null)
          setAvailableMoves([])
          setErrorMessage('')
          checkMoveFeedback()
        }
      } catch (e) {
        setErrorMessage('Ongeldige zet!')
        setTimeout(() => setErrorMessage(''), 2000)
      }
    }
  }

  const handleDragStart = (e, row, col) => {
    const square = getSquareFromPosition(row, col)
    const piece = board[row][col]
    
    if (piece && piece.color === chess.turn()) {
      setDraggedPiece({ square, row, col, piece })
      setSelectedSquare(square)
      const moves = chess.moves({ square, verbose: true })
      setAvailableMoves(moves.map(m => m.to))
      e.dataTransfer.effectAllowed = 'move'
    } else {
      e.preventDefault()
    }
  }

  const handleDragOver = (e, row, col) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    const square = getSquareFromPosition(row, col)
    setDragOverSquare(square)
  }

  const handleDrop = (e, row, col) => {
    e.preventDefault()
    const targetSquare = getSquareFromPosition(row, col)
    
    if (draggedPiece) {
      try {
        const move = chess.move({
          from: draggedPiece.square,
          to: targetSquare,
        })
        
        if (move) {
          setBoard(chess.board())
          setSelectedSquare(null)
          setAvailableMoves([])
          setErrorMessage('')
          checkMoveFeedback()
        }
      } catch (e) {
        setErrorMessage('Ongeldige zet!')
        setTimeout(() => setErrorMessage(''), 2000)
      }
    }
    
    setDraggedPiece(null)
    setDragOverSquare(null)
  }

  const handleDragEnd = () => {
    setDraggedPiece(null)
    setDragOverSquare(null)
  }

  const handleNext = () => {
    navigate('/puzzle-4')
  }

  const handleReset = () => {
    chess.load(initialPosition)
    setBoard(chess.board())
    setSelectedSquare(null)
    setAvailableMoves([])
    setIsCheckmate(false)
    setIsCompleted(false)
    setErrorMessage('')
    setSuccessMessage('')
    // Note: Puzzle progress is not reset when resetting the puzzle
  }

  const checkMoveFeedback = () => {
    if (chess.isCheckmate()) {
      setSuccessMessage('Perfect! Schaakmat! Je hebt de juiste zet gedaan!')
      setIsCheckmate(true)
      setIsCompleted(true)
      markPuzzleSolved(3, 'schaakmat')
    } else if (chess.isCheck()) {
      setSuccessMessage('Goed gedaan! De koning staat in schaak!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      setSuccessMessage('')
    }
  }

  const getPieceTypeClass = (type) => {
    const typeMap = {
      'k': 'king',
      'q': 'queen',
      'r': 'rook',
      'b': 'bishop',
      'n': 'knight',
      'p': 'pawn'
    }
    return typeMap[type] || ''
  }

  const renderPiece = (piece, row, col) => {
    if (!piece) return null
    
    const square = getSquareFromPosition(row, col)
    const isSelected = selectedSquare === square
    const isDragging = draggedPiece?.square === square
    const pieceTypeClass = getPieceTypeClass(piece.type)
    
    const pieceClass = pieceTypeClass ? `${styles.piece} ${styles[pieceTypeClass]} ${styles[piece.color]}` : styles.piece
    
    return (
      <div
        className={`${pieceClass} ${isSelected ? styles.selected : ''} ${isDragging ? styles.dragging : ''}`}
        draggable={piece.color === chess.turn()}
        onDragStart={(e) => handleDragStart(e, row, col)}
        onDragEnd={handleDragEnd}
      >
        <div className={`${styles.pieceBase} ${piece.color === 'w' ? styles.whiteBase : styles.blackBase}`}></div>
        {piece.type === 'k' && <div className={styles.king}></div>}
        {piece.type === 'q' && <div className={styles.queen}></div>}
        {piece.type === 'r' && <div className={styles.rook}></div>}
        {piece.type === 'b' && <div className={styles.bishop}></div>}
        {piece.type === 'n' && <div className={styles.knight}></div>}
        {piece.type === 'p' && <div className={styles.pawn}></div>}
      </div>
    )
  }

  return (
    <div className={styles.puzzleContainer}>
      <h2 className={styles.title}>Puzzel 3: Sinterklaas's Koninklijke Schaakmat</h2>
      <p className={styles.instruction}>
        Zet Sinterklaas schaakmat! Gebruik je stukken om de zwarte koning (Sinterklaas) te verslaan.
      </p>
      
      {isCheckmate && (
        <div className={styles.checkmateMessage}>
          <p>Geweldig! Schaakmat! 🎉</p>
          <p>Je hebt Sinterklaas verslagen!</p>
          {isCompleted && (
            <button 
              onClick={handleNext}
              style={{ 
                marginTop: '1rem',
                background: 'var(--ushanka-green)'
              }}
            >
              Volgende Puzzel
            </button>
          )}
        </div>
      )}
      
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      
      {successMessage && !isCheckmate && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      
      <div className={styles.buttonContainer}>
        <button className={styles.resetButton} onClick={handleReset}>
          Herstart Puzzel
        </button>
      </div>
      
      <div className={styles.boardContainer} ref={boardRef}>
        <div className={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const square = getSquareFromPosition(rowIndex, colIndex)
              const isLight = (rowIndex + colIndex) % 2 === 0
              const isSelected = selectedSquare === square
              const canMove = availableMoves.includes(square)
              const isDragOver = dragOverSquare === square
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.square} ${isLight ? styles.light : styles.dark} ${isSelected ? styles.selectedSquare : ''} ${canMove ? styles.availableMove : ''} ${isDragOver ? styles.dragOver : ''}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
                  onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                >
                  {renderPiece(piece, rowIndex, colIndex)}
                </div>
              )
            })
          )}
        </div>
      </div>
      
      <div className={styles.legend}>
        <p className={styles.legendTitle}>Je Stukken:</p>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.king} ${styles.white}`}><div className={styles.king}></div></div>
            <span>Sinterklaas (Koning)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.queen} ${styles.white}`}><div className={styles.queen}></div></div>
            <span>Pakjesboot (Dame)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.rook} ${styles.white}`}><div className={styles.rook}></div></div>
            <span>Schoorsteen (Toren)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.bishop} ${styles.white}`}><div className={styles.bishop}></div></div>
            <span>Zwarte Piet (Loper)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.knight} ${styles.white}`}><div className={styles.knight}></div></div>
            <span>Amerigo (Paard)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.piece} ${styles.pawn} ${styles.white}`}><div className={styles.pawn}></div></div>
            <span>Pepernoot (Pion)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Puzzle3
