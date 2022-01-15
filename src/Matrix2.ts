import { Matrix } from "./Matrix.ts";
import { Vec2 } from "./Vec2.ts";

export class Matrix2 implements Matrix<Matrix2> {
  static get zero(): Matrix2 {
    return new Matrix2(Vec2.zero, Vec2.zero);
  }

  static get identity(): Matrix2 {
    return new Matrix2(
      new Vec2(1, 0),
      new Vec2(0, 1),
    );
  }

  static fromRows(r0: Vec2, r1: Vec2): Matrix2 {
    return new Matrix2(
      new Vec2(r0.x, r1.x),
      new Vec2(r0.y, r1.y),
    );
  }

  static fromColumns(c0: Vec2, c1: Vec2): Matrix2 {
    return new Matrix2(c0, c1);
  }

  private constructor(
    public c0: Vec2,
    public c1: Vec2,
  ) {}

  get rowCount(): number {
    return 2;
  }

  get columnCount(): number {
    return 2;
  }

  get isSquare(): boolean {
    return true;
  }

  get isDiagonal(): boolean {
    const { c0, c1 } = this;
    return c0.y === 0 && c1.x === 0;
  }

  /**
   * Is the transpose of this matrix equal to itself? (AKA is it square and diagonal?)
   */
  get isSymmetric(): boolean {
    return this.isDiagonal;
  }

  /**
   * Is the transpose of this matrix equal to the negation of itself? (AKA skew-symmetric)
   */
  get isAntiSymmetric(): boolean {
    return this.transpose.equals(this.scale(-1));
  }

  /**
   * Create a new matrix whose rows are the columns from this matrix
   */
  get transpose(): Matrix2 {
    const { c0, c1 } = this;
    return Matrix2.fromRows(c0, c1);
  }

  scale(scalar: number): Matrix2 {
    const { c0, c1 } = this;
    return Matrix2.fromColumns(
      c0.scale(scalar),
      c1.scale(scalar),
    );
  }

  scaleMut(scalar: number): this {
    const { c0, c1 } = this;
    c0.scaleMut(scalar);
    c1.scaleMut(scalar);
    return this;
  }

  add(other: Matrix2): Matrix2 {
    return Matrix2.fromColumns(
      this.c0.add(other.c0),
      this.c1.add(other.c1),
    );
  }

  addMut(other: Matrix2): this {
    this.c0.addMut(other.c0);
    this.c1.addMut(other.c1);
    return this;
  }

  subtract(other: Matrix2): Matrix2 {
    return Matrix2.fromColumns(
      this.c0.subtract(other.c0),
      this.c1.subtract(other.c1),
    );
  }

  subtractMut(other: Matrix2): this {
    this.c0.subtractMut(other.c0);
    this.c1.subtractMut(other.c1);
    return this;
  }

  equals(other: Matrix2): boolean {
    return this.c0.equals(other.c0) &&
      this.c1.equals(other.c1);
  }

  multiply(other: Matrix2): Matrix2 {
    const { c0, c1 } = this;
    return Matrix2.fromColumns(
      c0.multiply(other),
      c1.multiply(other),
    );
  }

  multiplyMut(other: Matrix2): this {
    const { c0, c1 } = this;
    c0.multiplyMut(other);
    c1.multiplyMut(other);
    return this;
  }
}
