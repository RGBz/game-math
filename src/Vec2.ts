import { Matrix2 } from "./Matrix2.ts";

/**
 * A vector in 2 dimensions
 */
export class Vec2 {
  /**
   * Get a new vector whose components are all 0 (AKA at the origin)
   */
  static get zero(): Vec2 {
    return new Vec2(0, 0);
  }

  /**
   * Create a vector from an angle in radians and a magnitude
   */
  static fromAngle(radians: number, magnitude: number): Vec2 {
    return new Vec2(Math.cos(radians), Math.sin(radians)).scaleMut(magnitude);
  }

  /**
   * Construct a 2D (x, y) vector
   */
  constructor(public x: number, public y: number) {}

  /**
   * Get the number of components in the vector
   */
  get size(): number {
    return 2;
  }

  /**
   * Square of the magnitude (length of the vector)
   */
  get magnitudeSquared(): number {
    return this.dot(this);
  }

  /**
   * Magnitude: the length of the vector
   */
  get magnitude(): number {
    return Math.sqrt(this.magnitudeSquared);
  }

  /**
   * Get a unit vector from the current vector (AKA same direction, but length = 1)
   */
  get unit(): Vec2 {
    return this.scale(1 / this.magnitude);
  }

  /**
   * As the array [x, y]
   */
  get array(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * Is this the zero vector?
   */
  get isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Confirm all components are identical between this vector and another
   */
  equals(other: Vec2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Set the individual (x, y) components
   */
  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Copy the components from another vector to this one
   */
  setFrom({ x, y }: Vec2): this {
    return this.set(x, y);
  }

  /**
   * Create a new vector whose components are scaled by the scalar
   */
  scale(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  /**
   * Mutate this vector's components to be scaled by the scalar
   */
  scaleMut(scalar: number): this {
    return this.set(this.x * scalar, this.y * scalar);
  }

  /**
   * Create a new vector that's the sum of this vector and another
   */
  add({ x, y }: Vec2): Vec2 {
    return new Vec2(this.x + x, this.y + y);
  }

  /**
   * Mutate this new vector to be the sum of this vector and another
   */
  addMut({ x, y }: Vec2): this {
    return this.set(this.x + x, this.y + y);
  }

  /**
   * Create a new vector that's the difference of this vector and another
   */
  subtract({ x, y }: Vec2): Vec2 {
    return new Vec2(this.x - x, this.y - y);
  }

  /**
   * Mutate this new vector to be the difference of this vector and another
   */
  subtractMut({ x, y }: Vec2): this {
    return this.set(this.x - x, this.y - y);
  }

  /**
   * Get the dot product of this vector and another
   */
  dot({ x: ox, y: oy }: Vec2): number {
    return this.x * ox + this.y * oy;
  }

  /**
   * Multiply this vector by a matrix
   */
  multiply(m: Matrix2): Vec2 {
    return new Vec2(
      m.r0c0 * this.x + m.r0c1 * this.y,
      m.r1c0 * this.x + m.r1c1 * this.y,
    );
  }

  /**
   * Mutate this vector by multiplying it by a matrix
   */
  multiplyMut(m: Matrix2): Vec2 {
    return this.set(
      m.r0c0 * this.x + m.r0c1 * this.y,
      m.r1c0 * this.x + m.r1c1 * this.y,
    );
  }

  /**
   * Are these vectors perpendicular?
   */
  isOrthogonalTo(other: Vec2): boolean {
    return this.dot(other) === 0;
  }

  /**
   * Get the distance squared between the points represented by this vector and another
   */
  distanceToSquared(other: Vec2): number {
    return other.subtract(this).magnitudeSquared;
  }

  /**
   * Get the distance between the points represented by this vector and another
   */
  distanceTo(other: Vec2): number {
    return other.subtract(this).magnitude;
  }

  /**
   * Create a new vector that's this one projected onto another
   */
  projectOnto(other: Vec2): Vec2 {
    return other.scale(this.dot(other) / other.dot(other));
  }

  /**
   * Mutate this vector to be this one projected onto another
   */
  projectOntoMut(other: Vec2): this {
    return this.setFrom(this.projectOnto(other));
  }

  /**
   * Create a new vector that's this one rejected from another
   */
  rejectFrom(other: Vec2): Vec2 {
    return this.subtract(this.projectOnto(other));
  }

  /**
   * Mutate this vector to be this one rejected from another
   */
  rejectFromMut(other: Vec2): this {
    return this.subtractMut(this.projectOnto(other));
  }
}
