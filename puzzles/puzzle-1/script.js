document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer-input');
    const resultDiv = document.getElementById('result');

    // The reversed string of "SHADOWS HIDE THE TRUTH"
    const correctAnswer = "hturt eht edih swodahs";

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            // Success State
            resultDiv.textContent = "The cave echoes your truth. The path opens.";
            resultDiv.style.color = "var(--ushanka-green)";
            submitButton.style.backgroundColor = "var(--ushanka-green)";
            submitButton.textContent = "OPENING...";
            
            // Play a success animation on the input
            answerInput.style.borderColor = "var(--ushanka-green)";
            
            setTimeout(() => {
                window.location.href = '../puzzle-2/index.html';
            }, 2000);
        } else {
            // Failure State
            resultDiv.textContent = "The echo is distorted. Try again.";
            resultDiv.style.color = "var(--poofball-red)";
            
            // Shake animation
            answerInput.classList.add('shake');
            setTimeout(() => {
                answerInput.classList.remove('shake');
            }, 500);
        }
    }

    submitButton.addEventListener('click', checkAnswer);

    // Allow pressing Enter to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});