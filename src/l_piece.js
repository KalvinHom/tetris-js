import Piece from "./piece";

class LPiece extends Piece {
  constructor() {
    super();
    this.color = "green";
    this.rotations = [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],

      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ];
  }
}

export default LPiece;
