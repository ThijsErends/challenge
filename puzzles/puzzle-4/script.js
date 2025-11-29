document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer-input');
    const resultDiv = document.getElementById('result');

    submitButton.addEventListener('click', () => {
        const answer = answerInput.value.trim().toLowerCase();
        if (answer === 'a needle') {
            // Correct answer, redirect to the next puzzle
            window.location.href = '../puzzle-5/index.html';
        } else {
            resultDiv.textContent = 'Incorrect. Try again.';
            resultDiv.style.color = 'red';
        }
    });
});
