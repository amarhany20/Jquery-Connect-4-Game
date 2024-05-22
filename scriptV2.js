$(document).ready(function () {
  const player1 = prompt("Player One: Enter Your Name, you will be Blue");
  const player1Color = "rgb(86, 151, 255)";

  const player2 = prompt("Player Two: Enter Your Name, you will be Red");
  const player2Color = "rgb(237, 45, 73)";

  let currentPlayer = 1;
  let currentName = player1;
  let currentColor = player1Color;
  let gameOn = true;

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

  function reportWin(row, col) {
    console.log(`You won starting at this row, col: ${row}, ${col}`);
  }

  function changeColor(row, col, color) {
    $table.find("tr").eq(row).find("td").eq(col).find("button").css("background-color", color);
  }

  function getColor(row, col) {
    return $table.find("tr").eq(row).find("td").eq(col).find("button").css("background-color");
  }

  function checkBottom(col) {
    for (let row = 5; row >= 0; row--) {
      if (getColor(row, col) === "rgb(128, 128, 128)") {
        return row;
      }
    }
    return null;
  }

  function colorMatchCheck(...colors) {
    return colors.every((color) => color === colors[0] && color !== "rgb(128, 128, 128)" && color !== undefined);
  }

  function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (colorMatchCheck(getColor(row, col), getColor(row, col + 1), getColor(row, col + 2), getColor(row, col + 3))) {
          reportWin(row, col);
          return true;
        }
      }
    }
    return false;
  }

  function verticalWinCheck() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (colorMatchCheck(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))) {
          reportWin(row, col);
          return true;
        }
      }
    }
    return false;
  }

  function diagonalWinCheck() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (colorMatchCheck(getColor(row, col), getColor(row + 1, col + 1), getColor(row + 2, col + 2), getColor(row + 3, col + 3)) || colorMatchCheck(getColor(row, col), getColor(row - 1, col + 1), getColor(row - 2, col + 2), getColor(row - 3, col + 3))) {
          reportWin(row, col);
          return true;
        }
      }
    }
    return false;
  }

  function checkDraw() {
    let isDraw = true;
    for (let col = 0; col < 7; col++) {
      if (getColor(0, col) === "rgb(128, 128, 128)") {
        isDraw = false;
        break;
      }
    }
    return isDraw;
  }

  function endGame(message) {
    $("#status").text(message);
    $("#refreshBtn").show();
  }

  createBoard();

  $("#status").text(`${currentName}, it is your turn, pick a column to drop in!`);

  $(".board button").on("click", function () {
    if (!gameOn) return;

    const col = $(this).closest("td").index();
    const bottomAvail = checkBottom(col);

    if (bottomAvail !== null) {
      changeColor(bottomAvail, col, currentColor);
      //   console.log(horizontalWinCheck());
      //   prompt("Hey");
      //   console.log(verticalWinCheck());
      //   prompt("Hey");
      //   console.log(diagonalWinCheck());

      if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        endGame(`${currentName}, you have won!`);
        gameOn = false;
        return;
      }

      if (checkDraw()) {
        endGame("The game ended in a draw!");
        gameOn = false;
        return;
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      currentName = currentPlayer === 1 ? player1 : player2;
      currentColor = currentPlayer === 1 ? player1Color : player2Color;
      $("#status").text(`${currentName}, it is your turn`);
      $("#history").text(`Last play: Player ${currentPlayer === 1 ? 2 : 1} in column ${col + 1}`);
    }
  });

  $("#refreshBtn").on("click", function () {
    location.reload();
  });
});
