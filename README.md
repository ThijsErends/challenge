# The Labyrinth of the 4-Digit Goat 🐐

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

The user starts at the landing page and must navigate through:
1.  **10 Unique Puzzles:** Ranging from interactive drawing challenges to riddles and logic games.
2.  **Sequential Progression:** Solving one puzzle unlocks the next.
3.  **The Final Reward:** A 4-digit code (The "Goat") to open the real-world gift.

## 🛠️ Tech Stack

*   **HTML5:** Semantic structure for puzzles.
*   **CSS3:** Custom variables, animations, and layout (no frameworks).
*   **JavaScript:** Vanilla JS for logic, answer validation, and navigation.
*   **GitHub Pages:** Automated deployment via GitHub Actions.

## 📁 Project Structure

```
challenge/
├── index.html              # Landing page
├── style.css               # Global styles
├── README.md               # This file
├── PROJECT_CONTEXT.md      # Project vision and context
├── STYLE_GUIDE.md          # Detailed design guidelines
├── .cursorrules            # Cursor AI project rules
├── puzzle_*.md             # Puzzle design documents
└── puzzles/
    ├── puzzle-1/           # Interactive circle drawing puzzle
    ├── puzzle-2/           # Text-based puzzle
    ├── ...
    └── puzzle-10/          # Final puzzle (reveals 4-digit code)
        ├── index.html
        ├── script.js
        └── style.css
```

## 🚀 How to Run

### Local Development
1.  Clone the repository:
    ```bash
    git clone https://github.com/ThijsErends/challenge.git
    ```
2.  Open `index.html` in your web browser.
3.  No build process required - pure HTML/CSS/JS.

### Development Guidelines
- Each puzzle follows a consistent pattern: input → validation → redirect
- Puzzle 1 has unique canvas-based drawing functionality
- All puzzles use Dutch language for UI text
- Maintain the "Cardboard Arcade" aesthetic in all new features
- See `.cursorrules` for detailed development guidelines

### Deployment
The project is automatically deployed to GitHub Pages upon pushing to the `main` branch.

## 📝 Documentation

- **PROJECT_CONTEXT.md:** Project vision, target audience, and puzzle overview
- **STYLE_GUIDE.md:** Complete design system and visual guidelines
- **.cursorrules:** Cursor AI assistant configuration and project rules
- **puzzle_*.md:** Individual puzzle design documents and specifications

## 🎯 Current Status

- ✅ All 10 puzzles implemented and functional
- ✅ Sequential navigation working
- ✅ "Cardboard Arcade" styling applied consistently
- ✅ Responsive design with touch support
- ✅ Final 4-digit code revealed in Puzzle 10
