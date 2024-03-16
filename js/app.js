const chessboard = document.getElementById("chessboard");
const file = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rank = ["1", "2", "3", "4", "5", "6", "7", "8"];
var pieces = {
  A1: "♖",
  B1: "♘",
  C1: "♗",
  D1: "♕",
  E1: "♔",
  F1: "♗",
  G1: "♘",
  H1: "♖",
  A2: "♙",
  B2: "♙",
  C2: "♙",
  D2: "♙",
  E2: "♙",
  F2: "♙",
  G2: "♙",
  H2: "♙",
  A7: "♟",
  B7: "♟",
  C7: "♟",
  D7: "♟",
  E7: "♟",
  F7: "♟",
  G7: "♟",
  H7: "♟",
  A8: "♜",
  B8: "♞",
  C8: "♝",
  D8: "♛",
  E8: "♚",
  F8: "♝",
  G8: "♞",
  H8: "♜",
};

//TODO:
// -when piece is held, highlight cells at valid move locations, only accept valid moves
// -piece capture - check if target cell is occupied, remove piece
// -pawn promotion
// -check for check and checkmate states
// -castling
// -update 'pieces' array with new locations? may be useful

makeBoard();
checkCells();

var heldPiece = null;
document.addEventListener("mousemove", stickyMouse);

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mousedown", select);
  cell.addEventListener("mouseup", placePiece);
});

//////////////FUNCTION JUNCTION

function select() {
  this.classList.add("selected");
  if (this.classList.contains("occupied")) {
    heldPiece = this.querySelector(".piece");
    heldPiece.setAttribute("id", "held");
    this.classList.remove("occupied");
  } else {
    heldPiece = null;
  }
}

//Drops piece on target cell and updates classes
function placePiece() {
  if (heldPiece) {
    if (this.classList.contains("cell")) {
      this.appendChild(heldPiece);
      document.querySelector(".selected").classList.remove("selected");
      checkCells();
    }
    heldPiece.style = "center";
    heldPiece.removeAttribute("id", "held");
    heldPiece = null;
  }
}

//Attaches piece to cursor
function stickyMouse(e) {
  if (heldPiece) {
    heldPiece.style.position = "fixed";
    heldPiece.style.left = e.clientX - heldPiece.offsetWidth / 2 + "px";
    heldPiece.style.top = e.clientY - heldPiece.offsetHeight / 2 + "px";
  }
}

//Checks all cells for child div, sets class
function checkCells() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.firstChild) {
      cell.classList.add("occupied");
    }
  });
}

function makeBoard() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      if ((i + j) % 2 == 0) {
        cell.classList.add("black");
      } else {
        cell.classList.add("white");
      }
      var chessboardLocation = file[j] + (8 - i);
      cell.id = chessboardLocation;
      if (Object.keys(pieces).indexOf(cell.id) > -1) {
        // CELL H1 NOT GETTING OCCUPPIED CLASS, fixes on first mouseup
        var pieceDiv = document.createElement("div");
        pieceDiv.className = "piece";
        pieceDiv.textContent = pieces[chessboardLocation] || "";
        cell.appendChild(pieceDiv);

      }
      chessboard.appendChild(cell);
    }
  }
}
