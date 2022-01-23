class Matrix2 {
  r0c0;
  r0c1;
  r1c0;
  r1c1;
  static get zero() {
    return new Matrix2(0, 0, 0, 0);
  }
  static get identity() {
    return new Matrix2(1, 0, 0, 1);
  }
  static fromRows(r0, r1) {
    return new Matrix2(r0[0], r0[1], r1[0], r1[1]);
  }
  static fromColumns(c0, c1) {
    return new Matrix2(c0[0], c1[0], c0[1], c1[1]);
  }
  constructor(r0c01, r0c11, r1c01, r1c11) {
    this.r0c0 = r0c01;
    this.r0c1 = r0c11;
    this.r1c0 = r1c01;
    this.r1c1 = r1c11;
  }
  get rowCount() {
    return 2;
  }
  get columnCount() {
    return 2;
  }
  get isSquare() {
    return true;
  }
  get isDiagonal() {
    return this.r0c1 === 0 && this.r1c0 === 0;
  }
  get isSymmetric() {
    return this.isDiagonal;
  }
  get isAntiSymmetric() {
    return this.transpose.equals(this.scale(-1));
  }
  get transpose() {
    return new Matrix2(this.r0c0, this.r1c0, this.r0c1, this.r1c1);
  }
  equals(other) {
    return this.r0c0 === other.r0c0 && this.r0c1 === other.r0c1 &&
      this.r1c0 === other.r1c0 && this.r1c1 === other.r1c1;
  }
  set(r0c02, r0c12, r1c02, r1c12) {
    this.r0c0 = r0c02;
    this.r0c1 = r0c12;
    this.r1c0 = r1c02;
    this.r1c1 = r1c12;
    return this;
  }
  scale(scalar) {
    return new Matrix2(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
    );
  }
  scaleMut(scalar) {
    return this.set(
      this.r0c0 * scalar,
      this.r0c1 * scalar,
      this.r1c0 * scalar,
      this.r1c1 * scalar,
    );
  }
  add(other) {
    return new Matrix2(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
    );
  }
  addMut(other) {
    return this.set(
      this.r0c0 + other.r0c0,
      this.r0c1 + other.r0c1,
      this.r1c0 + other.r1c0,
      this.r1c1 + other.r1c1,
    );
  }
  subtract(other) {
    return new Matrix2(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
    );
  }
  subtractMut(other) {
    return this.set(
      this.r0c0 - other.r0c0,
      this.r0c1 - other.r0c1,
      this.r1c0 - other.r1c0,
      this.r1c1 - other.r1c1,
    );
  }
  multiply(other) {
    return new Matrix2(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1,
    );
  }
  multiplyMut(other) {
    return this.set(
      this.r0c0 * other.r0c0 + this.r0c1 * other.r1c0,
      this.r0c0 * other.r0c1 + this.r0c1 * other.r1c1,
      this.r1c0 * other.r0c0 + this.r1c1 * other.r1c0,
      this.r1c0 * other.r0c1 + this.r1c1 * other.r1c1,
    );
  }
}
class Vec2 {
  x;
  y;
  static get zero() {
    return new Vec2(0, 0);
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get size() {
    return 2;
  }
  get magnitudeSquared() {
    return this.dot(this);
  }
  get magnitude() {
    return Math.sqrt(this.magnitudeSquared);
  }
  get unit() {
    return this.scale(1 / this.magnitude);
  }
  get array() {
    return [
      this.x,
      this.y,
    ];
  }
  get isZero() {
    return this.x === 0 && this.y === 0;
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setFrom({ x, y }) {
    return this.set(x, y);
  }
  scale(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }
  scaleMut(scalar) {
    return this.set(this.x * scalar, this.y * scalar);
  }
  add({ x, y }) {
    return new Vec2(this.x + x, this.y + y);
  }
  addMut({ x, y }) {
    return this.set(this.x + x, this.y + y);
  }
  subtract({ x, y }) {
    return new Vec2(this.x - x, this.y - y);
  }
  subtractMut({ x, y }) {
    return this.set(this.x - x, this.y - y);
  }
  dot({ x: ox, y: oy }) {
    return this.x * ox + this.y * oy;
  }
  multiply(m) {
    return new Vec2(
      m.r0c0 * this.x + m.r0c1 * this.y,
      m.r1c0 * this.x + m.r1c1 * this.y,
    );
  }
  multiplyMut(m) {
    return this.set(
      m.r0c0 * this.x + m.r0c1 * this.y,
      m.r1c0 * this.x + m.r1c1 * this.y,
    );
  }
  isOrthogonalTo(other) {
    return this.dot(other) === 0;
  }
  projectOnto(other) {
    return other.scale(this.dot(other) / other.dot(other));
  }
  projectOntoMut(other) {
    return this.setFrom(this.projectOnto(other));
  }
  rejectFrom(other) {
    return this.subtract(this.projectOnto(other));
  }
  rejectFromMut(other) {
    return this.subtractMut(this.projectOnto(other));
  }
}
const CELL_SIZE = 10;
const canvas = document.getElementById("canvas");
const r0c0 = document.getElementById("r0c0");
const r0c1 = document.getElementById("r0c1");
const r1c0 = document.getElementById("r1c0");
const r1c1 = document.getElementById("r1c1");
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
      const above = new Vec2(x, y - 10).multiplyMut(m);
      const left = new Vec2(x - 10, y).multiplyMut(m);
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
