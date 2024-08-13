const GameBoard = function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  return { board };
};

const Player = function (playerName, symbol) {
  return { playerName, symbol };
};

const GameController = function () {
  const validateMove = (board, pos) => board[pos] === "";

  const makeMove = (board, pos, player) => {
    board[pos] = player.symbol;
  };

  const checkWin = (board, player) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => board[index] === player.symbol);
    });
  };

  return { validateMove, makeMove, checkWin };
};

const DisplayController = (function () {
  const cells = document.querySelectorAll(".cell");

  const renderBoard = (board) => {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const setupBoardListeners = (
    gameBoard,
    gameController,
    playerMoveCallback
  ) => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameController.validateMove(gameBoard.board, index)) {
          playerMoveCallback(index);
        }
      });
    });
  };

  const resetBoard = (resetCallback) => {
    const resetBtn = document.querySelector(".reset-btn");

    resetBtn.addEventListener("click", () => {
      cells.forEach((cell) => {
        cell.textContent = "";
      });
      resetCallback();
    });
  };

  return { renderBoard, setupBoardListeners, resetBoard };
})();

const PlayGame = (function () {
  const statusText = document.querySelector(".status-text");
  const gameBoard = GameBoard();
  const gameController = GameController();
  const displayController = DisplayController;

  const playerOne = Player("p1", "X");
  const playerTwo = Player("p2", "O");
  let currentPlayer = playerOne;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    statusText.textContent = `${currentPlayer.symbol}'s turn`;
  };

  const playerMove = (index) => {
    gameController.makeMove(gameBoard.board, index, currentPlayer);
    displayController.renderBoard(gameBoard.board);
    if (gameController.checkWin(gameBoard.board, currentPlayer)) {
      resetGame();
    } else {
      switchPlayer();
    }
  };

  const resetGame = () => {
    gameBoard.board.fill("");
    statusText.textContent = "X's turn";
    displayController.renderBoard(gameBoard.board);
    currentPlayer = playerOne;
  };

  displayController.setupBoardListeners(gameBoard, gameController, playerMove);
  displayController.resetBoard(resetGame);
})();
