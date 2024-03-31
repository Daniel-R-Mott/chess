const chessboard = document.getElementById("chessboard");
const file = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rank = ["1", "2", "3", "4", "5", "6", "7", "8"];

//prettier-ignore
var pieces = {
  A1: "♖", B1: "♘", C1: "♗", D1: "♕", E1: "♔", F1: "♗", G1: "♘", H1: "♖",
  A2: "♙", B2: "♙", C2: "♙", D2: "♙", E2: "♙", F2: "♙", G2: "♙", H2: "♙",
  A7: "♟", B7: "♟", C7: "♟", D7: "♟", E7: "♟", F7: "♟", G7: "♟", H7: "♟",
  A8: "♜", B8: "♞", C8: "♝", D8: "♛", E8: "♚", F8: "♝", G8: "♞", H8: "♜",
};

let validMoves = [];

//TODO:
// -when piece is held, highlight cells at valid move locations, only accept valid moves
// -piece capture - check if target cell is occupied, remove piece
// -pawn promotion
// -check for check and checkmate states
// -castling
// -update 'pieces' obj with new locations? may be useful

makeBoard();

document.addEventListener("mousemove", stickyMouse);

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mousedown", select);
  cell.addEventListener("mouseup", placePiece);
});

var heldPiece = null;

//////////////FUNCTION JUNCTION

function select() {
  let startPos = this.id;
  if (document.querySelector(".selected")) {
    document.querySelector(".selected").classList.remove("selected");
  }
  this.classList.add("selected");
  if (this.classList.contains("occupied")) {
    heldPiece = this.querySelector(".piece");
    heldPiece.setAttribute("id", "held");
    pieceMove(heldPiece, startPos);
  } else {
    heldPiece = null;
  }
}

//Drops piece on target cell and updates classes
function placePiece() {
  if (heldPiece) {
    if (
      this.classList.contains("cell") &&
      !this.classList.contains("occupied") &&
      validMoves.includes(this.id)
    ) {
      this.appendChild(heldPiece);
      document.querySelector(".selected").classList.remove("selected");
      checkCells();
    } else {
    }
    heldPiece.style = "center";
    heldPiece.removeAttribute("id", "held");
    heldPiece = null;
  }
  validMoves = [];
//Removes valid moves highlight when dropping piece
  cells.forEach((cell) => {
    cell.classList.remove("valid-move");
  });
}

//Attaches piece to cursor for movement
function stickyMouse(e) {
  if (heldPiece) {
    heldPiece.style.position = "fixed";
    heldPiece.style.left = e.clientX - heldPiece.offsetWidth / 2 + "px";
    heldPiece.style.top = e.clientY - heldPiece.offsetHeight / 2 + "px";
//Highlight valid moves while holding piece
    validMoves.forEach((move) => {
      if (!document.getElementById(move).classList.contains("occupied")) {
        document.getElementById(move).classList.add("valid-move");
      }
    });
  }
}

//Board generator
function makeBoard() {
  createGrid();
  populatePieces();
  checkCells();
}

function createGrid() {
  const chessboard = document.getElementById("chessboard");
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
      chessboard.appendChild(cell);
    }
  }
}

function populatePieces() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (pieces[cell.id]) {
      var pieceDiv = document.createElement("div");
      pieceDiv.className = "piece";
      pieceDiv.classList.add(pieces[cell.id]);
      pieceDiv.textContent = pieces[cell.id];
      if (/[78]$/.test(cell.id)) {
        pieceDiv.classList.add("blackPiece");
      } else {
        pieceDiv.classList.add("whitePiece");
      }
      cell.appendChild(pieceDiv);
    }
  });
}

function checkCells() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.firstChild) {
      cell.classList.add("occupied");
    } else {
      cell.classList.remove("occupied");
    }
  });
}

//gathers piece/location info to pass to specific piece movement function
function pieceMove(heldPiece, startPos) {
  let startX = startPos.charCodeAt(0) - 65;
  let startY = 8 - parseInt(startPos.charAt(1));
  if (heldPiece.classList.contains("♖")) {
    rookMove(startX, startY);
  } else if (heldPiece.classList.contains("♘")) {
    knightMove(startX, startY);
  } else if (heldPiece.classList.contains("♗")) {
    bishopMove(startX, startY);
  } else if (heldPiece.classList.contains("♕")) {
    queenMove(startX, startY);
  } else if (heldPiece.classList.contains("♔")) {
    kingMove(startX, startY);
  } else if (heldPiece.classList.contains("♙")) {
    pawnMove(startX, startY);
  }
}

function knightMove(startX, startY) {
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  for (let move of knightMoves) {
    let newX = startX + move[0];
    let newY = startY + move[1];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      let newSquare = String.fromCharCode(newX + 65) + (8 - newY);

      validMoves.push(newSquare);
    }
  }
}

function pawnMove(startX,startY) {
  const pawnMoves = [
    [0,1],
  [0,2],
  [1,1],
  [1,-1],
  ];
}
