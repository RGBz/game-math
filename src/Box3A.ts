import { Point3 } from "./Point3.ts";

/**
 * An axis-aligned, 3D Box
 */
export class Box3A {
  constructor(
    public center: Point3,
    public width: number,
    public height: number,
    public depth: number,
  ) {}

  get left(): number {
    return this.center.x - this.width / 2;
  }

  get right(): number {
    return this.center.x + this.width / 2;
  }

  get top(): number {
    return this.center.y + this.height / 2;
  }

  get bottom(): number {
    return this.center.y - this.height / 2;
  }

  get front(): number {
    return this.center.z + this.depth / 2;
  }

  get back(): number {
    return this.center.z - this.depth / 2;
  }

  isFullyRightOf(other: Box3A): boolean {
    return this.left > other.right;
  }

  isFullyAbove(other: Box3A): boolean {
    return this.bottom > other.top;
  }

  isFullyInFrontOf(other: Box3A): boolean {
    return this.back > other.front;
  }

  intersects(other: Box3A): boolean {
    return !(
      this.isFullyRightOf(other) || other.isFullyRightOf(this) ||
      this.isFullyAbove(other) || other.isFullyAbove(this) ||
      this.isFullyInFrontOf(other) || other.isFullyInFrontOf(this)
    );
  }
}
