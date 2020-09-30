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
    //console.log(this.board);
    function nextStep(board, row, col, lastrow, lastcol) {
      board.togglePiece(row, col);
      if (row === lastrow && col === lastcol) {
        counter++;
        board.togglePiece(row, col);
        return;
      }
      //
      for (let i = -1; i <= 1; i++) {
        if (row + i >= 0 && row + i <= lastrow) {
          if (board.hasBeenVisited(row + i, col) === false) {
            //row = row + i;
            nextStep(board, row + i, col, lastrow, lastcol);
            //board.togglePiece(row + i, col);
          }
          if (i === 0) {
            for (let j = -1; j <= 1; j++) {
              if (col + j >= 0 && col + j <= lastcol) {
                if (board.hasBeenVisited(row, col + j) === false) {
                  //col = col + j;
                  nextStep(board, row, col + j, lastrow, lastcol);
                  //board.togglePiece(row, col + j);
                }
              }
            }
          }
        }
      }
      board.togglePiece(row, col);
    }
    nextStep(this.board, 0, 0, this.lastrow, this.lastcol);
    return counter;
  }
}

module.exports = { RobotPaths };
