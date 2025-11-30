# Puzzle 3: Sinterklaas's Royal Checkmate

## Puzzle Description

The user is presented with an interactive chess board where they must checkmate Sinterklaas (the black king) using Sinterklaas-themed chess pieces. The puzzle features a pre-set position where white (the player) can achieve checkmate in 2-3 moves. Players can interact with the board by clicking or dragging pieces to make moves. The puzzle automatically detects when checkmate is achieved and celebrates the victory before proceeding to the next puzzle.

## Inspiration & Theme

*   **Sinterklaas Theme:** Directly integrates Sinterklaas characters and elements as chess pieces:
    *   **King**: Sinterklaas (the player's king and the opponent to checkmate)
    *   **Queen**: Pakjesboot (the steamboat - powerful like the queen)
    *   **Rook**: Schoorsteen (chimney - moves straight like a chimney)
    *   **Bishop**: Zwarte Piet (moves diagonally, like climbing rooftops)
    *   **Knight**: Amerigo (Sinterklaas's horse - perfect for L-shaped moves)
    *   **Pawn**: Pepernoot (small helpers)
*   **Neal.fun Inspiration:** Combines "Interactive Games" (chess gameplay) with "Visual Puzzles" (recognizing piece types and planning moves). The interactive, hands-on nature aligns with neal.fun's engaging puzzle style.

## Design Notes

1.  **Chess Board**: 8x8 grid with alternating light (Paper White) and dark (brown) squares, following the Cardboard Arcade aesthetic with hard shadows and flat colors.
2.  **Piece Design**: Each piece is designed using pure CSS shapes to represent the Sinterklaas theme:
    *   Pieces use flat colors from the style guide
    *   Hard shadows (4px 4px 0px rgba(0, 0, 0, 0.25)) for depth
    *   Simple geometric shapes that are recognizable as chess pieces
    *   Wiggle animation on pieces to keep the world alive
    *   Color-coded base: Each piece has a circular base at the bottom - white pieces have a white base, black pieces have a black base, making it easy to distinguish between the two sides
3.  **Interaction**: 
    *   Click-to-move: Click a piece to select it, then click a destination square
    *   Drag-and-drop: Drag pieces to move them
    *   Visual feedback: Selected pieces are highlighted, available moves show green dots
    *   Illegal moves show error messages
    *   Success feedback: When a move puts the king in check, a success message appears. When checkmate is achieved, a celebration message is shown.
    *   Reset button: A "Herstart Puzzel" (Reset Puzzle) button allows players to restart from the beginning if they make a mistake
4.  **Starting Position**: A checkmate-in-2 puzzle position where white (player) can checkmate black's king in 2-3 moves. The position should be solvable but require some strategic thinking.
5.  **Checkmate Detection**: Automatically detects when checkmate is achieved using chess.js library. Shows success message and auto-navigates to next puzzle after 3 seconds.

## Expected Answer/Solution

The puzzle is solved when the player achieves checkmate against the black king (Sinterklaas). No text input is required - the puzzle automatically detects the checkmate condition.

## Hint

"De koning staat alleen, maar zijn verdedigers zijn zwak. Gebruik je krachtigste stukken om hem te omsingelen."
