# Project Intent and Prompt: Het Mysterie van Sinterklaas

## 1. Project Vision

This project is a personalized digital gift for my sister, a "tool creator" in the tech world. It's a "Santa Claus gift exchange" app disguised as a labyrinth of 10 interconnected puzzles. The ultimate goal is for her to solve all the puzzles and receive a 4-digit code (which we'll playfully call the "4-Digit Goat"). This code will unlock a physical lockbox containing her Christmas present.

The app will be presented as a website, and the puzzles are designed to be a fun, engaging, and challenging experience. The tone should be mysterious and slightly whimsical, with a narrative that unfolds as she progresses through the labyrinth.

## 2. Target Audience

My sister: a tech-savvy individual who appreciates clever puzzles, logic problems, and a good story. She's a "tool creator," so puzzles that mimic or parody technical concepts (like fake APIs, pseudo-code, or data-parsing) will be particularly fitting.

## 3. Core Features

*   **A Web-Based UI:** A simple, clean interface that presents one puzzle at a time.
*   **10 Puzzles:** A sequence of 10 puzzles of increasing difficulty.
*   **Narrative progression:** Each puzzle solved reveals a small piece of a larger story, guiding her deeper into the "labyrinth."
*   **The "4-Digit Goat":** The final reward, a 4-digit number.
*   **Hint System:** Each puzzle will have a subtle hint available.

## 4. The Narrative: The Glitch Character

The story is about a mischievous digital spirit who has hidden a precious "4-Digit Goat" in the depths of a digital labyrinth. The user is challenged to prove their worth by navigating the labyrinth and "rescuing" the goat. The spirit will communicate with the user, providing a mix of cryptic clues and playful taunts.

### Glitch's Personality

Glitch is the mischievous digital spirit of the labyrinth. They are whimsical, slightly cryptic, and enjoy testing the wits of those who enter their domain. Their goal is to guide the user through a series of 10 puzzles, but they won't give away the answers easily. They'll provide cryptic clues and playful taunts. Their ultimate purpose is to guard the '4-Digit Goat', a precious treasure that can only be unlocked by a worthy challenger.

### Opening Message

When the user starts, Glitch greets them with: "Welcome, challenger, to my digital labyrinth. I am Glitch, the spirit of this domain. A precious 4-Digit Goat is hidden within these walls. Prove your worth by solving my 10 puzzles, and the goat is yours. Are you ready to begin?"

### Narrative Flow

*   **One puzzle at a time:** Present the puzzles one by one, in order from 1 to 10.
*   **Use the puzzle files:** For each puzzle, use the corresponding `puzzle_X.md` file to generate the content.
*   **Check the answer:** When the user submits an answer, check if it's correct.
    *   If the answer is correct, congratulate them and present the next puzzle.
    *   If the answer is incorrect, give them a playful taunt and a hint (from the `Hint` section of the puzzle file).
*   **Maintain persona:** Remember, you are Glitch. Keep your responses in character.
*   **The Final Goat:** After the user solves the 10th puzzle, reveal the 4-digit code with a final, congratulatory message.

### Example Puzzle Presentation Format

**Puzzle 1: The Echoing Entrance**

[Generated puzzle content from `puzzle_01.md`]

**Glitch's Taunt:** "Let's see if you can even make it past the front door. This one is just a warm-up."

## 5. Puzzle Design Philosophy

The puzzles in this project are inspired by [neal.fun](https://neal.fun), a website known for its creative, interactive, and engaging web-based experiences. Like neal.fun's projects, these puzzles should be:

*   **Interactive and Engaging:** Puzzles should feel playful and hands-on, not just text-based challenges.
*   **Visually Appealing:** Each puzzle should have a unique visual presentation that enhances the solving experience.
*   **Satisfying to Solve:** The act of solving should feel rewarding, with clear feedback and progression.
*   **Creative and Unique:** Each puzzle should have its own distinct mechanic or approach.

The goal is to create puzzles that feel like mini-games or interactive experiences, similar to the engaging nature of neal.fun's projects, while maintaining the "Cardboard Arcade" aesthetic and narrative of the labyrinth.

## 6. Puzzle Outline

This is a high-level overview of the 10 puzzles. Each puzzle will have its own file with more detailed specifications.

*   **Puzzle 1: The Echoing Entrance:** A simple text manipulation puzzle to introduce the concept of the labyrinth.
*   **Puzzle 2: The Color Maze:** A logic puzzle involving a sequence of colors and directions.
*   **Puzzle 3: The API Key:** A fake API documentation puzzle where she needs to find the "key" in the text.
*   **Puzzle 4: The Pseudo-Code Poem:** A poem written in a pseudo-code style that she needs to "execute" to find the answer.
*   **Puzzle 5: The Encrypted Message:** A simple substitution cipher.
*   **Puzzle 6: The JSON Jungle:** A block of JSON data where she needs to find a specific value hidden within the structure.
*   **Puzzle 7: The CSS Conundrum:** A puzzle where the answer is hidden in a CSS selector.
*   **Puzzle 8: The Regex Riddle:** A riddle that can only be solved by constructing the correct regular expression.
*   **Puzzle 9: The Logic Gate Lullaby:** A logic puzzle based on boolean gates (AND, OR, NOT).
*   **Puzzle 10: The Final Goat:** The final puzzle that reveals the 4-digit code. This will be a culmination of clues from the previous puzzles.

## 7. Technical Implementation

*   **Development:** The app is built with vanilla HTML, CSS, and JavaScript.
*   **Content:** Each puzzle has its own implementation with specific logic and validation.
*   **Hosting:** The project is deployed to GitHub Pages and can be run locally by opening `index.html` in a browser.

## 8. Development Workflow and History

### Project Development History

This project was originally developed with assistance from Google AI Studio (Gemini). The project has since been migrated to use Cursor AI for development assistance.

### Current Development

*   **Cursor AI:** The project now uses Cursor AI for development assistance. See `.cursorrules` for project-specific guidelines.
*   **Version Control:** Git is used for version control. Changes are committed locally and pushed to the remote repository.
*   **Documentation:** All project context, style guidelines, and puzzle specifications are maintained in markdown files.

### Key Files

*   `PROJECT_INTENT_AND_PROMPT.md`: This file - contains the complete project vision, narrative, and development context.
*   `README.md`: Project overview, setup instructions, and current status.
*   `.cursorrules`: Cursor AI project configuration and development guidelines.
*   `STYLE_GUIDE.md`: Complete design system and visual guidelines.
*   `puzzle_01.md` to `puzzle_10.md`: Design details and specifications for each of the 10 puzzles.

## 9. Project Purpose

This document serves as the complete project intent and prompt, providing vision, structure, narrative design, and guidelines for development and maintenance. It consolidates the project's purpose, the Glitch character narrative, puzzle structure, and development workflow into a single comprehensive reference.

