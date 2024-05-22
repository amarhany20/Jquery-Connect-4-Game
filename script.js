var player1 = prompt("Player One: Enter Your Name, you will be Blue");
var player1Color = "rgb(86, 151, 255)";

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = "rgb(237, 45, 73)";

var game_on = true;
var table = $("table tr");

function reportWin(rowNum, colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color", color);
}

function getColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}

function checkBottom(colIndex) {
  var colorReport = getColor(5, colIndex);

  for (let row = 5; row > -1; row--) {
    colorReport = getColor(row, colIndex);
    if (colorReport === "rgb(128, 128, 128)") {
      console.log(row);
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  console.log(one);
  console.log(one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined);
  return one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined;
}

function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (colorMatchCheck(getColor(row, col), getColor(row, col + 1), getColor(row, col + 2), getColor(row, col + 3))) {
        console.log("horizontal match detected");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
  return false;
}

function verticalWinCheck() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (colorMatchCheck(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))) {
        console.log("vertical match detected");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
  return false;
}
//  HELLA INEFFECIENT
function diagonalWinCheck() {
  for (let col = 0; col < 7; col++) {
    //Should be col < 6 but in course made as col < 5
    for (let row = 0; row < 6; row++) {
      if (colorMatchCheck(getColor(row, col), getColor(row + 1, col + 1), getColor(row + 2, col + 2), getColor(row + 3, col + 3))) {
        console.log("Top left to bottom right diagonal match detected.");
        reportWin(row, col);
        return true;
      } else if (colorMatchCheck(getColor(row, col), getColor(row - 1, col + 1), getColor(row - 2, col + 2), getColor(row - 3, col + 3))) {
        console.log("Bottom right to top left diagonal match detected.");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
  return false;
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$("h3").text(player1 + " it is your turn, pick a column to drop in!");

$(".board button").click(function () {
  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $("h1").text(currentName + "You have won!");
    $("h2").fadeOut("fast");
    $("h3").fadeOut("fast");
  }
  if (currentPlayer === 1) {
    currentPlayer = 2;
    currentName = player2;
    currentColor = player2Color;
  } else {
    currentPlayer = 1;
    currentName = player1;
    currentColor = player1Color;
  }
  $("h3").text(`${currentName} it is your turn`);
});
