# Het Mysterie van Sinterklaas 🎅

A personalized digital puzzle challenge designed as a "Santa Claus gift exchange" experience. This web-based labyrinth consists of 10 interconnected puzzles that must be solved to reveal a final 4-digit code, unlocking a physical treasure.

## 🎨 Visual Style: "The Cardboard Arcade"

The project features a unique **"Cardboard Arcade"** aesthetic:
*   **Handmade Feel:** Everything looks like flat colored construction paper cut out with scissors.
*   **Typography:** Marker-style headings (Permanent Marker) and handwritten body text (Patrick Hand).
*   **Animation:** Buttons and elements have a playful "wiggle" to keep the world alive.
*   **No Textures:** Depth is achieved purely through flat colors and hard, crisp shadows.
*   **Color Palette:** Kraft brown background, with Poofball Red, Ushanka Green, Teal Toque, and Parka Orange accents.

For detailed style guidelines, see `STYLE_GUIDE.md`.

## 🧩 The Challenge

The puzzles in this project are inspired by [neal.fun](https://neal.fun), known for creative, interactive web experiences. Each puzzle is designed to be engaging, visually appealing, and satisfying to solve.

The user starts at the landing page and must navigate through:
1.  **10 Unique Puzzles:** Ranging from interactive drawing challenges to riddles and logic games.
2.  **Sequential Progression:** Solving one puzzle unlocks the next.
3.  **The Final Reward:** A 4-digit code (The "Goat") to open the real-world gift.

## 🛠️ Tech Stack

*   **React:** Component-based UI framework for interactive puzzles.
*   **Vite:** Fast build tool and development server.
*   **React Router:** Client-side routing for navigation between puzzles.
*   **CSS3:** Custom variables, animations, and layout (no CSS frameworks).
*   **GitHub Pages:** Automated deployment via GitHub Actions.

## 📁 Project Structure

```
challenge/
├── index.html              # Vite entry point
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main app component with routing
│   ├── index.css            # Global styles
│   └── components/
│       ├── Layout.jsx       # Shared layout component
│       ├── LandingPage.jsx  # Landing page component
│       ├── Puzzle1.jsx     # Interactive circle drawing puzzle
│       ├── Puzzle2-9.jsx   # Text-based puzzles
│       ├── Puzzle10.jsx    # Final puzzle (reveals 4-digit code)
│       └── PuzzleInput.jsx # Reusable puzzle input component
├── README.md               # This file
├── PROJECT_CONTEXT.md      # Project vision and context
├── STYLE_GUIDE.md          # Detailed design guidelines
├── .cursorrules            # Cursor AI project rules
└── puzzle_*.md             # Puzzle design documents
```

## 🚀 How to Run

### Local Development
1.  Clone the repository:
    ```bash
    git clone https://github.com/ThijsErends/challenge.git
    cd challenge
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### Building for Production
To build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Development Guidelines
- Each puzzle follows a consistent pattern: input → validation → redirect
- Puzzle 1 has unique canvas-based drawing functionality
- All puzzles use Dutch language for UI text
- Maintain the "Cardboard Arcade" aesthetic in all new features
- See `.cursorrules` for detailed development guidelines

### Deployment
The project is automatically deployed to GitHub Pages upon pushing to the `main` branch.

## 📝 Documentation

- **PROJECT_INTENT_AND_PROMPT.md:** Complete project vision, narrative, and development context
- **PUZZLE_INSPIRATION.md:** Puzzle design inspiration from neal.fun with mechanics and patterns
- **STYLE_GUIDE.md:** Complete design system and visual guidelines
- **.cursorrules:** Cursor AI assistant configuration and project rules
- **puzzle_*.md:** Individual puzzle design documents and specifications

## 🎯 Current Status

- ✅ All 10 puzzles implemented and functional
- ✅ Sequential navigation working
- ✅ "Cardboard Arcade" styling applied consistently
- ✅ Responsive design with touch support
- ✅ Final 4-digit code revealed in Puzzle 10
