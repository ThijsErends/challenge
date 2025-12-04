# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Het Mysterie van Sinterklaas" is a personalized digital puzzle challenge built as a web-based labyrinth of 10 interconnected puzzles. Users must solve puzzles sequentially to reveal a final 4-digit code (4728) that unlocks a physical treasure. The project features a distinctive "Cardboard Arcade" aesthetic inspired by South Park's construction paper animation style.

## Development Commands

### Local Development
```bash
npm install           # Install dependencies
npm run dev          # Start Vite dev server (typically http://localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### GitHub Pages Deployment
- Base path configuration: `vite.config.js` uses `/challenge/` for production builds, `/` for local dev
- Uses HashRouter for client-side routing compatibility with GitHub Pages
- Automatic deployment via GitHub Actions when pushing to `main` branch

## Architecture

### React + Vite Structure
- **Entry Point**: `index.html` → `src/main.jsx` (mounts React app with HashRouter)
- **Routing**: React Router with HashRouter for GitHub Pages compatibility
- **State Management**: React Context API via `PuzzleProgressContext` for tracking solved puzzles

### Key Architectural Patterns

#### Puzzle Progress System
All puzzle progress is managed through `src/contexts/PuzzleProgressContext.jsx`:
- **localStorage persistence**: Automatically saves/loads progress
- **Sequential unlocking**: Puzzles unlock only when previous puzzle is solved
- **Progress tracking**: Each solved puzzle stores password and timestamp
- **Dev utilities**: `unlockAllPuzzles()` and `resetProgress()` for testing

#### Component Hierarchy
```
main.jsx (HashRouter + PuzzleProgressProvider)
  └─ App.jsx (Routes)
      └─ Layout.jsx (Header with Dutch skyline, SidebarNavigation, Footer)
          └─ Puzzle Components (Puzzle1-10, LandingPage)
```

#### Puzzle Component Patterns

**Text-based puzzles (2-9)**: Use the reusable `PuzzleInput` component
- Props: `puzzleNumber`, `question`, `correctAnswer`, `nextPuzzle`
- Handles validation, progress tracking, and navigation automatically
- Example: `<PuzzleInput puzzleNumber={2} question="..." correctAnswer="rood-groen-turquoise-oranje" nextPuzzle={3} />`

**Interactive puzzles**: Custom implementations
- **Puzzle1**: Canvas-based circle drawing with React refs and touch support
- **Puzzle10**: Password vault finale - requires entering all 9 previous passwords to unlock a gift box animation that reveals the final 4-digit code

#### Navigation & Access Control
- `SidebarNavigation` shows all puzzles with visual progress indicators
- `canAccessPuzzle(n)` enforces sequential access (puzzle N requires puzzle N-1 solved)
- Navigation uses React Router's `useNavigate()` hook
- Routes follow pattern: `/puzzle-1` through `/puzzle-10`, root `/` for landing page

### Styling Architecture

**"Cardboard Arcade" Design System** (see `STYLE_GUIDE.md` for full details):
- **CSS Modules**: Each component has its own `.module.css` file for scoped styles
- **Global Styles**: `src/index.css` defines CSS custom properties and shared animations
- **Color Palette**: Defined in `:root` as CSS variables (e.g., `--poofball-red: #C94343`)
- **Typography**: Google Fonts - "Permanent Marker" for headings, "Patrick Hand" for body
- **Animation System**: Three button states with keyframe animations
  - `slowWiggle`: Idle state (3s loop)
  - `fastWiggle`: Hover state (0.5s loop)
  - Active state: Scale down + shadow reduction for "squish" effect
- **Depth**: Hard shadows only (`box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.25)`) - no blur

### Data Organization
- `src/data/strings.js`: Centralized Dutch language strings for UI text
- `src/data/puzzleMetadata.js`: Puzzle metadata (titles, descriptions) for sidebar navigation
- Puzzle passwords hardcoded in `PuzzleProgressContext` for dev utility functions

## Visual Style Requirements

When modifying or creating components, maintain the "Cardboard Arcade" aesthetic:

1. **Flat Colors**: No gradients, only solid colors from the palette
2. **Hard Shadows**: Always use `box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.25)` for depth
3. **Animation**: All interactive elements must have the wiggle animation
4. **Typography**: Marker Black (#1A1713) on light backgrounds, Paper White (#F4F1E8) on dark
5. **Construction Paper Feel**: Simulate cut-out paper with layered elements

### Color Palette (CSS Variables)
- `--kraft-brown`: Background (#C4A484)
- `--poofball-red`: Primary action (#C94343)
- `--ushanka-green`: Secondary action (#439F47)
- `--teal-toque`: Accent (#2AB7CA)
- `--parka-orange`: Warning/contrast (#F7931E)
- Additional puzzle-specific colors defined in `:root`

## Accessibility Features

- Skip link for keyboard navigation
- ARIA labels on inputs and buttons
- `role` attributes on semantic elements
- Focus-visible indicators (4px dashed outline)
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`
- `ErrorBoundary` component wraps all routes for error handling

## Puzzle Answers (for development/testing)

1. pepernoot
2. rood-groen-turquoise-oranje
3. schaakmat
4. dak
5. de kados zijn verborgen
6. pakjesboot
7. legpuzzel
8. queue
9. schoorsteen
10. 4728 (final code - revealed after entering all 9 passwords)

## Important Notes

- All UI text is in Dutch
- Answer validation is case-insensitive and trimmed
- Each puzzle must call `markPuzzleSolved(puzzleNumber, password)` before navigation
- Puzzle 1 is always accessible; others require previous puzzle completion
- Layout header includes animated Dutch rooftop skyline with Sinterklaas on horseback
- Error messages use `STRINGS.common.incorrect` from strings.js
