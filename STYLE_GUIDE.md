# STYLE GUIDE: "The Cardboard Arcade"

## 1. Core Design Philosophy
The entire website should feel like a handmade diorama. There are no smooth digital gradients or realistic textures. Everything is made of flat colored construction paper, cut out with scissors (slightly imperfect edges), and layered to create depth. Buttons and titles look like they were drawn with thick black markers on pieces of cardboard. The world is alive, constantly wiggling with playful energy.

## 2. Color Palette ("Construction Paper Pack")
These colors are flat. No gradients. They should look like physical colored paper.

### The Foundation:

*   **Kraft Paper Brown (Background):** `#C4A484` (A flat, warm paper-bag brown. Used for the main website background container.)

### The "Cartman & Kyle" Core Accents:

*   **Poofball Red (Primary Action):** `#C94343` (A slightly desaturated, deep red. Used for main buttons, important highlights.)
*   **Ushanka Green (Secondary Action):** `#439F47` (A distinct forest/kelly green. Used for secondary buttons, success states, positive puzzle elements.)
*   **Teal Toque (Accent 1):** `#2AB7CA` (A bright cyan/teal. Used for special puzzle pieces, links, ice elements.)
*   **Parka Orange (Accent 2):** `#F7931E` (A bright, safety orange. Used for warnings, playful contrasts, fire elements.)

### Typography & Outlines:

*   **Marker Black:** `#1A1713` (Not pure black. A very dark charcoal, like a dried Sharpie marker.)
*   **Paper White:** `#F4F1E8` (An off-white/cream color for text inside dark buttons, or paper elements sitting on brown backgrounds.)

## 3. Depth & Layering ("The Cutout Effect")
Depth is crucial to the tactile feel. Since we aren't using textures, depth is achieved entirely through hard, non-blurred shadows that simulate layers of paper stacked on top of each other.

**The Layering Rule:** Any element that sits on top of another must have a "hard shadow" to show it is a separate cutout piece of paper.

### CSS Reference (Hard Shadow):

```css
/* The shadow should be sharp, dark, and offset downward and to the right */
box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.25);
```
Note for AI: Do not use soft, blurred drop shadows. The shadow edges must be crisp.

## 4. Typography ("Markers & Notes")
### Headlines (The Marker Style):
Titles should look hand-drawn with a thick, chisel-tip permanent marker.

**Suggested Font:** "Permanent Marker" (Google Font) or similar.

**Color:** Marker Black (`#1A1713`).

### Body Text (The Playful Hand):
Readable enough for puzzle instructions, but still handmade. It should look like neat handwriting on note paper.

**Suggested Font:** "Patrick Hand" (Google Font) or a clean, rounded comic-style font.

**Color:** Marker Black (`#1A1713`) for light backgrounds, Paper White (`#F4F1E8`) for dark backgrounds.

## 5. UI Components & Buttons ("Cardboard Controls")
Buttons should feel chunky, tactile, and "sketchy."

### Button Structure:

*   **The Container:** A rectangular shape made of one of the core accent colors (Red or Green).
*   **The Outline:** A thick, sketchy "Marker Black" border. Ideally, the border isn't perfectly straight—it has slight variations in thickness or waviness to simulate a hand-drawn line.
    *   CSS simplified simulation: `border: 4px solid #1A1713;` (AI can perhaps generate SVG borders for a truly sketchy look).
*   **The Depth:** Apply the "Hard Shadow" defined in Section 3.
*   **The Text:** Marker style font, uppercase, in Paper White.

### Button States & Animation:
The interface must always be moving.

*   **State: IDLE (Default)**
    *   **Visual:** The button sits there with its hard shadow.
    *   **Animation:** A slow, constant, low-energy wiggle. It looks like it's floating slightly in a breeze.
    *   **CSS Ref:** `animation: slowWiggle 3s ease-in-out infinite;`

*   **State: HOVER (Mouse Over)**
    *   **Visual:** The cursor turns into a cartoon hand.
    *   **Animation:** The wiggle intensifies rapidly. It looks excited to be clicked.
    *   **CSS Ref:** `animation: fastWiggle 0.5s linear infinite;`

*   **State: ACTIVE (Click/Press)**
    *   **Visual:** The "squish." The button physically depresses.
    *   **Animation:** The hard shadow disappears (or gets very small), and the button scales down slightly to feel like it's being pushed into the cardboard background.
    *   **CSS Ref:** `transform: scale(0.95); box-shadow: 1px 1px 0px rgba(0,0,0,0.25);`

## 6. Iconography & Art Style ("South Park Flat")
Art assets (puzzle pieces, characters, decorative icons) should mimic the South Park production method.

### Art Rules:

*   **Construction Paper Construction:** Objects are built from simple geometric shapes of flat color stacked on top of each other.
*   **No Outlines on Art:** Unlike the buttons, general art assets (like a tree, a puzzle gem, or a character) should generally not have thick black outlines. They are defined by their flat color shapes against other colors.
*   **Imperfect Cuts:** Edges shouldn't be perfectly vector-smooth. They should have slight imperfections, suggesting scissors were used.
*   **Simple Faces:** If characters exist, use the distinct South Park style: large oval white eyes that touch each other, tiny black dot pupils, and simple flapping mouths for talking.

## 7. Environment & Atmosphere
To enhance the "lots of movement" requirement, the background shouldn't just be static brown paper.

### Background Movement Elements:
Slowly floating across the brown background layer should be subtle cutout elements. These should be low-contrast so they don't distract from the puzzle.

**Examples:** Little tan-colored paper clouds, faint cutout star shapes, or gear shapes drifting lazily across the screen.
