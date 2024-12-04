const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const leaderboard = document.getElementById('leaderboard');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let startTime = null;

// Nombre del juego en la API
const GAME_NAME = "tictactoeCesar";

// Inicializa la tabla de líderes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
});

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && !board[index]) {
            if (!startTime) {
                startTime = new Date();
            }
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            if (!gameOver) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                computerMove();
            }
        }
    });
});

function computerMove() {
    let emptyCells = board.map((value, index) => value === null ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomMove] = 'O';
        cells[randomMove].textContent = 'O';
        checkWinner();
        if (!gameOver) {
            currentPlayer = 'X';
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            result.textContent = `¡${board[a]} ha ganado!`;
            if (board[a] === 'X') {
                saveRecord();
            }
            return;
        }
    }

    if (board.every(cell => cell !== null)) {
        gameOver = true;
        result.textContent = '¡Es un empate!';
    }
}

function saveRecord() {
    let playerName = prompt('¡Ganaste! Introduce tu nombre:');
    if (playerName) {
        let endTime = new Date();
        let timeTaken = Math.round((endTime - startTime) / 1000 * 1000); // Convertir a milisegundos

        // Prepara los datos para la API
        const data = new URLSearchParams({
            player: playerName,
            score: timeTaken,
            game: GAME_NAME
        });

        // Enviar los datos a la API
        fetch('save_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                alert(result.message);
                loadLeaderboard(); // Actualiza la tabla de líderes
            } else {
                console.error(result.message);
            }
        })
        .catch(error => {
            console.error('Error al guardar el tiempo:', error);
        });
    }
}

function loadLeaderboard() {
    const url = `http://primosoft.com.mx/games/api/getscores.php?game=${encodeURIComponent(GAME_NAME)}&orderAsc=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                leaderboard.innerHTML = data.data.map(
                    score => `<li>${score.player}: ${score.score / 1000} segundos</li>`
                ).join('');
            } else {
                leaderboard.innerHTML = '<li>No hay tiempos registrados.</li>';
            }
        })
        .catch(error => {
            console.error('Error al obtener los tiempos:', error);
            leaderboard.innerHTML = '<li>Error al obtener los tiempos.</li>';
        });
}

