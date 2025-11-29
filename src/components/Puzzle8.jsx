import PuzzleInput from './PuzzleInput'

function Puzzle8() {
  return (
    <PuzzleInput
      puzzleNumber={8}
      question="Welk woord wordt hetzelfde uitgesproken als je vier van de vijf letters weghaalt?"
      correctAnswer="queue"
      nextPuzzle={9}
    />
  )
}

export default Puzzle8

