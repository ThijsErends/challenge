# Puzzle 9 Implementation Plan: Sinterklaas's Naughty/Nice Decision Engine

## Overview
Transform Puzzle 9 from a simple text input placeholder into an interactive logic gate puzzle where users manipulate boolean inputs to achieve a "NICE" output, following the Sinterklaas theme and "Cardboard Arcade" visual style.

## Current State
- **File**: `src/components/Puzzle9.jsx`
- **Status**: Currently uses `PuzzleInput` component with placeholder content
- **Needs**: Complete custom implementation with interactive logic gates

## Design Requirements

### 1. Logic Circuit Structure
- **Inputs**: 4-5 boolean inputs representing Sinterklaas criteria:
  - `has_polished_shoes` (Has polished shoes?)
  - `wrote_wish_list` (Wrote wish list?)
  - `shared_pepernoten` (Shared pepernoten?)
  - `slept_through_night` (Slept through the night?)
  - `helped_zwarte_piet` (Helped Zwarte Piet?) - optional 5th input

- **Logic Gates**: At least 3-4 gates combining inputs:
  - Gate 1: AND gate (e.g., `has_polished_shoes AND wrote_wish_list`)
  - Gate 2: OR gate (e.g., `shared_pepernoten OR slept_through_night`)
  - Gate 3: NOT gate (e.g., `NOT (some condition)`)
  - Gate 4: Final AND/OR combining previous gates

- **Output**: Single boolean result determining "NICE" (TRUE) or "NAUGHTY" (FALSE)

### 2. Visual Design (Cardboard Arcade Style)

#### Input Switches
- Toggle switches styled as cardboard cutouts
- Each switch labeled with Dutch Sinterklaas criterion
- Visual feedback: TRUE = green (Ushanka Green), FALSE = red (Poofball Red)
- Hard shadows (4px 4px 0px rgba(0, 0, 0, 0.25))
- Wiggle animation on hover

#### Logic Gates
- Visual representation as cardboard boxes with labels:
  - AND gate: Rectangular box with "AND" label
  - OR gate: Rounded box with "OR" label  
  - NOT gate: Triangular box with "NOT" label
- Wires connecting inputs → gates → output (simple lines with hard shadows)
- Gates light up when their output is TRUE (green glow)
- Gates show FALSE state (red tint or dimmed)

#### Output Display
- Large, prominent "NICE" or "NAUGHTY" indicator
- "NICE" = Green background (Ushanka Green) with celebration animation
- "NAUGHTY" = Red background (Poofball Red)
- Hard shadow and wiggle animation
- When "NICE" is achieved, reveal the answer input field

### 3. User Interaction Flow

1. **Initial State**: 
   - All inputs set to FALSE (or predefined initial state)
   - Output shows "NAUGHTY"
   - Circuit diagram visible but inactive

2. **User Manipulation**:
   - Click toggles on input switches
   - Real-time calculation of gate outputs
   - Visual feedback as signals propagate through circuit
   - Output updates immediately

3. **Success State**:
   - When output becomes "NICE":
     - Celebration animation (confetti, wiggle, etc.)
     - Input field appears asking for the Sinterklaas-themed answer
     - Hint displayed: "Sinterklaas weighs every action, and his logic is always fair."

4. **Answer Validation**:
   - User enters answer (e.g., "Gift Delivered", "Well Behaved", "Amerigo's Approval")
   - On correct answer: Navigate to Puzzle 10
   - On incorrect answer: Show error message "Onjuist. Probeer opnieuw."

## Technical Implementation

### Component Structure

```jsx
Puzzle9.jsx
├── State Management
│   ├── inputStates: { [inputName]: boolean }
│   ├── gateOutputs: { [gateId]: boolean }
│   ├── finalOutput: boolean
│   ├── isCompleted: boolean
│   └── answer: string
│
├── Logic Functions
│   ├── calculateGateOutput(gateId, inputs)
│   ├── calculateFinalOutput()
│   └── validateAnswer(userAnswer)
│
├── UI Components
│   ├── InputSwitch (for each boolean input)
│   ├── LogicGate (AND, OR, NOT visual representation)
│   ├── Wire (connecting lines)
│   ├── OutputDisplay (NICE/NAUGHTY indicator)
│   └── AnswerInput (appears when NICE achieved)
│
└── Styling
    └── Puzzle9.module.css (Cardboard Arcade style)
```

### Logic Circuit Definition

**Example Circuit:**
```
Input A: has_polished_shoes
Input B: wrote_wish_list
Input C: shared_pepernoten
Input D: slept_through_night

Gate 1 (AND): A AND B → Output1
Gate 2 (OR): C OR D → Output2
Gate 3 (NOT): NOT Output2 → Output3
Gate 4 (AND): Output1 AND Output3 → Final Output

Final Output = TRUE → NICE
Final Output = FALSE → NAUGHTY
```

**Target Answer**: The Sinterklaas-themed phrase that appears when NICE is achieved.
- Suggested: "Gift Delivered" or "Well Behaved" or "Amerigo's Approval"
- To be determined based on final circuit design

### File Structure

```
src/components/
├── Puzzle9.jsx (main component)
└── Puzzle9.module.css (styling)
```

### CSS Module Requirements

- **Cardboard cutout styling** for all elements
- **Hard shadows** (4px 4px 0px rgba(0, 0, 0, 0.25))
- **Wiggle animations** (slowWiggle, fastWiggle)
- **Color variables** from :root (--ushanka-green, --poofball-red, etc.)
- **Typography**: Permanent Marker for headings, Patrick Hand for body
- **Imperfect border radius**: `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`
- **Wire connections**: Simple lines with hard shadows
- **Gate visualizations**: Flat colored shapes (no gradients)

## Implementation Steps

### Phase 1: Component Structure & State
1. Create `Puzzle9.jsx` with basic structure
2. Set up state management for inputs and outputs
3. Implement logic calculation functions
4. Add navigation hook (useNavigate)

### Phase 2: Visual Components
1. Create `InputSwitch` component (toggle switch)
2. Create `LogicGate` component (AND, OR, NOT visual)
3. Create `Wire` component (connecting lines)
4. Create `OutputDisplay` component (NICE/NAUGHTY)
5. Layout circuit diagram

### Phase 3: Styling
1. Create `Puzzle9.module.css`
2. Apply Cardboard Arcade styling
3. Add animations (wiggle, glow effects)
4. Implement hard shadows
5. Style input switches and gates

### Phase 4: Interaction & Logic
1. Connect input toggles to state
2. Implement real-time calculation
3. Add visual feedback (color changes, glows)
4. Wire up answer validation
5. Add success/error messaging

### Phase 5: Polish & Testing
1. Add celebration animation when NICE achieved
2. Test all input combinations
3. Verify answer validation
4. Ensure responsive design
5. Test navigation to Puzzle 10

## Answer Determination

The correct answer should be determined based on:
1. The logic circuit design
2. The Sinterklaas theme
3. The hint provided: "Sinterklaas weighs every action, and his logic is always fair."

**Recommended approach**: 
- Design the circuit first
- Determine what combination of inputs leads to NICE
- Choose an answer phrase that fits the theme
- Update puzzle_09.md with the exact answer

## Dependencies

- React hooks: `useState`, `useEffect`, `useNavigate`
- React Router: Already configured in App.jsx
- No external libraries needed (pure React + CSS)

## Testing Checklist

- [ ] All input switches toggle correctly
- [ ] Logic gates calculate outputs correctly
- [ ] Visual feedback updates in real-time
- [ ] Output changes from NAUGHTY to NICE when correct
- [ ] Answer input appears when NICE is achieved
- [ ] Correct answer navigates to Puzzle 10
- [ ] Incorrect answer shows error message
- [ ] Styling matches Cardboard Arcade theme
- [ ] Animations work smoothly
- [ ] Responsive on different screen sizes

## Notes

- Keep the puzzle challenging but solvable
- Ensure the logic circuit is visually clear
- Maintain consistency with other puzzles (Puzzle1, Puzzle2, Puzzle3)
- Follow the existing code patterns and structure
- Use Dutch text for UI elements (consistent with other puzzles)

