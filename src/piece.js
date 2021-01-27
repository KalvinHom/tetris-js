class Piece {
  constructor() {
    this.rotation_index = 0;
    this.rotations = [];
  }

  getShape() {
    return this.rotations[this.rotation_index];
  }
  rotate(direction) {
    const limit = this.rotations.length;
    this.rotation_index = this.rotation_index + direction;
    if (this.rotation_index >= limit) {
      this.rotation_index = 0;
    }
    if (this.rotation_index < 0) this.rotation_index = limit - 1;
  }
}

export default Piece;
