import { assert, assertEquals } from "testing/asserts.ts";
import { assertKindaEquals, suite, test } from "./testing.ts";
import { Matrix2 } from "./Matrix2.ts";
import { Vec2 } from "./Vec2.ts";

suite("Vec2");

test("a vector as an array is [x, y]", () => {
  assertEquals(new Vec2(101, 247).array, [101, 247]);
});

test("a vector's size is equal to the number of components it has", () => {
  assertEquals(Vec2.zero.size, 2);
});

test("a vector equals another when their components match", () => {
  assert(new Vec2(3, 4).equals(new Vec2(3, 4)));
  assert(!new Vec2(3, 4).equals(new Vec2(5, 6)));
});

test("the zero vector should have 0 for both x and y components", () => {
  assertEquals(Vec2.zero, new Vec2(0, 0));
});

test("the magnitude squared of a vector is the square of its x component summed with the square of its y component", () => {
  assertEquals(new Vec2(3, 4).magnitudeSquared, 25);
});

test("the magnitude of a vector is the square root of the sum of the squares of its x and y components", () => {
  assertEquals(new Vec2(3, 4).magnitude, 5);
});

test("when a vector is scaled by a scalar it should result in a new vector where each component is the product of the original component and the scalar", () => {
  assertEquals(new Vec2(3, 4).scale(2), new Vec2(6, 8));
});

test("when a vector is mutated by a scalar it mutate each component such that the component's value is the product of the original component and the scalar", () => {
  assertEquals(new Vec2(3, 4).scaleMut(2), new Vec2(6, 8));
});

test("the unit of a vector should have a magnitude of 1", () => {
  assertEquals(new Vec2(3, 4).unit.magnitude, 1);
});

test("the unit of a vector scaled by the magnitude of the vector should the same x and y components as the original vector", () => {
  assertKindaEquals(new Vec2(3, 4).unit.scale(5), new Vec2(3, 4));
});

test("a vector is a zero vector when all components are zero", () => {
  assert(new Vec2(0, 0).isZero);
  assert(!new Vec2(1, 0).isZero);
  assert(!new Vec2(0, 1).isZero);
});

test("adding another vector to a vector should result in a new vector whose components are the sum of the paired components from each addend vector", () => {
  assertEquals(new Vec2(3, 4).add(new Vec2(5, 6)), new Vec2(8, 10));
});

test("mutating a vector by adding another to it should update the vector such that it's components are increased by the matching component of the other vector", () => {
  assertEquals(new Vec2(3, 4).addMut(new Vec2(5, 6)), new Vec2(8, 10));
});

test("subtracting another vector from a vector should result in a new vector whose components are the difference of the paired components from each vector", () => {
  assertEquals(new Vec2(3, 4).subtract(new Vec2(5, 6)), new Vec2(-2, -2));
});

test("mutating a vector by subtracting another from it should update the vector such that it's components are decreased by the matching component of the other vector", () => {
  assertEquals(new Vec2(3, 4).subtractMut(new Vec2(5, 6)), new Vec2(-2, -2));
});

test("multiplying by a matrix results in a new vector that is the linear combination of the columns of the matrix and the components of the vector", () => {
  assertEquals(
    new Vec2(3, 4).multiply(Matrix2.fromRows(
      [2, 1],
      [1, 3],
    )),
    new Vec2(10, 15),
  );
});

test("mutating a vector by a matrix results the vector being a linear combination of the columns of the matrix and the components of the vector", () => {
  assertEquals(
    new Vec2(3, 4).multiplyMut(Matrix2.fromRows(
      [2, 1],
      [1, 3],
    )),
    new Vec2(10, 15),
  );
});

test("vectors are orthogonal when their dot product is 0", () => {
  assert(new Vec2(1, 0).isOrthogonalTo(new Vec2(0, 1)));
});

test("projecting a vector onto another results in a new vector that points in the same direction as the other", () => {
  assertEquals(
    new Vec2(1, 2).projectOnto(new Vec2(-1, 2)),
    new Vec2(-0.6, 1.2),
  );
});

test("mutating a vector by projecting it onto another results in the vector pointing in the same direction as the other", () => {
  assertEquals(
    new Vec2(1, 2).projectOntoMut(new Vec2(-1, 2)),
    new Vec2(-0.6, 1.2),
  );
});
