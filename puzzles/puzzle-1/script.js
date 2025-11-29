document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const resetButton = document.getElementById('reset-button');
    const checkButton = document.getElementById('check-button');
    const accuracyDisplay = document.getElementById('accuracy-display');
    const resultMessage = document.getElementById('result-message');
    const pepernootGraphic = document.getElementById('pepernoot-graphic');
    const drawingContainer = document.querySelector('.drawing-container');

    let isDrawing = false;
    let points = [];
    const minPoints = 20; // Minimum points to consider a valid drawing for accuracy calc

    // Drawing functionality
    function startDrawing(e) {
        isDrawing = true;
        points = [];
        resultMessage.textContent = '';
        pepernootGraphic.classList.remove('visible');
        clearCanvas();
        addPoint(e);
        e.preventDefault(); // Prevent scrolling on touch devices
    }

    function draw(e) {
        if (!isDrawing) return;
        addPoint(e);
        drawPath();
        e.preventDefault(); // Prevent scrolling on touch devices
    }

    function stopDrawing() {
        isDrawing = false;
        drawPath(); // Draw final path
    }

    function addPoint(e) {
        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (e.touches && e.touches.length > 0) { // Touch event
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else { // Mouse event
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        points.push({ x, y });
    }

    function drawPath() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear only drawing, not background
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = 'var(--marker-black)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
        accuracyDisplay.textContent = 'Accuraat: 0%';
        resultMessage.textContent = '';
        pepernootGraphic.classList.remove('visible');
        drawingContainer.classList.remove('shake'); // Ensure shake is removed on clear
    }

    // Event Listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing); // Stop drawing if mouse leaves canvas

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    // Puzzle Logic
    function calculateAccuracy() {
        if (points.length < minPoints) {
            resultMessage.textContent = 'Teken eerst een cirkel!';
            resultMessage.style.color = 'var(--poofball-red)';
            drawingContainer.classList.add('shake');
            setTimeout(() => drawingContainer.classList.remove('shake');, 500);
            return 0;
        }

        // Calculate centroid
        let sumX = 0;
        let sumY = 0;
        for (const p of points) {
            sumX += p.x;
            sumY += p.y;
        }
        const centerX = sumX / points.length;
        const centerY = sumY / points.length;

        // Calculate distances from centroid and average radius
        let distances = [];
        let sumDistances = 0;
        for (const p of points) {
            const dist = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
            distances.push(dist);
            sumDistances += dist;
        }
        const averageRadius = sumDistances / points.length;

        // Calculate max deviation from average radius
        let maxDeviation = 0;
        for (const dist of distances) {
            maxDeviation = Math.max(maxDeviation, Math.abs(dist - averageRadius));
        }

        // Neil.fun's algorithm is complex, this is a simplified heuristic:
        // Accuracy decreases as maxDeviation increases relative to averageRadius
        let accuracy = (1 - (maxDeviation / averageRadius)) * 100;
        accuracy = Math.max(0, Math.min(100, accuracy)); // Clamp between 0 and 100

        return accuracy;
    }

    function checkCircle() {
        const accuracy = calculateAccuracy();
        accuracyDisplay.textContent = `Accuraat: ${Math.round(accuracy)}%`;

        if (accuracy >= 80) {
            resultMessage.textContent = 'Perfect! Hier is de code voor de volgende puzzel: pepernoot';
            resultMessage.style.color = 'var(--ushanka-green)';
            pepernootGraphic.classList.add('visible');
            
            setTimeout(() => {
                window.location.href = '../puzzle-2/index.html'; // Redirect to next puzzle
            }, 3000);
        } else {
            resultMessage.textContent = 'Niet helemaal rond. Probeer het opnieuw, Piet!';
            resultMessage.style.color = 'var(--poofball-red)';
            drawingContainer.classList.add('shake');
            setTimeout(() => {
                drawingContainer.classList.remove('shake');
            }, 500);
        }
    }

    resetButton.addEventListener('click', clearCanvas);
    checkButton.addEventListener('click', checkCircle);

    // Initial clear
    clearCanvas();
});
