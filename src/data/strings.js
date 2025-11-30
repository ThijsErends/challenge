/**
 * Centralized UI strings for the puzzle application
 * All user-facing text should be defined here for consistency and easy maintenance
 */

export const STRINGS = {
  // Common messages
  common: {
    incorrect: 'Onjuist. Probeer opnieuw.',
    correct: 'Correct!',
    submit: 'Indienen',
    check: 'Controleer',
    reset: 'Begin Opnieuw',
    next: 'Volgende Puzzel',
    loading: 'Laden...',
  },

  // Error messages
  errors: {
    generic: 'Er ging iets mis. Probeer het opnieuw.',
    selectFirst: 'Selecteer eerst een antwoord!',
    puzzleBroken: 'Deze puzzel werkt even niet mee. Geen zorgen, Piet is al bezig met de reparatie!',
    retry: 'Probeer Opnieuw',
    goHome: 'Terug naar Start',
  },

  // Navigation
  navigation: {
    puzzles: 'Puzzels',
    resetProgress: 'Reset Voortgang',
    resetConfirm: 'Weet je zeker dat je alle voortgang wilt resetten?',
    confirmYes: 'Ja, Reset',
    confirmNo: 'Annuleren',
    lockedHint: 'Los eerst de vorige puzzel op',
    solved: 'Opgelost',
    password: 'Wachtwoord:',
  },

  // Landing page
  landing: {
    welcome: 'Welkom!',
    intro: 'Ik ben Glitch, de geest van dit digitale labyrint. Een kostbare 4-Cijferige Code is verborgen binnen deze muren. Bewijs je waarde door mijn 10 puzzels op te lossen, en de geit is van jou.',
    question: 'Ben je klaar om te beginnen?',
    start: 'Start Uitdaging',
  },

  // Victory/completion
  victory: {
    congratulations: 'GEFELICITEERD!',
    subtitle: 'Je hebt het labyrint van Glitch overwonnen!',
    codeLabel: 'De 4-Cijferige Goat Code:',
    howItWorks: 'Hoe de code werkt:',
    journeyTitle: 'Je Reis',
    puzzlesSolved: 'Puzzels Opgelost',
    completed: 'Voltooid',
    goatEarned: 'Geit Verdiend',
    finalMessage: 'Uitstekend gedaan, puzzelmeester! Je hebt bewezen dat je scherp, geduldig en vastberaden bent. De geit is nu van jou!',
    signature: '— Glitch',
  },

  // Puzzle-specific
  puzzles: {
    hint: 'Hint nodig?',
    clue: 'Aanwijzing',
    clues: 'Aanwijzingen:',
    answer: 'Antwoord',
    typeAnswer: 'Typ je antwoord...',
    enterCode: 'Voer de code in...',
  },

  // Feedback messages
  feedback: {
    perfect: 'Perfect!',
    greatJob: 'Goed gedaan!',
    tryAgain: 'Probeer het opnieuw.',
    almostThere: 'Bijna goed!',
  },
}

// Helper function to get nested string by dot notation
export function getString(path, fallback = '') {
  const keys = path.split('.')
  let result = STRINGS
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      return fallback
    }
  }
  
  return typeof result === 'string' ? result : fallback
}

export default STRINGS

