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

  /**
   * Construct a 3D vector (x, y, z)
   */
  constructor(public x: number, public y: number, public z: number) {}

  /**
   * Get the number of components in the vector
   */
  get size(): number {
    return 3;
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
   * As an array [x, y, z]
   */
  get array(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  /**
   * Confirm all components are identical between this vector and another
   */
  equals(other: Vec3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Set the individual (x, y, z) components
   */
  set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Create a new vector whose components are scaled by the scalar
   */
  scale(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * Mutate this vector's components to be scaled by the scalar
   */
  scaleMut(scalar: number): this {
    return this.set(this.x * scalar, this.y * scalar, this.z * scalar);
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
    return this.set(this.x + x, this.y + y, this.z + z);
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
    return this.set(this.x - x, this.y - y, this.z - z);
  }

  /**
   * Get the dot product of this vector and another
   */
  dot({ x: ox, y: oy, z: oz }: Vec3): number {
    return this.x * ox + this.y * oy + this.z * oz;
  }

  /**
   * Create a new vector that's the cross product of this one and another
   */
  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  /**
   * Mutate this vector to be the cross product of this one and another
   */
  crossMut(other: Vec3): Vec3 {
    return this.set(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  /**
   * Multiply this vector by a matrix
   */
  multiply(m: Matrix3): Vec3 {
    return new Vec3(
      m.r0c0 * this.x + m.r0c1 * this.y + m.r0c2 * this.z,
      m.r1c0 * this.x + m.r1c1 * this.y + m.r1c2 * this.z,
      m.r2c0 * this.x + m.r2c1 * this.y + m.r2c2 * this.z,
    );
  }

  /**
   * Mutate this vector by multiplying it by a matrix
   */
  multiplyMut(m: Matrix3): Vec3 {
    return this.set(
      m.r0c0 * this.x + m.r0c1 * this.y + m.r0c2 * this.z,
      m.r1c0 * this.x + m.r1c1 * this.y + m.r1c2 * this.z,
      m.r2c0 * this.x + m.r2c1 * this.y + m.r2c2 * this.z,
    );
  }

  /**
   * Are these vectors perpindicular?
   */
  isOrthogonalTo(other: Vec3): boolean {
    return this.dot(other) === 0;
  }
}
