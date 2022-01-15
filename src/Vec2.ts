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

  constructor(public x: number, public y: number) {}

  /**
   * Square of the magnitude (length of the vector)
   */
  get magnitudeSquared(): number {
    const { x, y } = this;
    return x * x + y * y;
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
   * Create a new vector whose components are scaled by the scalar
   */
  scale(scalar: number): Vec2 {
    const { x, y } = this;
    return new Vec2(x * scalar, y * scalar);
  }

  /**
   * Mutate this vector's components to be scaled by the scalar
   */
  scaleMut(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
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
    this.x += x;
    this.y += y;
    return this;
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
    this.x -= x;
    this.y -= y;
    return this;
  }
}
