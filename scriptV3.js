$(document).ready(function () {
  const player1 = prompt("Player One: Enter Your Name, you will be Blue");
  const player2 = prompt("Player Two: Enter Your Name, you will be Red");

  let currentPlayer = 1;
  let currentName = player1;
  let gameOn = true;

  const board = Array.from({ length: 6 }, () => Array(7).fill(0));
  const $table = $(".board");

  function createBoard() {
    for (let row = 0; row < 6; row++) {
      let $row = $("<tr>");
      for (let col = 0; col < 7; col++) {
        let $col = $("<td><button></button></td>");
        $row.append($col);
      }
      $table.append($row);
    }
  }

  function reportWin() {
    return `${currentName} has won!`;
  }

  function checkWin(row, col) {
    return (
      checkDirection(row, col, 1, 0) || // Horizontal
      checkDirection(row, col, 0, 1) || // Vertical
      checkDirection(row, col, 1, 1) || // Diagonal down-right
      checkDirection(row, col, 1, -1)
    ); // Diagonal down-left
  }

  function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countMatches(row, col, rowDir, colDir);
    count += countMatches(row, col, -rowDir, -colDir);
    return count >= 4;
  }

  function countMatches(row, col, rowDir, colDir) {
    let r = row + rowDir;
    let c = col + colDir;
    let count = 0;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
      count++;
      r += rowDir;
      c += colDir;
    }
    return count;
  }

  function checkDraw() {
    return board.every((row) => row.every((cell) => cell !== 0));
  }

  function endGame(message) {
    $("#status").text(message);
    $("#refreshBtn").show();
    gameOn = false;
  }

  createBoard();

  $("#status").text(`${currentName}, it is your turn, pick a column to drop in!`);

  $(".board button").on("click", function () {
    if (!gameOn) return;

    const col = $(this).closest("td").index();
    let row;

    for (row = 5; row >= 0; row--) {
      if (board[row][col] === 0) {
        board[row][col] = currentPlayer;
        const $button = $table.find("tr").eq(row).find("td").eq(col).find("button");
        $button.addClass(currentPlayer === 1 ? "player1" : "player2");
        break;
      }
    }

    if (checkWin(row, col)) {
      endGame(reportWin());
      return;
    }

    if (checkDraw()) {
      endGame("The game ended in a draw!");
      return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentName = currentPlayer === 1 ? player1 : player2;
    $("#status").text(`${currentName}, it is your turn`);
    $("#history").text(`Last play: Player ${currentPlayer === 1 ? 2 : 1} in column ${col + 1}`);
  });

  $("#refreshBtn").on("click", function () {
    location.reload();
  });
});
