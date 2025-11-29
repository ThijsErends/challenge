document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer-input');
    const resultDiv = document.getElementById('result');
    const mainContent = document.querySelector('main');

    submitButton.addEventListener('click', () => {
        const answer = answerInput.value.trim().toLowerCase();
        if (answer === 'a bottle') {
            // Correct answer, display the final code
            mainContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved all the puzzles. The 4-digit code is 1006.</p>';
        } else {
            resultDiv.textContent = 'Incorrect. Try again.';
            resultDiv.style.color = 'red';
        }
    });
});
