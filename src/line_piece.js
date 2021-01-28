import Piece from "./piece";

class LinePiece extends Piece {
  constructor() {
    super();
    this.color = "blue";
    this.rotations = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ];
  }
}

export default LinePiece;
