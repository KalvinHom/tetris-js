class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(this.height)
      .fill()
      .map(() => Array(this.width));
  }

  clearLines() {
    let linesCleared = 0;
    let i = this.height - 1;
    while (i > 0) {
      let filledLine = true;
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j] == null) {
          filledLine = false;
          break;
        }
      }

      if (filledLine) {
        this.board.splice(i, 1);
        this.board.unshift(Array(this.width));
        linesCleared++;
      } else {
        i--;
      }
    }
    return linesCleared;
  }

  isSpotAvailable(piece, x, y) {
    // debugger;
    if (y >= this.height) return false;

    const shape = piece.getShape();
    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (shape[j][i] != 0) {
          if (y + j >= this.height) return false;
          if (x + i < 0 || x + i >= this.width) return false;
          if (this.board[y + j][x + i] != null) {
            return false;
          }
        }
      }
    }
    return true;
  }

  placePiece(piece, x, y) {
    console.log(`placing piece at ${x}, ${y}`);

    const shape = piece.getShape();
    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (shape[j][i] != 0) {
          this.board[y + j][x + i] = piece.color;
        }
      }
    }
    console.log(this.board);
  }
}

export default Board;
