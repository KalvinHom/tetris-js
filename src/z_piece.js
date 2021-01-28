import Piece from "./piece";

class ZPiece extends Piece {
  constructor() {
    super();
    this.color = "cyan";
    this.rotations = [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ];
  }
}

export default ZPiece;
