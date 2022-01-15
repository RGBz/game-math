/**
 * A vector in 3 dimensions
 */
export class Vec3 {
  /**
   * Get a new vector whose components are all 0 (AKA at the origin)
   */
  static get zero(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  constructor(public x: number, public y: number, public z: number) {}

  /**
   * Square of the magnitude (length of the vector)
   */
  get magnitudeSquared(): number {
    const { x, y, z } = this;
    return x * x + y * y + z * z;
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
}
