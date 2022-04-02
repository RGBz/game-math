import { Matrix3 } from "./Matrix3.ts";
import { Vec3 } from "./Vec3.ts";

export class Point3 extends Vec3 {
  /**
   * Create a new point whose components are all 0
   */
  static get origin(): Point3 {
    return new Point3(0, 0, 0);
  }

  /**
   * Create a new point that's a clone of this one
   */
  clone(): Point3 {
    return new Point3(this.x, this.y, this.z);
  }

  /**
   * Create a new point that's the sum of this point and a vector
   */
  add({ x, y, z }: Vec3): Point3 {
    return new Point3(this.x + x, this.y + y, this.z + z);
  }

  /**
   * Create a new point that's the difference of this point and a vector
   */
  subtract({ x, y, z }: Vec3): Point3 {
    return new Point3(this.x - x, this.y - y, this.z - z);
  }

  /**
   * Multiply this point by a matrix
   */
  multiply(m: Matrix3): Point3 {
    return new Point3(
      m.r0c0 * this.x + m.r0c1 * this.y + m.r0c2 * this.z,
      m.r1c0 * this.x + m.r1c1 * this.y + m.r1c2 * this.z,
      m.r2c0 * this.x + m.r2c1 * this.y + m.r2c2 * this.z,
    );
  }

  /**
   * Get the distance squared between the points represented by this point and another
   */
  distanceToSquared(other: Point3): number {
    return other.subtract(this).magnitudeSquared;
  }

  /**
   * Get the distance between the points represented by this point and another
   */
  distanceTo(other: Point3): number {
    return other.subtract(this).magnitude;
  }

  /**
   * Is this point near the other within the distance?
   */
  isNearWithin(other: Point3, distance: number): boolean {
    return other.subtract(this).magnitudeSquared <= distance * distance;
  }
}
