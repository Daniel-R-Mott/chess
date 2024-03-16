const chessboard = document.getElementById("chessboard");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
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

// Create 8x8 div chess board
for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    var cell = document.createElement("div");
    cell.className = "cell";

    // Adds classes for black/white cells
    if ((i + j) % 2 == 0) {
      cell.classList.add("black");
    } else {
      cell.classList.add("white");
    }

    // Get algebraic notation of cell
    var chessboardLocation = letters[j] + (8 - i);

    // Set cell id based to algebraic notation
    cell.id = chessboardLocation;

    // If location is piece starting location, create new piece div inside cell div
    var pieceDiv = document.createElement("div");
    pieceDiv.className = "piece";
    pieceDiv.textContent = pieces[chessboardLocation] || "";
    if (pieceDiv.innerText !== "") {
      cell.classList.add("occupied");
    }
    if (cell.classList.contains("occupied")) {
      cell.appendChild(pieceDiv);
    }
    chessboard.appendChild(cell);
  }
}

var heldPiece = null;

// on mousedown adds "selected" class to target cell, if cell is occupied, sets id of child piece div to "held"
function select() {
  this.classList.add("selected");
  if (this.classList.contains("occupied")) {
    heldPiece = this.querySelector(".piece");
    heldPiece.setAttribute("id", "held");
  } else {
    heldPiece = null;
  }
}
// listener for mousedown on cells
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mousedown", select);
});

// Add event listener to the document to handle piece drop
document.addEventListener("mouseup", function (e) {
  if (heldPiece) {
    const targetCell = document.elementFromPoint(e.clientX, e.clientY);
    // checks if target cell is valid cell, then removes "occupied" class from previous cell
    if (targetCell.classList.contains("cell")) {
      const previouslySelectedCell = document.querySelector(".selected");
      if (previouslySelectedCell) {
        previouslySelectedCell.classList.remove("occupied");
      }
      // appends piece div to cell div, removes selected class on previous cell and adds occupied class to target cell
      targetCell.appendChild(heldPiece);
      previouslySelectedCell.classList.remove("selected");
      targetCell.classList.add("occupied");
    }
    heldPiece.style = "center";
    heldPiece.removeAttribute("id", "held");
    heldPiece = null;
  }
});

// Attaches piece to cursor on mousemove
document.addEventListener("mousemove", function (e) {
  if (heldPiece) {
    heldPiece.style.position = "fixed";
    heldPiece.style.left = e.clientX - heldPiece.offsetWidth / 2 + "px";
    heldPiece.style.top = e.clientY - heldPiece.offsetHeight / 2 + "px";
  }
});
