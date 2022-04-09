import { Point2 } from "./Point2.ts";
import { Vec2 } from "./Vec2.ts";

/**
 * An axis-aligned 2D Box that assumes the origin is in the top left
 */
export class Box2A {
  private constructor(
    public center: Point2,
    public width: number,
    public height: number,
  ) {
  }

  static fromCenter(center: Point2, width: number, height: number): Box2A {
    return new Box2A(center, width, height);
  }

  static fromTopLeft(
    { x, y }: Point2,
    width: number,
    height: number,
  ): Box2A {
    return new Box2A(
      new Point2(x + width / 2, y + height / 2),
      width,
      height,
    );
  }

  static fromCenterOrigin(width: number, height: number): Box2A {
    return new Box2A(Point2.origin, width, height);
  }

  static fromTopLeftOrigin(width: number, height: number): Box2A {
    return Box2A.fromTopLeft(Point2.origin, width, height);
  }

  static fromEdges(
    top: number,
    left: number,
    bottom: number,
    right: number,
  ): Box2A {
    return Box2A.fromTopLeft(
      new Point2(left, top),
      right - left,
      bottom - top,
    );
  }

  get aspectRatio(): number {
    return this.width / this.height;
  }

  get left(): number {
    return this.center.x - this.width / 2;
  }

  get right(): number {
    return this.center.x + this.width / 2;
  }

  get top(): number {
    return this.center.y - this.height / 2;
  }

  get bottom(): number {
    return this.center.y + this.height / 2;
  }

  get topLeft(): Point2 {
    return new Point2(this.left, this.top);
  }

  get topRight(): Point2 {
    return new Point2(this.right, this.top);
  }

  get bottomLeft(): Point2 {
    return new Point2(this.left, this.bottom);
  }

  get bottomRight(): Point2 {
    return new Point2(this.right, this.bottom);
  }

  isFullyLeftOf(other: Box2A): boolean {
    return this.right <= other.left;
  }

  isFullyRightOf(other: Box2A): boolean {
    return this.left >= other.right;
  }

  isFullyAbove(other: Box2A): boolean {
    return this.bottom <= other.top;
  }

  isFullyBelow(other: Box2A): boolean {
    return this.top >= other.bottom;
  }

  intersects(other: Box2A): boolean {
    return !(
      this.isFullyLeftOf(other) || this.isFullyRightOf(this) ||
      this.isFullyAbove(other) || this.isFullyBelow(this)
    );
  }

  intersection(other: Box2A): Box2A | null {
    return this.intersects(other)
      ? Box2A.fromEdges(
        Math.max(this.top, other.top),
        Math.max(this.left, other.left),
        Math.min(this.bottom, other.bottom),
        Math.min(this.right, other.right),
      )
      : null;
  }

  translate(delta: Vec2): Box2A {
    return new Box2A(this.center.add(delta), this.width, this.height);
  }

  translateMut(delta: Vec2): this {
    this.center.addMut(delta);
    return this;
  }

  /**
   * Project a point within this box onto another box
   */
  project({ x, y }: Point2, other: Box2A): Point2 {
    return new Point2(
      other.left + (x - this.left) * (other.width / this.width),
      other.top + (y - this.top) * (other.height / this.height),
    );
  }

  /**
   * Project a box within this box onto another box
   */
  projectBox({ center, width, height }: Box2A, target: Box2A): Box2A {
    return Box2A.fromCenter(
      this.project(center, target),
      width * (target.width / this.width),
      height * (target.height / this.height),
    );
  }

  scaleIndependent(xScale: number, yScale: number): Box2A {
    return new Box2A(
      this.center,
      this.width * xScale,
      this.height * yScale,
    );
  }

  scaleIndependentMut(widthScale: number, heightScale: number): this {
    this.width *= widthScale;
    this.height *= heightScale;
    return this;
  }

  scaleUniform(scale: number): Box2A {
    return this.scaleIndependent(scale, scale);
  }

  scaleUniformMut(scale: number): this {
    return this.scaleIndependentMut(scale, scale);
  }
}
