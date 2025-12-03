import { createContext, useContext, useState, useEffect } from 'react'

const PuzzleProgressContext = createContext()

const STORAGE_KEY = 'puzzleProgress'

export function PuzzleProgressProvider({ children }) {
  const [solvedPuzzles, setSolvedPuzzles] = useState(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading puzzle progress:', error)
    }
    return {}
  })

  // Save to localStorage whenever solvedPuzzles changes
  useEffect(() => {
    try {
      // Only save if there's actual progress (not empty object)
      if (Object.keys(solvedPuzzles).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(solvedPuzzles))
      } else {
        // If empty, remove from localStorage
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Error saving puzzle progress:', error)
    }
  }, [solvedPuzzles])

  const markPuzzleSolved = (puzzleNumber, password) => {
    setSolvedPuzzles(prev => ({
      ...prev,
      [puzzleNumber]: {
        password,
        solvedAt: new Date().toISOString()
      }
    }))
  }

  const isPuzzleSolved = (puzzleNumber) => {
    return !!solvedPuzzles[puzzleNumber]
  }

  const getPuzzlePassword = (puzzleNumber) => {
    return solvedPuzzles[puzzleNumber]?.password || null
  }

  const getAllProgress = () => {
    return solvedPuzzles
  }

  const resetProgress = () => {
    // Clear state first
    setSolvedPuzzles({})
    // Explicitly remove from localStorage (useEffect will also handle this, but this ensures it's immediate)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error resetting puzzle progress:', error)
    }
  }

  const unlockAllPuzzles = () => {
    // Actual passwords from each puzzle implementation
    const puzzlePasswords = {
      1: 'pepernoot',
      2: 'rood-groen-turquoise-oranje',
      3: 'schaakmat',
      4: 'dak',
      5: 'de kados zijn verborgen',
      6: 'pakjesboot',
      7: 'potlood',
      8: 'queue',
      9: 'een been',
      10: '1006'
    }
    
    const allPuzzles = {}
    for (let i = 1; i <= 10; i++) {
      allPuzzles[i] = {
        password: puzzlePasswords[i],
        solvedAt: new Date().toISOString()
      }
    }
    setSolvedPuzzles(allPuzzles)
  }

  const canAccessPuzzle = (puzzleNumber) => {
    // Puzzle 1 is always accessible
    if (puzzleNumber === 1) return true
    
    // Check if previous puzzle is solved
    const previousPuzzle = puzzleNumber - 1
    return isPuzzleSolved(previousPuzzle)
  }

  const value = {
    solvedPuzzles,
    markPuzzleSolved,
    isPuzzleSolved,
    getPuzzlePassword,
    getAllProgress,
    resetProgress,
    unlockAllPuzzles,
    canAccessPuzzle
  }

  return (
    <PuzzleProgressContext.Provider value={value}>
      {children}
    </PuzzleProgressContext.Provider>
  )
}

export function usePuzzleProgress() {
  const context = useContext(PuzzleProgressContext)
  if (!context) {
    throw new Error('usePuzzleProgress must be used within PuzzleProgressProvider')
  }
  return context
}

