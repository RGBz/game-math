import { Matrix2 } from "./Matrix2.ts";
import { Vec } from "./Vec.ts";

/**
 * A vector in 2 dimensions
 */
export class Vec2 implements Vec<Vec2> {
  /**
   * Get a new vector whose components are all 0 (AKA at the origin)
   */
  static get zero(): Vec2 {
    return new Vec2(0, 0);
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
}
