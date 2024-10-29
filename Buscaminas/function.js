let board = [];
    let firstClick = true;
    let mineCount = 0;
    let gameFinished = false;

    function startGame() {
        const difficulty = document.getElementById("difficulty").value.split("-");
        const rows = parseInt(difficulty[0].split("x")[0]);
        const cols = parseInt(difficulty[0].split("x")[1]);
        mineCount = parseInt(difficulty[1]);
        
        createBoard(rows, cols);
        firstClick = true;
    }

    function createBoard(rows, cols) {
        board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({
            isMine: false,
            isOpen: false,
            
            isFlagged: false,
            minesAround: 0
        })));

        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
        boardElement.style.gridTemplateRows = `repeat(${rows}, 30px)`;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", () => handleCellClick(i, j));
                cell.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    toggleFlag(i, j);
                });
                boardElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(row, col) {
    	if (!gameFinished){
			if (firstClick) {
		        placeMines(row, col);
		        firstClick = false;
		    }
		    
		    if (board[row][col].isFlagged || board[row][col].isOpen) return;

		    if (board[row][col].isMine) {
		        revealMines();
		        alert("¡Has perdido!");
		        gameFinished = true;
		    } else {
		        openCell(row, col);
		        checkWin();
		    }
    	}
        
    }

    function placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const row = Math.floor(Math.random() * board.length);
            const col = Math.floor(Math.random() * board[0].length);

            if (!board[row][col].isMine && !(row === excludeRow && col === excludeCol)) {
                board[row][col].isMine = true;
                minesPlaced++;
                updateMinesAround(row, col);
            }
        }
    }

    function updateMinesAround(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (isValidCell(newRow, newCol) && !board[newRow][newCol].isMine) {
                    board[newRow][newCol].minesAround++;
                }
            }
        }
    }

    function isValidCell(row, col) {
        return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
    }

    function openCell(row, col) {
        const cell = board[row][col];
        if (cell.isOpen || cell.isFlagged) return;

        cell.isOpen = true;
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add("open");
        if (cell.minesAround > 0) {
            cellElement.textContent = cell.minesAround;
        } else {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (isValidCell(newRow, newCol)) {
                        openCell(newRow, newCol);
                    }
                }
            }
        }
    }

    function toggleFlag(row, col) {
        const cell = board[row][col];
        if (cell.isOpen) return;

        cell.isFlagged = !cell.isFlagged;
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.toggle("flag");
        cellElement.textContent = cell.isFlagged ? "🚩" : "";
    }

    function revealMines() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j].isMine) {
                    const cellElement = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
                    cellElement.classList.add("mine");
                    cellElement.textContent = "💣";
                }
            }
        }
    }

    function checkWin() {
        let openedCells = 0;
        for (let row of board) {
            for (let cell of row) {
                if (cell.isOpen && !cell.isMine) openedCells++;
            }
        }
        if (openedCells === board.length * board[0].length - mineCount) {
            alert("¡Felicidades! Has ganado.");
        }
    }
