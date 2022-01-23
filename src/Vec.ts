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
   * This vector as an array
   */
  array: number[];

  /**
   * Is this the zero vector?
   */
  isZero: boolean;

  /**
   * Does this vector equal another
   */
  equals(other: T): boolean;

  /**
   * Set the individual components of the vector
   */
  set(...components: number[]): this;

  /**
   * Copy the components from another vector to this one
   */
  setFrom(other: T): this;

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

  /**
   * Are these vectors perpendicular?
   */
  isOrthogonalTo(other: T): boolean;

  /**
   * Get the distance squared between the points represented by this vector and another
   */
  distanceToSquared(other: T): number;

  /**
   * Get the distance between the points represented by this vector and another
   */
  distanceTo(other: T): number;

  /**
   * Create a new vector that's this one projected onto another
   */
  projectOnto(other: T): T;

  /**
   * Mutate this vector to be this one projected onto another
   */
  projectOntoMut(other: T): this;

  /**
   * Create a new vector that's this one rejected from another
   */
  rejectFrom(other: T): T;

  /**
   * Mutate this vector to be this one rejected from another
   */
  rejectFromMut(other: T): this;
}
