import LPiece from "./l_piece";
import Board from "./board";
import Canvas from "./canvas";
import Game from "./game";
import "./style.css";
import { CLOCKWISE, COUNTERCLOCKWISE } from "./constants";

const piece = new LPiece();

const game = new Game();
game.startGame();

let timeoutId = 0;
window.addEventListener("keydown", function (event) {
  if (event.repeat) return;
  event.key;
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      game.movePieceLeft();
      break;
    case "ArrowRight":
    case "d":
      game.movePieceRight();
      break;
    case "ArrowDown":
    case "s":
      game.speedOn();
      break;
    case "q":
      game.rotate(COUNTERCLOCKWISE);
      break;
    case "e":
      game.rotate(CLOCKWISE);
      break;
    default:
      return;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowDown":
    case "s":
      game.speedOff();
      break;
    default:
      return;
  }
});