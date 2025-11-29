let currentPuzzleIndex = 0;

const puzzles = [
    {
        title: "Puzzle 1",
        riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        answer: "a map",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the first puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 2",
        riddle: "What is the next number in the sequence: 2, 4, 8, 16, ?",
        answer: "32",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the second puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 3",
        riddle: "A man is looking at a portrait. Someone asks him whose portrait he is looking at. He replies, \"Brothers and sisters I have none, but that man's father is my father's son.\" Who is in the portrait?",
        answer: "his son",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the third puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 4",
        riddle: "What has an eye, but cannot see?",
        answer: "a needle",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the fourth puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 5",
        riddle: "What is always in front of you but can't be seen?",
        answer: "the future",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the fifth puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 6",
        riddle: "What can you catch, but not throw?",
        answer: "a cold",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the sixth puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 7",
        riddle: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost everybody. What am I?",
        answer: "pencil lead",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the seventh puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 8",
        riddle: "What word is pronounced the same if you take away four of its five letters?",
        answer: "queue",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the eighth puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 9",
        riddle: "What has a bottom at the top?",
        answer: "a leg",
        onSolve: (puzzleContent, loadNextPuzzle) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved the ninth puzzle.</p><button id="next-puzzle-button">Next Puzzle</button>';
            const nextPuzzleButton = document.getElementById('next-puzzle-button');
            nextPuzzleButton.addEventListener('click', () => {
                loadNextPuzzle();
            });
        }
    },
    {
        title: "Puzzle 10",
        riddle: "I have a neck, but no head. I have a body, but no legs. I have a label, but no name. I am filled with a spirit, but I am not alive. What am I?<br><br>The 4-digit code is constructed as follows:<br>- The first digit is the number of the first puzzle.<br>- The second digit is the last digit of the number of the last puzzle.<br>- The third digit is the total number of puzzles, but take the last digit.<br>- The fourth digit is the number of letters in the answer to this riddle.",
        answer: "a bottle",
        onSolve: (puzzleContent) => {
            puzzleContent.innerHTML = '<h2>Congratulations!</h2><p>You have solved all the puzzles. The 4-digit code is 1006.</p>';
        }
    }
];
