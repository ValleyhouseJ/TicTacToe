//Sætter boardSize til valgfrit tal, board til et 2D-array med 'valgfrit tal x valgfrit tal' celler
// og currentPlayer til "X" som er den første spiller
const boardSize = 10;
//from metoden laver et nyt array fra et eksisterende array og i dette tilfælde laver den et nyt array fra et array af tomme strenge
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(""));
let currentPlayer = "X";

//Funktion til at oprette brættet ved at finde elementet i html"en og sætte grid-template-columns til
// at have lige så mange kolonner som boardSize og derefter iterere over hver celle og tilføje en eventlistener til
// at håndtere klik på cellen
function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
    boardElement.innerHTML = "";
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            cell.addEventListener("click", handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

//Funktion til at printe brættet ved at finde elementet i html"en og iterere over hver celle
// og sætte teksten til at være den samme som i board-arrayet
function printBoard() {
    const boardElement = document.getElementById("board");
    //forEach metoden kører en funktion for hvert element i et array
    boardElement.querySelectorAll(".cell").forEach(cell => {
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");
        cell.textContent = board[row][col];
    });
}

//Tjekker om spillet er vundet ved at tjekke om en række, kolonne eller diagonal er fyldt med
// den nuværende spiller og returnere true hvis det er
function checkWin() {
    const size = board.length;
    for (let i = 0; i < size; i++) {
        //every metoden tjekker om alle elementer i et array opfylder en betingelse
        if (board[i].every(cell => cell === currentPlayer)) return true;
        if (board.every(row => row[i] === currentPlayer)) return true;
    }
    if (board.every((row, idx) => row[idx] === currentPlayer)) return true;
    if (board.every((row, idx) => row[size - 1 - idx] === currentPlayer)) return true;
    return false;
}

//Tjekker om spillet er uafgjort ved at tjekke om alle celler er udfyldt og returnere true hvis det er
function checkDraw() {
    //flat metoden laver et array med alle elementer fra et subarray
    return board.flat().every(cell => cell !== "");
}

//Funktion til at lave et træk ved at tjekke om cellen er tom og hvis den er,
// sætte den til den nuværende spiller og returnere true, ellers returnere false
function makeMove(row, col) {
    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        return true;
    }
    return false;
}

//Funktion til at skifte spiller ved at tjekke om den nuværende spiller er "X" og hvis det er,
// sætte den til "O" og ellers sætte den til "X" og derefter kalde updateCurrentPlayerDisplay for
// at opdatere beskeden om hvem der er den nuværende spiller
function nextPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateCurrentPlayerDisplay();
}

//Funktion til at håndtere klik på cellen ved at finde række og kolonne og derefter kalde makeMove
// og hvis det er true, kalde printBoard og derefter tjekke om spillet er vundet og hvis det er,
// skrive en besked og fjerne eventlisteners fra cellerne
function handleCellClick(event) {
    const row = event.target.getAttribute("data-row");
    const col = event.target.getAttribute("data-col");
    if (makeMove(row, col)) {
        printBoard();
        if (checkWin()) {
            document.getElementById("message").textContent = `Spiller ${currentPlayer} har vundet!`;
            document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleCellClick));
        } else if (checkDraw()) {
            document.getElementById("message").textContent = "Spilet er uafgjort!";
        } else {
            nextPlayer();
        }
    }
}

//Funktion til at nulstille brættet ved at sætte alle celler til tomme og sætte den nuværende spiller til "X"
// og derefter kalde createBoard og printBoard for at initialisere spillet
function resetBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(""));
    currentPlayer = "X";
    document.getElementById("message").textContent = "";
    createBoard();
    printBoard();
    updateCurrentPlayerDisplay();
}

//Funktion til at opdatere beskeden om hvem der er den nuværende spiller
function updateCurrentPlayerDisplay() {
    document.getElementById("currentPlayer").textContent = `Current Player: ${currentPlayer}`;
}

//Tilføjer en eventlistener til reset-knappen og kalder resetBoard-funktionen
// og kalder createBoard og printBoard for at initialisere spillet
document.getElementById("resetButton").addEventListener("click", resetBoard);
createBoard();
printBoard();
updateCurrentPlayerDisplay();