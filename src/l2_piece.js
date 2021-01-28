import Piece from "./piece";

class L2Piece extends Piece {
  constructor() {
    super();
    this.color = "red";
    this.rotations = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],

      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ];
  }
}

export default L2Piece;
