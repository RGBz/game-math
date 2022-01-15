export interface Vec<T extends Vec<T>> {
  /**
   * The number of entries (AKA components or scalars) in the vector
   */
  size: number;

  /**
   * The squared magnitude (length) of the vector
   */
  magnitudeSquared: number;

  /**
   * The magnitude (AKA length or distance) of the vector
   */
  magnitude: number;

  /**
   * A vector pointing in the same direction, but with a length (magnitude) of 1
   */
  unit: T;

  /**
   * The dot product of this vector and another
   */
  dot(other: T): number;

  /**
   * Create a new vector that's this one scaled by the scalar
   */
  scale(scalar: number): T;

  /**
   * Mutate this vector to be scaled by the scalar
   */
  scaleMut(scalar: number): this;

  /**
   * Create a new vector that's the sum of this one and another
   */
  add(other: T): T;

  /**
   * Mutate this vector to be the sum of this vector and another
   */
  addMut(other: T): this;

  /**
   * Create a new vector that's the difference of this one and another
   */
  subtract(other: T): T;

  /**
   * Mutate this vector to be the difference of this vector and another
   */
  subtractMut(other: T): this;
}
