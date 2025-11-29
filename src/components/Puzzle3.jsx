import PuzzleInput from './PuzzleInput'

function Puzzle3() {
  return (
    <PuzzleInput
      puzzleNumber={3}
      question={'Een man kijkt naar een portret. Iemand vraagt hem naar welk portret hij kijkt. Hij antwoordt: "Broers en zussen heb ik geen, maar de vader van die man is de zoon van mijn vader." Wie staat er op het portret?'}
      correctAnswer="zijn zoon"
      nextPuzzle={4}
    />
  )
}

export default Puzzle3

