import LPiece from "./l_piece";
import Board from "./board";
import Canvas from "./canvas";
import Game from "./game";
import "./style.css";
import { CLOCKWISE, COUNTERCLOCKWISE } from "./constants";
const LEFT = -1;
const RIGHT = 1;

const piece = new LPiece();

const game = new Game();
game.startGame();

let fired = false;
window.addEventListener("keydown", function (event) {
  if (fired) return;
  fired = true;
  event.key;
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      game.movePiece(LEFT);
      break;
    case "ArrowRight":
    case "d":
      game.movePiece(RIGHT);
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
      fired = false;

      return;
  }
  fired = false;
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
