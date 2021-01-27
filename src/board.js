class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(height)
      .fill()
      .map(() => Array(width));
  }

  clearLines() {}

  isSpotAvailable(piece, x, y) {
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
    const shape = piece.getShape();
    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (shape[j][i] != 0) {
          this.board[y + j][x + i] = piece.color;
        }
      }
    }
  }
}

export default Board;
