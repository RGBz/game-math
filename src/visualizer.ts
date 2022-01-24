import { Matrix2 } from "./Matrix2.ts";
import { Vec2 } from "./Vec2.ts";

const CELL_SIZE = 10;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const r0c0 = document.getElementById("r0c0") as HTMLInputElement;
const r0c1 = document.getElementById("r0c1") as HTMLInputElement;
const r1c0 = document.getElementById("r1c0") as HTMLInputElement;
const r1c1 = document.getElementById("r1c1") as HTMLInputElement;

const handleResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
};

const render = () => {
  console.log("rendering");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.fillStyle = "#000";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const m = new Matrix2(
    Number(r0c0.value),
    Number(r0c1.value),
    Number(r1c0.value),
    Number(r1c1.value),
  );
  ctx.strokeStyle = "#fff";
  for (let y = 0; y < canvas.height; y += CELL_SIZE) {
    for (let x = 0; x < canvas.width; x += CELL_SIZE) {
      const above = new Vec2(x, y - CELL_SIZE).multiplyMut(m);
      const left = new Vec2(x - CELL_SIZE, y).multiplyMut(m);
      const v = new Vec2(x, y).multiplyMut(m);
      ctx.beginPath();
      ctx.moveTo(above.x, above.y);
      ctx.lineTo(v.x, v.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(v.x, v.y);
      ctx.stroke();
    }
  }
};

self.addEventListener("resize", handleResize);
r0c0.addEventListener("keyup", render);
r0c0.addEventListener("change", render);
r0c1.addEventListener("keyup", render);
r0c1.addEventListener("change", render);
r1c0.addEventListener("keyup", render);
r1c0.addEventListener("change", render);
r1c1.addEventListener("keyup", render);
r1c1.addEventListener("change", render);

handleResize();
