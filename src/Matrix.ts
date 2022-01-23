export interface Matrix<T extends Matrix<T>> {
  /**
   * The number of rows in the matrix
   */
  rowCount: number;

  /**
   * The number of columns in the matrix
   */
  columnCount: number;

  /**
   * Are the number of rows equal to the number of columns?
   */
  isSquare: boolean;

  /**
   * Are all of the entries off of the main diagonal equal to 0?
   */
  isDiagonal: boolean;

  /**
   * Is the transpose of this matrix equal to itself? (AKA is it square and diagonal?)
   */
  isSymmetric: boolean;

  /**
   * Is the transpose of this matrix equal to the negation of itself? (AKA skew-symmetric)
   */
  isAntiSymmetric: boolean;

  /**
   * Create a new matrix whose rows are the columns from this matrix
   */
  transpose: T;

  /**
   * Create a new matrix that is the inverse of this one (multiplying by it gives us the identity matrix)
   */
  inverse: T;

  /**
   * The area or volume of the matrix
   */
  determinant: number;

  /**
   * Does this matrix equal another?
   */
  equals(other: T): boolean;

  /**
   * Set the individual, row-based entries for this matrix
   */
  set(...entries: number[]): this;

  /**
   * Create a new matrix whose entries scaled by a scalar
   */
  scale(scalar: number): T;

  /**
   * Mutate this matrix by scaling each of its entries by a scalar
   */
  scaleMut(scalar: number): this;

  /**
   * Create a new matrix whose entries are the sum of this matrix and another
   */
  add(other: T): T;

  /**
   * Mutate this matrix by summing its entries with the entries of another matrix
   */
  addMut(other: T): this;

  /**
   * Create a new matrix whose entries are the difference of this matrix and another
   */
  subtract(other: T): T;

  /**
   * Mutate this matrix by subtracting the entries of another matrix from the entries of this matrix
   */
  subtractMut(other: T): this;

  /**
   * Create a new matrix by multiplying this matrix by another
   */
  multiply(other: T): T;

  /**
   * Mutate this matrix to be the product of itself and another
   */
  multiplyMut(other: T): T;
}
