// let gameboard = document.querySelector('.board');
let cells = document.querySelectorAll(".cell");
let modalCont = document.querySelector(".modalContent");
let oScore = document.querySelector(".oScore");
let xScore = document.querySelector(".xScore");
let drawScore = document.querySelector(".draw");
let quitBtn = document.getElementById("quit");
let nextBtn = document.getElementById("next");
let resetBtn = document.querySelector(".restart");

// oScore.innerHTML = sessionStorage.getItem("oScore");
// xScore.innerHTML = sessionStorage.getItem("xScore");
// draw.innerHTML = sessionStorage.getItem("draw");

let x = sessionStorage.getItem("xScore");
let o = sessionStorage.getItem("oScore");
let draw = sessionStorage.getItem("draw");

let currentPlayer = '<i class="fa-solid fa-xmark"></i>';
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerMove(index, e) {
  addClass(e.target);

  if (board[index] === "" && !checkWinner().isWon) {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;
    if (checkWinner().isWon) {
      drawWonPosition(checkWinner().wonPos, currentPlayer);

      if (currentPlayer === '<i class="fa-solid fa-xmark"></i>') {
        modalCont.classList.add("x");

        x = sessionStorage.getItem("xScore");
        sessionStorage.setItem("xScore", x++);

        xScore.innerHTML = x;
      } else {
        modalCont.classList.add("o");
        o = sessionStorage.getItem("oScore");
        sessionStorage.setItem("oScore", o++);
        oScore.innerHTML = o;
      }

      document.querySelector(".wonTurn").innerHTML = `${currentPlayer} takes round !`;

      setTimeout(() => {
        document.querySelector(".resultModal").classList.add("show");
      }, 1100);
    } else if (board.every((cell) => cell !== "")) {
      setTimeout(() => {
        document.querySelector(".resultModal").classList.add("show");
      }, 1100);
      document.querySelector(".wonTurn").innerHTML = "It's a draw!";
    } else {
      currentPlayer =
        currentPlayer === '<i class="fa-solid fa-xmark"></i>'
          ? '<i class="fa-regular fa-circle"></i>'
          : '<i class="fa-solid fa-xmark"></i>';
    }
  }
}

function checkWinner() {
  let checkWon = null;

  let checkCellPositions = winningConditions.some((condition) => {
    const [a, b, c] = condition;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      checkWon = [a, b, c];
    }
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });

  return { isWon: checkCellPositions, wonPos: checkWon };
}

function addClass(element) {
  if (currentPlayer === '<i class="fa-solid fa-xmark"></i>') {
    if (!element.classList.contains("o")) {
      element.classList.add("x");
    }
  } else {
    if (!element.classList.contains("x")) {
      element.classList.add("o");
    }
  }
}

function drawWonPosition(position) {
  cells[position[0]].classList.add("won");
  cells[position[1]].classList.add("won");
  cells[position[2]].classList.add("won");
}

quitBtn.addEventListener("click", () => {
  window.location.href = "";
});
nextBtn.addEventListener("click", () => {
  cells.forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("x");
    el.classList.remove("o");
    el.classList.remove("won");
    modalCont.classList.remove("x");
    modalCont.classList.remove("o");
  });
  document.querySelector(".resultModal").classList.remove("show");
  board = ["", "", "", "", "", "", "", "", ""];
});
