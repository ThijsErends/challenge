document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer-input');
    const resultDiv = document.getElementById('result');
    const mainContent = document.querySelector('main');

    submitButton.addEventListener('click', () => {
        const answer = answerInput.value.trim().toLowerCase();
        if (answer === 'een fles') {
            // Correct answer, display the final code
            mainContent.innerHTML = '<h2>Gefeliciteerd!</h2><p>Je hebt alle puzzels opgelost. De 4-cijferige code is 1006.</p>';
        } else {
            resultDiv.textContent = 'Onjuist. Probeer opnieuw.';
            resultDiv.style.color = 'red';
        }
    });
});
