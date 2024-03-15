
const chessboard = document.getElementById('chessboard');
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var pieces = {
    'A1': '♖', 'B1': '♘', 'C1': '♗', 'D1': '♕', 'E1': '♔', 'F1': '♗', 'G1': '♘', 'H1': '♖',
    'A2': '♙', 'B2': '♙', 'C2': '♙', 'D2': '♙', 'E2': '♙', 'F2': '♙', 'G2': '♙', 'H2': '♙',
    'A7': '♟', 'B7': '♟', 'C7': '♟', 'D7': '♟', 'E7': '♟', 'F7': '♟', 'G7': '♟', 'H7': '♟',
    'A8': '♜', 'B8': '♞', 'C8': '♝', 'D8': '♛', 'E8': '♚', 'F8': '♝', 'G8': '♞', 'H8': '♜'
}

// Create 8x8 div chess board
for (var i = 0; i < 8; i++) {
   for (var j = 0; j < 8; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell';

      // Adds classes for black/white cells
      if ((i + j) % 2 == 0) {
         cell.classList.add('black');
      } else {
        cell.classList.add('white');
      }

      // Calculate location
      var chessboardLocation = letters[j] + (8 - i);

      // Set cell id based on location
      cell.id = chessboardLocation;

      // If location is piece starting location, place piece
      var piece = pieces[chessboardLocation];
      if (piece) {
        cell.textContent = piece;
        cell.classList.add('occupied');
      }
      chessboard.appendChild(cell);
}
}

function select() {
    cells.forEach((cell) => {
        cell.classList.remove('selected');
    });
    this.classList.add('selected');
    if (this.classList.contains('occupied')) {
        // this.classList.add('held');  ---- fix these styles

    }
}

// Sticks held piece to cursor
// var $held = $('.held'),
//     $wrapper = $('#wrapper'); 

//   function movePiece(e) {
//     TweenLite.to($held, 0.3, {
//       css: {
//         left: e.pageX,
//         top: e.pageY
//       }
//     });
//   }

// var flag = false;
// $($wrapper).mouseover(function(){
//   flag = true;
//   TweenLite.to($held,0.4,{scale:1,autoAlpha:1})
//   $($wrapper).on('mousemove', movePiece);
// });
// $($wrapper).mouseout(function(){
//     flag = false;
//     TweenLite.to($held,0.4,{scale:0.1,autoAlpha:0})
// });


const cells = document.querySelectorAll('.cell')
cells.forEach((cell) => {
    cell.addEventListener('click', select);
})


