import Piece from "./piece";

class OPiece extends Piece {
  constructor() {
    super();
    this.color = "yellow";
    this.rotations = [
      [
        [1, 1],
        [1, 1],
      ],
    ];
  }
}

export default OPiece;
