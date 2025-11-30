document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer-input');
    const resultDiv = document.getElementById('result');

    submitButton.addEventListener('click', () => {
        const answer = answerInput.value.trim().toLowerCase();
        if (answer === 'potlood') {
            // Correct answer, redirect to the next puzzle
            window.location.href = '../puzzle-8/index.html';
        } else {
            resultDiv.textContent = 'Onjuist. Probeer opnieuw.';
            resultDiv.style.color = 'red';
        }
    });
});
