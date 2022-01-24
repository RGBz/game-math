import { Matrix2 } from "../Matrix2.ts";
import { Rect2A } from "../Rect2A.ts";
import { Vec2 } from "../Vec2.ts";

/** */
export abstract class Graphic {
  private transform: Matrix2;

  constructor(public region: Rect2A) {
    this.transform = new Matrix2(width, 0, 0, height);
  }

  line(
    ctx: CanvasRenderingContext2D,
    start: Vec2,
    next: Vec2,
    ...additional: Vec2[]
  ): void {
    const { center, width, height } = this.region;
    const transform = new Matrix2(width, 0, 0, height);
    const startT = center.add(start.multiply(transform));
    ctx.beginPath();
    ctx.moveTo(startT.x, startT.y);
    const nextT = center.add(next.multiply(transform));
    ctx.lineTo(nextT.x, nextT.y);
    for (const p of additional) {
      const { x, y } = center.add(p.multiply(transform));
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  arc(
    ctx: CanvasRenderingContext2D,
    center: Vec2,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise = false,
  ): void {
    const { width, height } = this.region;
    const radiusT = Math.min(width, height) * radius;
    ctx.beginPath();
    ctx.arc(
      center.x,
      center.y,
      radiusT,
      startAngle,
      endAngle,
      counterClockwise,
    );
    ctx.stroke();
  }

  abstract render(ctx: CanvasRenderingContext2D, pointer: Vec2 | null): void;
}
