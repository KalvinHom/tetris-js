import Piece from "./piece";

class Z2Piece extends Piece {
  constructor() {
    super();
    this.color = "orange";
    this.rotations = [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ];
  }
}

export default Z2Piece;
