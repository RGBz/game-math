import { assertEquals } from "testing/asserts.ts";
import { assertKindaEquals } from "./util.ts";
import { Vec2 } from "./Vec2.ts";

Deno.test("the zero vector should have 0 for both x and y components", () => {
  const zero = Vec2.zero;
  assertEquals(zero.x, 0);
  assertEquals(zero.y, 0);
});

Deno.test("The magnitude squared of a vector is the square of its x component summed with the square of its y component", () => {
  const v = new Vec2(3, 4);
  assertEquals(v.magnitudeSquared, 25);
});

Deno.test("The magnitude of a vector is the square root of the sum of the squares of its x and y components", () => {
  const v = new Vec2(3, 4);
  assertEquals(v.magnitude, 5);
});

Deno.test("When a vector is scaled by a scalar it should result in a new vector where each component is the product of the original component and the scalar", () => {
  const v = new Vec2(3, 4);
  const { x, y } = v.scale(2);
  assertEquals(x, 6);
  assertEquals(y, 8);
});

Deno.test("When a vector is mutated by a scalar it mutate each component such that the component's value is the product of the original component and the scalar", () => {
  const v = new Vec2(3, 4);
  v.scaleMut(2);
  assertEquals(v.x, 6);
  assertEquals(v.y, 8);
});

Deno.test("The unit of a vector should have a magnitude of 1", () => {
  const v = new Vec2(3, 4);
  assertEquals(v.unit.magnitude, 1);
});

Deno.test("The unit of a vector scaled by the magnitude of the vector should the same x and y components as the original vector", () => {
  const v = new Vec2(3, 4);
  const { x, y } = v.unit.scale(v.magnitude);
  assertKindaEquals(x, 3);
  assertKindaEquals(y, 4);
});

Deno.test("Adding another vector to a vector should result in a new vector whose components are the sum of the paired components from each addend vector", () => {
  const v = new Vec2(3, 4);
  const w = new Vec2(5, 6);
  const { x, y } = v.add(w);
  assertEquals(x, 8);
  assertEquals(y, 10);
});

Deno.test("Mutating a vector by adding another to it should update the vector such that it's components are increased by the matching component of the other vector", () => {
  const v = new Vec2(3, 4);
  const w = new Vec2(5, 6);
  v.addMut(w);
  assertEquals(v.x, 8);
  assertEquals(v.y, 10);
});

Deno.test("Subtracting another vector from a vector should result in a new vector whose components are the difference of the paired components from each vector", () => {
  const v = new Vec2(3, 4);
  const w = new Vec2(5, 6);
  const { x, y } = v.subtract(w);
  assertEquals(x, -2);
  assertEquals(y, -2);
});

Deno.test("Mutating a vector by subtracting another from it should update the vector such that it's components are decreased by the matching component of the other vector", () => {
  const v = new Vec2(3, 4);
  const w = new Vec2(5, 6);
  v.subtractMut(w);
  assertEquals(v.x, -2);
  assertEquals(v.y, -2);
});
