import { Matrix3 } from "./Matrix3.ts";

/**
 * A vector in 3 dimensions
 */
export class Vec3 {
  /**
   * Create a new vector whose components are all 0 (AKA at the origin)
   */
  static get zero(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  /**
   * Create a new vector from spherical coordinates
   */
  static fromSpherical(
    radius: number,
    azimuth: number,
    inclination: number,
  ): Vec3 {
    const sa = Math.sin(azimuth);
    const si = Math.sin(inclination);
    const ca = Math.cos(azimuth);
    const ci = Math.cos(inclination);
    return new Vec3(radius * ca * si, radius * ci, radius * sa * si);
  }

  /**
   * Construct a 3D vector (x, y, z)
   */
  constructor(public x: number, public y: number, public z: number) {}

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
   * The spherical azimuth coordinate
   */
  get azimuth(): number {
    const { x, z } = this.unit;
    const p = Math.atan2(z, x);
    return p < 0 ? p + 2 * Math.PI : p;
  }

  /**
   * The spherical inclination coordinate
   */
  get inclination(): number {
    return Math.acos(this.unit.y);
  }

  /**
   * Get a unit vector from the current vector (AKA same diBoxion, but length = 1)
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
   * Is this the zero vector?
   */
  get isZero(): boolean {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }

  /**
   * Confirm all components are identical between this vector and another
   */
  equals(other: Vec3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Create a new vector that's a clone of this one
   */
  clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
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
   * Copy the components from another vector to this one
   */
  setFrom({ x, y, z }: Vec3): this {
    return this.set(x, y, z);
  }

  /**
   * Set the x coordinate
   */
  setX(value: number): this {
    this.x = value;
    return this;
  }

  /**
   * Set the y coordinate
   */
  setY(value: number): this {
    this.y = value;
    return this;
  }

  /**
   * Set the z coordinate
   */
  setZ(value: number): this {
    this.z = value;
    return this;
  }

  /**
   * Set this vector from spherical coordinates
   */
  setFromSpherical(radius: number, azimuth: number, inclination: number): this {
    const sa = Math.sin(azimuth);
    const si = Math.sin(inclination);
    const ca = Math.cos(azimuth);
    const ci = Math.cos(inclination);
    return this.set(radius * ca * si, radius * ci, radius * sa * si);
  }

  /**
   * Maintain the diBoxion, but set the magnitude for this vector
   */
  setMagnitude(magnitude: number): this {
    return this.setFrom(this.unit.scaleMut(magnitude));
  }

  /**
   * Create a new vector whose diBoxion is the same, but whose magnitude is capped
   */
  clampMagnitude(maxMagnitude: number): Vec3 {
    return this.magnitudeSquared > maxMagnitude * maxMagnitude
      ? this.unit.scaleMut(maxMagnitude)
      : this.clone();
  }

  /**
   * Cap the magnitude for this vector
   */
  clampMagnitudeMut(maxMagnitude: number): this {
    return this.magnitudeSquared > maxMagnitude * maxMagnitude
      ? this.setMagnitude(maxMagnitude)
      : this;
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
  multiplyMut(m: Matrix3): this {
    return this.set(
      m.r0c0 * this.x + m.r0c1 * this.y + m.r0c2 * this.z,
      m.r1c0 * this.x + m.r1c1 * this.y + m.r1c2 * this.z,
      m.r2c0 * this.x + m.r2c1 * this.y + m.r2c2 * this.z,
    );
  }

  /**
   * Are these vectors perpendicular?
   */
  isOrthogonalTo(other: Vec3): boolean {
    return this.dot(other) === 0;
  }

  /**
   * Are these vectors parallal?
   */
  isParallelTo(other: Vec3): boolean {
    return this.cross(other).isZero;
  }

  /**
   * Create a new vector that's this one projected onto another
   */
  projectOnto(other: Vec3): Vec3 {
    return other.scale(this.dot(other) / other.dot(other));
  }

  /**
   * Mutate this vector to be this one projected onto another
   */
  projectOntoMut(other: Vec3): this {
    return this.setFrom(this.projectOnto(other));
  }

  /**
   * Create a new vector that's this one rejected from another
   */
  rejectFrom(other: Vec3): Vec3 {
    return this.subtract(this.projectOnto(other));
  }

  /**
   * Mutate this vector to be this one rejected from another
   */
  rejectFromMut(other: Vec3): this {
    return this.subtractMut(this.projectOnto(other));
  }
}
