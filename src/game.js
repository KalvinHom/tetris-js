import Board from "./board";
import Canvas from "./canvas";
import LPiece from "./l_piece";
const pieces = [LPiece];

const ALIVE = 0;
const GAMEOVER = 1;

class Game {
  constructor() {
    this.board = new Board(10, 22);
    this.canvas = new Canvas(this.board);
    this.nextPiece = LPiece;
    this.state = ALIVE;
    this.gameSpeed = 1000;
    this.speedMode = false;
    this.speedAmount = 10;
  }

  placeNewPiece() {
    const piece = new this.nextPiece();
    this.currentPiece = piece;
    this.pieceX = 3;
    this.pieceY = 0;

    const available = this.board.isSpotAvailable(
      this.currentPiece,
      this.pieceX,
      this.pieceY
    );
    if (!available) this.gameOver();
  }

  rotatePieceCounter() {
    const rotatedPiece = Object.assign(this.currentPiece, {});
    this.rotatedPiece.rotateCounterClockwise();
    const doesPieceFit = this.board.isSpotAvailable(
      this.rotatedPiece,
      this.pieceX,
      this.pieceY
    );
    this.render();
    console.log(this.pieceX);
  }
  rotatePieceClock() {
    this.currentPiece.rotateClockwise();
    if (this.pieceX < 0) this.pieceX = 0;

    this.render();
  }
  gameOver() {
    this.state = GAMEOVER;
  }

  movePieceLeft() {
    console.log("move!");
    const available = this.board.isSpotAvailable(
      this.currentPiece,
      this.pieceX - 1,
      this.pieceY
    );
    if (available) this.pieceX -= 1;
    this.render();
  }

  movePieceRight() {
    const available = this.board.isSpotAvailable(
      this.currentPiece,
      this.pieceX + 1,
      this.pieceY
    );
    if (available) this.pieceX += 1;
    this.render();
  }

  speedOn() {
    this.speedMode = true;
  }

  speedOff() {
    this.speedMode = false;
  }
  incrementPiece() {
    const available = this.board.isSpotAvailable(
      this.currentPiece,
      this.pieceX,
      this.pieceY + 1
    );
    if (available) this.pieceY = this.pieceY + 1;
    else {
      this.board.placePiece(this.currentPiece, this.pieceX, this.pieceY);
      this.placeNewPiece(this.currentPiece);
    }
  }

  startGame() {
    this.lastRenderTime = Date.now();
    window.requestAnimationFrame(this.tick.bind(this));
    this.placeNewPiece();
    console.log("?");
  }

  render() {
    this.canvas.drawBoard();
    if (this.currentPiece)
      this.canvas.drawPiece(this.currentPiece, this.pieceX, this.pieceY);
  }
  tick() {
    if (this.state == GAMEOVER) return;
    const elapsed = Date.now() - this.lastRenderTime;
    const speed = this.speedMode ? this.speedAmount : this.gameSpeed;

    if (elapsed > speed) {
      this.canvas.drawBoard();
      this.render();
      this.incrementPiece();

      this.lastRenderTime = Date.now();
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }
}

export default Game;
