window.addEventListener("DOMContentLoaded", (event) => {
  // GET ALL ELEMENTS
  let statusMessage = document.getElementById("status-msg");
  let cells = document.querySelectorAll(".cell");
  let restartBtn = document.getElementById("restartBtn");
  let quitBtn = document.getElementById("quitBtn");

  // SET GAME CONDITIONS
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let options = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameRunning = false;

  startGame();

  // DEFINE FUNCTIONS
  function startGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.removeEventListener("click", cellClicked);
      cell.addEventListener("click", cellClicked, { once: true });
      restartBtn.setAttribute("disabled", "");
      quitBtn.removeAttribute("disabled");
      quitBtn.addEventListener("click", quitGame);
    });
    statusMessage.textContent = "";
    gameRunning = true;
  }

  function cellClicked(event) {
    let cell = event.target;
    let cellIndex = cell.getAttribute("index");

    if (options[cellIndex] != "" || !gameRunning) {
      return;
    }

    updateCell(cell, cellIndex);
    checkWinner();
  }

  function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      let cell1 = options[condition[0]];
      let cell2 = options[condition[1]];
      let cell3 = options[condition[2]];

      if (cell1 === "" || cell2 === "" || cell3 === "") {
        continue;
      }

      if (cell1 === cell2 && cell2 === cell3) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      restartBtn.removeAttribute("disabled");
      restartBtn.addEventListener("click", startGame);
      quitBtn.setAttribute("disabled", "");
      statusMessage.textContent = `Winner: ${currentPlayer}`;
      gameRunning = false;
    } else if (!options.includes("")) {
      restartBtn.removeAttribute("disabled");
      restartBtn.addEventListener("click", startGame);
      quitBtn.setAttribute("disabled", "");
      statusMessage.textContent = `Winner: None`;
      gameRunning = false;
    } else {
      changePlayer();
    }
  }

  function quitGame() {
    gameRunning = false;
    winner = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Winner: ${winner}`;
    quitBtn.setAttribute("disabled", "");
    restartBtn.removeAttribute("disabled");
    restartBtn.addEventListener("click", startGame);
  }
});
