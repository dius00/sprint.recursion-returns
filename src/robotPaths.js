class Board {
  constructor(size) {
    this.board = [];
    for (let row = 0; row < size; row += 1) {
      this.board.push([]);
      for (let col = 0; col < size; col += 1) {
        this.board[row].push(false);
      }
    }
  }

  togglePiece(row, col) {
    this.board[row][col] = !this.board[row][col];
    return this.board;
  }
  hasBeenVisited(row, col) {
    return this.board[row][col];
  }
}

class RobotPaths {
  // initialize all your options
  // you may want to change this code later on, too
  constructor(size) {
    this.board = new Board(size);
    this.row = 0;
    this.col = 0;
    this.lastrow = size - 1;
    this.lastcol = size - 1;
  }

  solve() {
    let counter = 0;
    function nextStep(board, row, col, lastrow, lastcol) {
      board.togglePiece(row, col); //sets the current tile to true
      if (row === lastrow && col === lastcol) {
        //if the current tile is the last
        counter++;
        board.togglePiece(row, col); //resets to false to allow more paths
        return; //escapes the loop
      }
      // directionY affects row, and moves the robot up and down
      // -1 = up, 1 = down
      for (const directionY of [-1, 1]) {
        if (row + directionY >= 0 && row + directionY <= lastrow) {
          //checks that the row is within the grid
          if (board.hasBeenVisited(row + directionY, col) === false) {
            //if it hasn`t been visited
            nextStep(board, row + directionY, col, lastrow, lastcol); //call the next step
          }
        }
      }
      // directionX affects columns and moves the robot left and right
      // -1 - left, 1 = right
      for (const directionX of [-1, 1]) {
        if (col + directionX >= 0 && col + directionX <= lastcol) {
          //checks that the column is within the grid
          if (board.hasBeenVisited(row, col + directionX) === false) {
            // if it hasn`t been visited
            nextStep(board, row, col + directionX, lastrow, lastcol); //call the next step
          }
        }
      }

      board.togglePiece(row, col);
      /* When all the paths have been taken from the current position, resets it to false
      so that it can be reused by other paths */
    }
    nextStep(this.board, 0, 0, this.lastrow, this.lastcol);
    return counter;
  }
}

module.exports = { RobotPaths };
