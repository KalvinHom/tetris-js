import Board from "./board";
import { HIDDEN_ROWS } from "./constants";

// this class focuses on how to draw elements
class Canvas {
  constructor(board) {
    this.boardPosX = 28;
    this.boardPosY = 28;
    this.cellSize = 28;

    this.levelPosX = 450;
    this.levelPosY = 375;
    this.scorePosX = 450;
    this.scorePosY = 428;

    this.previewX = 400;
    this.previewY = 28;

    this.board = board;
    this.boarderColor = "#fff";
    this.borderThickness = 0.5;

    this.canvas = document.querySelector("canvas.tetris");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
  }

  drawPiecePreview(piece) {
    const scoreBorder = [
      this.previewX - this.borderThickness,
      this.previewY - this.borderThickness,
      this.borderThickness + this.previewX + 200,
      this.borderThickness + this.previewY + 200,
    ];

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.moveTo(scoreBorder[0], scoreBorder[1]);
    this.context.lineTo(scoreBorder[2], scoreBorder[1]);
    this.context.lineTo(scoreBorder[2], scoreBorder[3]);
    this.context.lineTo(scoreBorder[0], scoreBorder[3]);
    this.context.closePath();
    this.context.strokeStyle = this.borderColor;
    this.context.stroke();
    const shape = piece.getShape();
    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (shape[i][j] != 0) {
          this.drawSquare(
            this.previewX + 50 + j * this.cellSize,
            this.previewY + 50 + i * this.cellSize,
            piece.color
          );
        }
      }
    }
  }

  drawLevel(level) {
    this.context.stroke();
    this.context.font = "40px serif";
    this.context.fillStyle = "#000000";
    this.context.fillText(`Level: ${level}`, this.levelPosX, this.levelPosY);
  }

  drawScore(score) {
    this.context.stroke();
    this.context.font = "40px serif";
    this.context.fillStyle = "#000000";
    this.context.fillText(`Score: ${score}`, this.scorePosX, this.scorePosY);
  }

  drawBorders() {
    const boardBorder = [
      this.boardPosX - this.borderThickness,
      this.boardPosY + HIDDEN_ROWS * this.cellSize - this.borderThickness,
      this.borderThickness + this.boardPosX + this.board.width * this.cellSize,
      this.borderThickness + this.boardPosY + this.board.height * this.cellSize,
    ];
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.moveTo(boardBorder[0], boardBorder[1]);
    this.context.lineTo(boardBorder[2], boardBorder[1]);
    this.context.lineTo(boardBorder[2], boardBorder[3]);
    this.context.lineTo(boardBorder[0], boardBorder[3]);
    this.context.closePath();
    this.context.strokeStyle = this.borderColor;

    this.context.stroke();
  }

  drawGrid() {
    // horizontal lines
    this.context.strokeStyle = this.borderColor;
    this.context.lineWidth = 0.5;

    const boardRight = this.boardPosX + this.cellSize * this.board.width;
    for (let i = 3; i < this.board.height; i++) {
      const height = this.boardPosY + i * this.cellSize;
      this.context.beginPath();
      this.context.moveTo(this.boardPosX, height);
      this.context.lineTo(boardRight, height);
      this.context.closePath();
      this.context.stroke();
    }

    // vertical lines
    this.context.strokeStyle = this.borderColor;
    const boardBottom = this.boardPosY + this.cellSize * this.board.height;
    for (let i = 1; i < this.board.width; i++) {
      const height = this.boardPosX + i * this.cellSize;
      this.context.beginPath();
      console.log(HIDDEN_ROWS);
      this.context.moveTo(height, this.boardPosY + HIDDEN_ROWS * this.cellSize);
      this.context.lineTo(height, boardBottom);
      this.context.closePath();
      this.context.stroke();
    }
  }
  drawBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBorders();
    this.drawGrid();

    for (let i = 3; i < this.board.height; i++) {
      for (let j = 3; j < this.board.width; j++) {
        if (this.board.board[i][j] != null) {
          this.drawSquare(
            this.boardPosX + j * this.cellSize,
            this.boardPosY + i * this.cellSize,
            this.board.board[i][j]
          );
        }
      }
    }
  }

  drawSquare(x, y, color) {
    this.context.beginPath();

    this.context.fillStyle = color;
    this.context.fillRect(
      x + 0.5,
      y + 0.5,
      this.cellSize - 1,
      this.cellSize - 1
    );
  }

  drawPiece(piece, posX, posY) {
    const shape = piece.getShape();
    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (shape[i][j] != 0) {
          if (posY + i >= HIDDEN_ROWS) {
            this.drawSquare(
              this.boardPosX + (posX + j) * this.cellSize,
              this.boardPosY + (posY + i) * this.cellSize,
              piece.color
            );
          }
        }
      }
    }
  }
}

export default Canvas;
