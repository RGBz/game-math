import { Graphic } from "./Graphic.ts";
import { Vec2 } from "../Vec2.ts";

export class GroupGraphic extends Graphic {
  render(ctx: CanvasRenderingContext2D, _: Vec2 | null): void {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.5;
    const center = new Vec2(this.width / 2, this.height / 2).addMut(
      this.position,
    );
    const radius = Math.min(this.width, this.height);
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
