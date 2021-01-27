class Piece {
  constructor() {
    this.rotation_index = 0;
    this.rotations = [];
  }

  getShape() {
    return this.rotations[this.rotation_index];
  }
  rotateClockwise() {
    const limit = this.rotations.length;
    this.rotation_index = this.rotation_index + 1;
    if (this.rotation_index >= limit) this.rotation_index = 0;
  }

  rotateCounterClockwise() {
    const limit = this.rotations.length;
    this.rotation_index = this.rotation_index - 1;
    if (this.rotation_index <= 0) this.rotation_index = limit - 1;
  }
}

export default Piece;
