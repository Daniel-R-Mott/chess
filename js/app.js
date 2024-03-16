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

    // Calculate location
    var chessboardLocation = letters[j] + (8 - i);

    // Set cell id based on location
    cell.id = chessboardLocation;

    // Needs work, currently creating child piece div in every cell
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

function select() {
  cells.forEach((cell) => {
    cell.classList.remove("selected");
  });
  this.classList.add("selected");
  if (this.classList.contains("occupied")) {
    heldPiece = this.querySelector(".piece");
    heldPiece.setAttribute("id", "held");
  } else {
    heldPiece = null;
  }
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", select);
});

// 2-click movement is working here, but not click and drag. Piece also does not stick to cursor visually
// Add event listener to the document to handle piece movement
document.addEventListener("mousemove", function (e) {
  if (heldPiece) {
    // Move the held piece along with the mouse cursor
    heldPiece.style.top = e.pageY + "px";
    heldPiece.style.left = e.pageX + "px";
  }
});

// Add event listener to the document to handle piece drop
document.addEventListener("mouseup", function (e) {
  if (heldPiece) {
    // Find the cell where the piece is dropped
    const targetCell = document.elementFromPoint(e.clientX, e.clientY);
    if (targetCell.classList.contains("cell")) {
      // If the target cell is a valid cell, move the piece to that cell
      targetCell.appendChild(heldPiece);
      // Set cell class to occupied, removes class from previous cell
      targetCell.classList.add("occupied");
      let selected = document.querySelector(".selected");
      selected.classList.remove("occupied");
      heldPiece.style.top = "";
      heldPiece.style.left = "";
    }
    heldPiece.removeAttribute("id", "held");
    heldPiece = null;
  }
});
