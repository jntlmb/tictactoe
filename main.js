class GameBoard {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }
}

class Player {
  constructor(playerName, symbol) {
    this.playerName = playerName;
    this.symbol = symbol;
  }
}

class GameController {
  validateMove = (board, pos) => board[pos] === "";

  makeMove = (board, pos, player) => {
    board[pos] = player.symbol;
  };

  checkWin = (board, player) => {
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
}

class DisplayController {
  constructor() {
    this.cells = document.querySelectorAll(".cell");
  }

  renderBoard = (board) => {
    this.cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  setupBoardListeners = (gameBoard, gameController, playerMoveCallback) => {
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameController.validateMove(gameBoard.board, index)) {
          playerMoveCallback(index);
        }
      });
    });
  };

  resetBoard = (resetCallback) => {
    const resetBtn = document.querySelector(".reset-btn");

    resetBtn.addEventListener("click", () => {
      this.cells.forEach((cell) => {
        cell.textContent = "";
      });
      resetCallback();
    });
  };
}

class PlayGame {
  constructor() {
    console.log("playgame init");
    this.statusText = document.querySelector(".status-text");
    this.gameBoard = new GameBoard();
    this.gameController = new GameController();
    this.displayController = new DisplayController();

    this.playerOne = new Player("p1", "X");
    this.playerTwo = new Player("p2", "O");
    this.currentPlayer = this.playerOne;

    this.displayController.setupBoardListeners(
      this.gameBoard,
      this.gameController,
      (index) => this.playerMove(index)
    );
    this.displayController.resetBoard(() => this.resetGame());
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    this.statusText.textContent = `${this.currentPlayer.symbol}'s turn`;
  }

  playerMove(index) {
    this.gameController.makeMove(
      this.gameBoard.board,
      index,
      this.currentPlayer
    );
    this.displayController.renderBoard(this.gameBoard.board);
    if (
      this.gameController.checkWin(this.gameBoard.board, this.currentPlayer)
    ) {
      this.resetGame();
    } else {
      this.switchPlayer();
    }
  }

  resetGame() {
    this.gameBoard.board.fill("");
    this.statusText.textContent = "X's turn";
    this.displayController.renderBoard(this.gameBoard.board);
    this.currentPlayer = this.playerOne;
  }
}

new PlayGame();
