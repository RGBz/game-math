import { Matrix } from "./Matrix.ts";

export class Matrix3 implements Matrix<Matrix3> {
  /**
   * Create zero matrix (all entries are 0)
   */
  static get zero(): Matrix3 {
    return new Matrix3(
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    );
  }

  /**
   * Create an identity matrix (multiplying by it gives you the original matrix)
   */
  static get identity(): Matrix3 {
    return new Matrix3(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
    );
  }

  /**
   * Construct a matrix from row arrays
   */
  static fromRows(
    r0: [number, number, number],
    r1: [number, number, number],
    r2: [number, number, number],
  ): Matrix3 {
    return new Matrix3(
      r0[0],
      r0[1],
      r0[2],
      r1[0],
      r1[1],
      r1[2],
      r2[0],
      r2[1],
      r2[2],
    );
  }

  /**
   * Construct a matrix from column arrays
   */
  static fromColumns(
    c0: [number, number, number],
    c1: [number, number, number],
    c2: [number, number, number],
  ): Matrix3 {
    return new Matrix3(
      c0[0],
      c1[0],
      c2[0],
      c0[1],
      c1[1],
      c2[1],
      c0[2],
      c1[2],
      c2[2],
    );
  }

  /**
   * Construct a row-based matrix
   */
  constructor(
    public r0c0: number,
    public r0c1: number,
    public r0c2: number,
    public r1c0: number,
    public r1c1: number,
    public r1c2: number,
    public r2c0: number,
    public r2c1: number,
    public r2c2: number,
  ) {}

  /**
   * The number of rows in the matrix
   */
  get rowCount(): number {
    return 3;
  }

  /**
   * The number of columns in the matrix
   */
  get columnCount(): number {
    return 3;
  }

  /**
   * Are the number of rows equal to the number of columns?
   */
  get isSquare(): boolean {
    return true;
  }

  /**
   * Are all of the entries off of the main diagonal equal to 0?
   */
  get isDiagonal(): boolean {
    return this.r0c1 === 0 && this.r0c2 === 0 &&
      this.r1c0 === 0 && this.r1c2 === 0 &&
      this.r2c0 === 0 && this.r2c1 === 0;
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
    return new Matrix3(
      this.r0c0,
      this.r1c0,
      this.r2c0,
      this.r0c1,
      this.r1c1,
      this.r2c1,
      this.r0c2,
      this.r1c2,
      this.r2c2,
    );
  }

  /**
   * The magnitude of the matrix
   */
  get determinant(): number {
    return (
      (this.r0c0 * (this.r1c1 * this.r2c2 - this.r1c2 * this.r2c1)) +
      (this.r0c1 * (this.r1c2 * this.r2c0 - this.r1c0 * this.r2c2)) +
      (this.r0c2 * (this.r1c0 * this.r2c1 - this.r1c1 * this.r2c0))
    );
  }

  /**
   * Does this matrix equal another?
   */
  equals(other: Matrix3): boolean {
    return this.r0c0 === other.r0c0 &&
      this.r0c1 === other.r0c1 &&
      this.r0c2 === other.r0c2 &&
      this.r1c0 === other.r1c0 &&
      this.r1c1 === other.r1c1 &&
      this.r1c2 === other.r1c2 &&
      this.r2c0 === other.r2c0 &&
      this.r2c1 === other.r2c1 &&
      this.r2c2 === other.r2c2;
  }

  /**
   * Set the individual, row-based entries for this matrix
   */
  set(
    r0c0: number,
    r0c1: number,
    r0c2: number,
    r1c0: number,
    r1c1: number,
    r1c2: number,
    r2c0: number,
    r2c1: number,
    r2c2: number,
  ): this {
    this.r0c0 = r0c0;
    this.r0c1 = r0c1;
    this.r0c2 = r0c2;
    this.r1c0 = r1c0;
    this.r1c1 = r1c1;
    this.r1c2 = r1c2;
    this.r2c0 = r2c0;
    this.r2c1 = r2c1;
    this.r2c2 = r2c2;
    return this;
  }

  /**
   * Create a new matrix whose entries scaled by a scalar
   */
  scale(scalar: number): Matrix3 {
    return new Matrix3(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r0c2 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
      this.r1c2 * scalar,
      this.r2c0 * scalar,
      this.r2c1 * scalar,
      this.r2c2 * scalar,
    );
  }

  /**
   * Mutate this matrix by scaling each of its entries by a scalar
   */
  scaleMut(scalar: number): this {
    return this.set(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r0c2 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
      this.r1c2 * scalar,
      this.r2c0 * scalar,
      this.r2c1 * scalar,
      this.r2c2 * scalar,
    );
  }

  /**
   * Create a new matrix whose entries are the sum of this matrix and another
   */
  add(other: Matrix3): Matrix3 {
    return new Matrix3(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r0c2 + other.r0c2,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
      this.r1c2 + other.r1c2,
      this.r2c0 + other.r2c0,
      this.r2c1 + other.r2c1,
      this.r2c2 + other.r2c2,
    );
  }

  /**
   * Mutate this matrix by summing its entries with the entries of another matrix
   */
  addMut(other: Matrix3): this {
    return this.set(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r0c2 + other.r0c2,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
      this.r1c2 + other.r1c2,
      this.r2c0 + other.r2c0,
      this.r2c1 + other.r2c1,
      this.r2c2 + other.r2c2,
    );
  }

  /**
   * Create a new matrix whose entries are the difference of this matrix and another
   */
  subtract(other: Matrix3): Matrix3 {
    return new Matrix3(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r0c2 - other.r0c2,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
      this.r1c2 - other.r1c2,
      this.r2c0 - other.r2c0,
      this.r2c1 - other.r2c1,
      this.r2c2 - other.r2c2,
    );
  }

  /**
   * Mutate this matrix by subtracting the entries of another matrix from the entries of this matrix
   */
  subtractMut(other: Matrix3): this {
    return this.set(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r0c2 - other.r0c2,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
      this.r1c2 - other.r1c2,
      this.r2c0 - other.r2c0,
      this.r2c1 - other.r2c1,
      this.r2c2 - other.r2c2,
    );
  }

  /**
   * Create a new matrix by multiplying this matrix by another
   */
  multiply(other: Matrix3): Matrix3 {
    return new Matrix3(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0 + this.r0c2 * other.r2c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1 + this.r0c2 * other.r2c1,
      this.r0c0 * other.r0c2 + this.r0c1 * other.r1c2 + this.r0c2 * other.r2c2,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0 + this.r1c2 * other.r2c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1 + this.r1c2 * other.r2c1,
      this.r1c0 * other.r0c2 + this.r1c1 * other.r1c2 + this.r1c2 * other.r2c2,
      this.r2c0 * other.r0c0 + this.r2c1 * other.r1c0 + this.r2c2 * other.r2c0,
      this.r2c0 * other.r0c1 + this.r2c1 * other.r1c1 + this.r2c2 * other.r2c1,
      this.r2c0 * other.r0c2 + this.r2c1 * other.r1c2 + this.r2c2 * other.r2c2,
    );
  }

  /**
   * Mutate this matrix to be the product of itself and another
   */
  multiplyMut(other: Matrix3): this {
    return this.set(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0 + this.r0c2 * other.r2c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1 + this.r0c2 * other.r2c1,
      this.r0c0 * other.r0c2 + this.r0c1 * other.r1c2 + this.r0c2 * other.r2c2,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0 + this.r1c2 * other.r2c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1 + this.r1c2 * other.r2c1,
      this.r1c0 * other.r0c2 + this.r1c1 * other.r1c2 + this.r1c2 * other.r2c2,
      this.r2c0 * other.r0c0 + this.r2c1 * other.r1c0 + this.r2c2 * other.r2c0,
      this.r2c0 * other.r0c1 + this.r2c1 * other.r1c1 + this.r2c2 * other.r2c1,
      this.r2c0 * other.r0c2 + this.r2c1 * other.r1c2 + this.r2c2 * other.r2c2,
    );
  }
}
