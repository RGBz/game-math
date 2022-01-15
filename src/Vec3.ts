import { Matrix3 } from "./Matrix3.ts";
import { Vec } from "./Vec.ts";

/**
 * A vector in 3 dimensions
 */
export class Vec3 implements Vec<Vec3> {
  /**
   * Get a new vector whose components are all 0 (AKA at the origin)
   */
  static get zero(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  constructor(public x: number, public y: number, public z: number) {}

  /**
   * Get the number of components in the vector (it's always 3)
   */
  get size(): number {
    return 3;
  }

  /**
   * Confirm all components are identical between this vector and another
   */
  equals(other: Vec3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
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
  get unit(): Vec3 {
    return this.scale(1 / this.magnitude);
  }

  /**
   * Create a new vector whose components are scaled by the scalar
   */
  scale(scalar: number): Vec3 {
    const { x, y, z } = this;
    return new Vec3(x * scalar, y * scalar, z * scalar);
  }

  /**
   * Mutate this vector's components to be scaled by the scalar
   */
  scaleMut(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Create a new vector that's the sum of this vector and another
   */
  add({ x, y, z }: Vec3): Vec3 {
    return new Vec3(this.x + x, this.y + y, this.z + z);
  }

  /**
   * Mutate this new vector to be the sum of this vector and another
   */
  addMut({ x, y, z }: Vec3): this {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * Create a new vector that's the difference of this vector and another
   */
  subtract({ x, y, z }: Vec3): Vec3 {
    return new Vec3(this.x - x, this.y - y, this.z - z);
  }

  /**
   * Mutate this new vector to be the difference of this vector and another
   */
  subtractMut({ x, y, z }: Vec3): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  /**
   * Get the dot product of this vector and another
   */
  dot({ x: ox, y: oy, z: oz }: Vec3): number {
    const { x, y, z } = this;
    return x * ox + y * oy + z * oz;
  }

  /**
   * Multiply this vector by a matrix
   */
  multiply({ c0, c1, c2 }: Matrix3): Vec3 {
    return new Vec3(
      c0.dot(this),
      c1.dot(this),
      c2.dot(this),
    );
  }

  /**
   * Mutate this vector by multiplying it by a matrix
   */
  multiplyMut({ c0, c1, c2 }: Matrix3): Vec3 {
    this.x = c0.dot(this);
    this.y = c1.dot(this);
    this.z = c2.dot(this);
    return this;
  }
}
