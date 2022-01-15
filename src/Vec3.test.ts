import { assertEquals } from "testing/asserts.ts";
import { assertKindaEquals } from "./util.ts";
import { Vec3 } from "./Vec3.ts";

Deno.test("the zero vector should have 0 for the x, y and z components", () => {
  const zero = Vec3.zero;
  assertEquals(zero.x, 0);
  assertEquals(zero.y, 0);
  assertEquals(zero.z, 0);
});

Deno.test("The magnitude squared of a vector is the sum of its components squared", () => {
  const v = new Vec3(3, 4, 5);
  assertEquals(v.magnitudeSquared, 50);
});

Deno.test("The magnitude of a vector is the square root of the sum of its components squared", () => {
  const v = new Vec3(1, 2, 2);
  assertEquals(v.magnitude, 3);
});

Deno.test("When a vector is scaled by a scalar it should result in a new vector where each component is the product of the original component and the scalar", () => {
  const v = new Vec3(3, 4, 5);
  const { x, y, z } = v.scale(2);
  assertEquals(x, 6);
  assertEquals(y, 8);
  assertEquals(z, 10);
});

Deno.test("When a vector is mutated by a scalar it mutate each component such that the component's value is the product of the original component and the scalar", () => {
  const v = new Vec3(3, 4, 5);
  v.scaleMut(2);
  assertEquals(v.x, 6);
  assertEquals(v.y, 8);
  assertEquals(v.z, 10);
});

Deno.test("The unit of a vector should have a magnitude of 1", () => {
  const v = new Vec3(3, 4, 5);
  assertKindaEquals(v.unit.magnitude, 1);
});

Deno.test("The unit of a vector scaled by the magnitude of the vector should the same components as the original vector", () => {
  const v = new Vec3(3, 4, 5);
  const { x, y, z } = v.unit.scale(v.magnitude);
  assertKindaEquals(x, 3);
  assertKindaEquals(y, 4);
  assertKindaEquals(z, 5);
});

Deno.test("Adding another vector to a vector should result in a new vector whose components are the sum of the paired components from each addend vector", () => {
  const v = new Vec3(3, 4, 5);
  const w = new Vec3(6, 7, 8);
  const { x, y, z } = v.add(w);
  assertEquals(x, 9);
  assertEquals(y, 11);
  assertEquals(z, 13);
});

Deno.test("Mutating a vector by adding another to it should update the vector such that it's components are increased by the matching component of the other vector", () => {
  const v = new Vec3(3, 4, 5);
  const w = new Vec3(6, 7, 8);
  v.addMut(w);
  assertEquals(v.x, 9);
  assertEquals(v.y, 11);
  assertEquals(v.z, 13);
});

Deno.test("Subtracting another vector from a vector should result in a new vector whose components are the difference of the paired components from each vector", () => {
  const v = new Vec3(3, 4, 5);
  const w = new Vec3(6, 7, 8);
  const { x, y, z } = v.subtract(w);
  assertEquals(x, -3);
  assertEquals(y, -3);
  assertEquals(z, -3);
});

Deno.test("Mutating a vector by subtracting another from it should update the vector such that it's components are decreased by the matching component of the other vector", () => {
  const v = new Vec3(3, 4, 5);
  const w = new Vec3(6, 7, 8);
  v.subtractMut(w);
  assertEquals(v.x, -3);
  assertEquals(v.y, -3);
  assertEquals(v.z, -3);
});
