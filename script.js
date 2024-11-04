const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? "x" : "o";
    const playerSymbol = isXTurn ? "X" : "O";

    if (cell.textContent !== "" || !gameActive) return;

    // Add player symbol with animation
    cell.classList.add(currentClass);
    cell.setAttribute("data-player", playerSymbol);

    if (checkWin(playerSymbol)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `Player ${isXTurn ? "X" : "O"}'s turn`;
    }
}

function checkWin(playerSymbol) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].getAttribute("data-player") === playerSymbol;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.getAttribute("data-player") !== null);
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        statusText.textContent = "It's a Draw!";
    } else {
        statusText.textContent = `Player ${isXTurn ? "X" : "O"} Wins!`;
    }
}

function restartGame() {
    isXTurn = true;
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.removeAttribute("data-player");
    });
    statusText.textContent = "Player X's turn";
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
