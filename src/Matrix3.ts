import { Matrix } from "./Matrix.ts";
import { Vec3 } from "./Vec3.ts";

export class Matrix3 implements Matrix<Matrix3> {
  static get zero(): Matrix3 {
    return new Matrix3(Vec3.zero, Vec3.zero, Vec3.zero);
  }

  static get identity(): Matrix3 {
    return new Matrix3(
      new Vec3(1, 0, 0),
      new Vec3(0, 1, 0),
      new Vec3(0, 0, 1),
    );
  }

  static fromRows(r0: Vec3, r1: Vec3, r2: Vec3): Matrix3 {
    return new Matrix3(
      new Vec3(r0.x, r1.x, r2.x),
      new Vec3(r0.y, r1.y, r2.y),
      new Vec3(r0.z, r1.z, r2.z),
    );
  }

  static fromColumns(c0: Vec3, c1: Vec3, c2: Vec3): Matrix3 {
    return new Matrix3(c0, c1, c2);
  }

  private constructor(
    public c0: Vec3,
    public c1: Vec3,
    public c2: Vec3,
  ) {}

  get rowCount(): number {
    return 3;
  }

  get columnCount(): number {
    return 3;
  }

  get isSquare(): boolean {
    return true;
  }

  get isDiagonal(): boolean {
    const { c0, c1, c2 } = this;
    return c0.y === 0 && c0.z === 0 && c1.x === 0 && c1.z === 0 && c2.x === 0 &&
      c2.y === 0;
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
  get transpose(): Matrix3 {
    const { c0, c1, c2 } = this;
    return Matrix3.fromRows(c0, c1, c2);
  }

  scale(scalar: number): Matrix3 {
    const { c0, c1, c2 } = this;
    return Matrix3.fromColumns(
      c0.scale(scalar),
      c1.scale(scalar),
      c2.scale(scalar),
    );
  }

  scaleMut(scalar: number): this {
    const { c0, c1, c2 } = this;
    c0.scaleMut(scalar);
    c1.scaleMut(scalar);
    c2.scaleMut(scalar);
    return this;
  }

  add(other: Matrix3): Matrix3 {
    return Matrix3.fromColumns(
      this.c0.add(other.c0),
      this.c1.add(other.c1),
      this.c2.add(other.c2),
    );
  }

  addMut(other: Matrix3): this {
    this.c0.addMut(other.c0);
    this.c1.addMut(other.c1);
    this.c2.addMut(other.c2);
    return this;
  }

  subtract(other: Matrix3): Matrix3 {
    return Matrix3.fromColumns(
      this.c0.subtract(other.c0),
      this.c1.subtract(other.c1),
      this.c2.subtract(other.c2),
    );
  }

  subtractMut(other: Matrix3): this {
    this.c0.subtractMut(other.c0);
    this.c1.subtractMut(other.c1);
    this.c2.subtractMut(other.c2);
    return this;
  }

  equals(other: Matrix3): boolean {
    return this.c0.equals(other.c0) &&
      this.c1.equals(other.c1) &&
      this.c2.equals(other.c2);
  }
}
