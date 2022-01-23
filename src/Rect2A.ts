import { Vec2 } from "./Vec2.ts";

/**
 * An axis-aligned rectangle
 */
export class Rect2A {
  constructor(
    public topLeft: Vec2,
    public width: number,
    public height: number,
  ) {}

  get top(): number {
    return this.topLeft.y;
  }

  get left(): number {
    return this.topLeft.x;
  }

  get bottom(): number {
    return this.topLeft.y + this.height;
  }

  get right(): number {
    return this.topLeft.x + this.width;
  }

  get center(): Vec2 {
    return new Vec2(
      this.left + this.width / 2,
      this.top + this.height / 2,
    );
  }
}
