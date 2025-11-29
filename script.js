document.addEventListener('DOMContentLoaded', () => {
    const puzzleContent = document.querySelector('main');

    function loadPuzzle(puzzle) {
        puzzleContent.innerHTML = `
            <h2>${puzzle.title}</h2>
            <p>${puzzle.riddle}</p>
            <input type="text" id="answer-input">
            <button id="submit-button">Submit</button>
            <div id="result"></div>
        `;

        const submitButton = document.getElementById('submit-button');
        const answerInput = document.getElementById('answer-input');
        const resultDiv = document.getElementById('result');

        const loadNextPuzzle = () => {
            currentPuzzleIndex++;
            if (currentPuzzleIndex < puzzles.length) {
                loadPuzzle(puzzles[currentPuzzleIndex]);
            } else {
                puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved all the puzzles.</p>';
            }
        };

        submitButton.addEventListener('click', () => {
            const answer = answerInput.value.trim().toLowerCase();
            if (answer === puzzle.answer) {
                puzzle.onSolve(puzzleContent, loadNextPuzzle);
            } else {
                resultDiv.textContent = 'Incorrect. Try again.';
                resultDiv.style.color = 'red';
            }
        });
    }

    loadPuzzle(puzzles[currentPuzzleIndex]);
});