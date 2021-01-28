import Board from "./board";
import Canvas from "./canvas";
import LinePiece from "./line_piece";
import LPiece from "./l_piece";
import L2Piece from "./l2_piece";
import OPiece from "./o_piece";
import ZPiece from "./z_piece";
import Z2Piece from "./z2_piece";
import TPiece from "./t_piece";

const PIECES = [LPiece, L2Piece, ZPiece, Z2Piece, TPiece, LinePiece, OPiece];

const ALIVE = 0;
const GAMEOVER = 1;

const RESTART = {
  x: 500,
  y: 500,
  width: 250,
  height: 100,
};

class Game {
  constructor() {
    this.setDefaults();
    this.handleRestart = this.handleRestart.bind(this);
  }

  setDefaults() {
    this.board = new Board(10, 25);
    this.canvas = new Canvas(this.board);
    this.state = ALIVE;
    this.gameSpeed = 1000;
    this.speedMode = false;
    this.speedAmount = 10;
    this.level = 1;
    this.score = 0;
    this.numClears = 0;
  }

  startGame() {
    this.lastRenderTime = Date.now();
    this.setNextPiece();
    window.requestAnimationFrame(this.tick.bind(this));
  }

  restartGame() {
    this.setDefaults();
    this.canvas.canvas.removeEventListener("click", this.handleRestart, false);
    this.startGame();
  }

  gameOver() {
    this.state = GAMEOVER;
    this.canvas.drawPiece(this.currentPiece);
    this.canvas.drawRestart();
    this.render();
  }

  setNextPiece() {
    const rand = Math.floor(Math.random() * 7);
    this.nextPiece = new PIECES[rand]();
  }

  movePiece(dir) {
    const available = this.board.isSpotAvailable(
      this.currentPiece,
      this.pieceX + dir,
      this.pieceY
    );
    if (available) this.pieceX += dir;
    this.render();
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
      const linesCleared = this.board.clearLines();
      if (linesCleared > 0) this.numClears++;

      this.addScore(linesCleared);
      this.addLevel();
      this.placeNewPiece(this.currentPiece);
    }
  }

  placeNewPiece() {
    const piece = this.nextPiece;
    this.setNextPiece();
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

  rotate(direction) {
    let rotatedPiece = Object.assign(
      Object.create(Object.getPrototypeOf(this.currentPiece)),
      this.currentPiece
    );
    rotatedPiece.rotate(direction);
    const isValid = this.verifyRotation(rotatedPiece, 0);
    if (isValid) this.currentPiece = rotatedPiece;
    this.render();
  }

  // if the rotated piece doesn't fit its spot, attempt to shift it one right
  // and then one left.  If no result fits, the piece does not rotate.
  verifyRotation(piece, offset) {
    const isValid = this.board.isSpotAvailable(
      piece,
      this.pieceX + offset,
      this.pieceY
    );
    if (isValid) {
      this.pieceX += offset;
      return true;
    }
    if (offset == 0) return this.verifyRotation(piece, 1);
    if (offset == 1) return this.verifyRotation(piece, -1);
    return false;
  }

  addScore(linesCleared) {
    if (linesCleared > 0) {
      this.score += this.level * Math.pow(2, linesCleared - 1) * 100;
    }
  }
  addLevel() {
    if (this.score / 1000 / this.level > this.level) {
      this.level++;
      this.gameSpeed / 2;
    }
  }

  speedOn() {
    this.speedMode = true;
  }

  speedOff() {
    this.speedMode = false;
  }
  showRestart() {
    const base = this;
    this.canvas.canvas.addEventListener("click", this.handleRestart, false);
    this.canvas.drawRestart();
  }

  tick() {
    if (this.state == GAMEOVER) {
      this.showRestart();
      return;
    }
    const elapsed = Date.now() - this.lastRenderTime;
    const speed = this.speedMode ? this.speedAmount : this.gameSpeed;

    if (elapsed > speed) {
      this.canvas.drawBoard();
      if (!this.currentPiece) this.placeNewPiece();
      else this.incrementPiece();
      this.render();

      this.lastRenderTime = Date.now();
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    this.canvas.drawBoard();
    this.canvas.drawScore(this.score);
    this.canvas.drawPiecePreview(this.nextPiece);
    this.canvas.drawLevel(this.level);
    this.canvas.drawControls();

    if (this.state == GAMEOVER) {
      this.showRestart();
      return;
    }

    if (this.currentPiece)
      this.canvas.drawPiece(this.currentPiece, this.pieceX, this.pieceY);
  }

  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  isInside(pos, rect) {
    return (
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y < rect.y + rect.height &&
      pos.y > rect.y
    );
  }

  handleRestart(evt) {
    var mousePos = this.getMousePos(this.canvas.canvas, evt);
    if (this.isInside(mousePos, RESTART)) {
      this.restartGame();
    }
  }
}

export default Game;
