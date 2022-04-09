import { Matrix2 } from "./Matrix2.ts";
import { Vec2 } from "./Vec2.ts";

export class Point2 extends Vec2 {
  /**
   * Create a new point whose components are all 0
   */
  static get origin(): Point2 {
    return new Point2(0, 0);
  }

  /**
   * Create a new point that's a clone of this one
   */
  clone(): Point2 {
    return new Point2(this.x, this.y);
  }

  /**
   * Create a new point that's the sum of this point and a vector
   */
  add({ x, y }: Vec2): Point2 {
    return new Point2(this.x + x, this.y + y);
  }

  /**
   * Create a new point that's the difference of this point and a vector
   */
  subtract({ x, y }: Vec2): Point2 {
    return new Point2(this.x - x, this.y - y);
  }

  /**
   * Multiply this point by a matrix
   */
  multiply(m: Matrix2): Point2 {
    return new Point2(
      m.r0c0 * this.x + m.r0c1 * this.y,
      m.r1c0 * this.x + m.r1c1 * this.y,
    );
  }

  /**
   * Get the distance squared between the points represented by this point and another
   */
  distanceToSquared(other: Point2): number {
    return other.subtract(this).magnitudeSquared;
  }

  /**
   * Get the distance between the points represented by this point and another
   */
  distanceTo(other: Point2): number {
    return other.subtract(this).magnitude;
  }

  /**
   * Is this point near the other within the distance?
   */
  isNearWithin(other: Point2, distance: number): boolean {
    return other.subtract(this).magnitudeSquared <= distance * distance;
  }
}
