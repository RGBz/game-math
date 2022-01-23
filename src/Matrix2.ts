import { Matrix } from "./Matrix.ts";

export class Matrix2 implements Matrix<Matrix2> {
  /**
   * Create zero matrix (all entries are 0)
   */
  static get zero(): Matrix2 {
    return new Matrix2(0, 0, 0, 0);
  }

  /**
   * Create an identity matrix (multiplying by it gives you the original matrix)
   */
  static get identity(): Matrix2 {
    return new Matrix2(1, 0, 0, 1);
  }

  /**
   * Construct a matrix from row arrays
   */
  static fromRows(r0: [number, number], r1: [number, number]): Matrix2 {
    return new Matrix2(r0[0], r0[1], r1[0], r1[1]);
  }

  /**
   * Construct a matrix from column arrays
   */
  static fromColumns(c0: [number, number], c1: [number, number]): Matrix2 {
    return new Matrix2(c0[0], c1[0], c0[1], c1[1]);
  }

  /**
   * Construct a row-based matrix
   */
  constructor(
    public r0c0: number,
    public r0c1: number,
    public r1c0: number,
    public r1c1: number,
  ) {}

  /**
   * The number of rows in the matrix
   */
  get rowCount(): number {
    return 2;
  }

  /**
   * The number of columns in the matrix
   */
  get columnCount(): number {
    return 2;
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
    return this.r0c1 === 0 && this.r1c0 === 0;
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
    return new Matrix2(
      this.r0c0,
      this.r1c0,
      this.r0c1,
      this.r1c1,
    );
  }

  /**
   * The magnitude of the matrix
   */
  get determinant(): number {
    return this.r0c0 * this.r1c1 - this.r0c1 * this.r1c0;
  }

  /**
   * Does this matrix equal another?
   */
  equals(other: Matrix2): boolean {
    return this.r0c0 === other.r0c0 &&
      this.r0c1 === other.r0c1 &&
      this.r1c0 === other.r1c0 &&
      this.r1c1 === other.r1c1;
  }

  /**
   * Set the individual, row-based entries for this matrix
   */
  set(
    r0c0: number,
    r0c1: number,
    r1c0: number,
    r1c1: number,
  ): this {
    this.r0c0 = r0c0;
    this.r0c1 = r0c1;
    this.r1c0 = r1c0;
    this.r1c1 = r1c1;
    return this;
  }

  /**
   * Create a new matrix whose entries scaled by a scalar
   */
  scale(scalar: number): Matrix2 {
    return new Matrix2(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
    );
  }

  /**
   * Mutate this matrix by scaling each of its entries by a scalar
   */
  scaleMut(scalar: number): this {
    return this.set(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
    );
  }

  /**
   * Create a new matrix whose entries are the sum of this matrix and another
   */
  add(other: Matrix2): Matrix2 {
    return new Matrix2(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
    );
  }

  /**
   * Mutate this matrix by summing its entries with the entries of another matrix
   */
  addMut(other: Matrix2): this {
    return this.set(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
    );
  }

  /**
   * Create a new matrix whose entries are the difference of this matrix and another
   */
  subtract(other: Matrix2): Matrix2 {
    return new Matrix2(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
    );
  }

  /**
   * Mutate this matrix by subtracting the entries of another matrix from the entries of this matrix
   */
  subtractMut(other: Matrix2): this {
    return this.set(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
    );
  }

  /**
   * Create a new matrix by multiplying this matrix by another
   */
  multiply(other: Matrix2): Matrix2 {
    return new Matrix2(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1,
    );
  }

  /**
   * Mutate this matrix to be the product of itself and another
   */
  multiplyMut(other: Matrix2): this {
    return this.set(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1,
    );
  }
}
