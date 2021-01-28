import Piece from "./piece";

class TPiece extends Piece {
  constructor() {
    super();
    this.color = "pink";
    this.rotations = [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],

      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ];
  }
}

export default TPiece;
