import { assert, assertEquals } from "testing/asserts.ts";
import { assertKindaEquals, suite, test } from "./testing.ts";
import { Matrix3 } from "./Matrix3.ts";
import { Vec3 } from "./Vec3.ts";

suite("Vec3");

test("a vector as an array is [x, y, z]", () => {
  assertEquals(new Vec3(101, 247, 99).array, [101, 247, 99]);
});

test("a vector's size is equal to the number of components it has", () => {
  assertEquals(Vec3.zero.size, 3);
});

test("a vector equals another when their components match", () => {
  assert(new Vec3(3, 4, 5).equals(new Vec3(3, 4, 5)));
  assert(!new Vec3(3, 4, 5).equals(new Vec3(6, 7, 8)));
});

test("the zero vector should have 0 for the x, y and z components", () => {
  assertEquals(Vec3.zero, new Vec3(0, 0, 0));
});

test("the magnitude squared of a vector is the sum of its components squared", () => {
  assertEquals(new Vec3(3, 4, 5).magnitudeSquared, 50);
});

test("the magnitude of a vector is the square root of the sum of its components squared", () => {
  assertEquals(new Vec3(1, 2, 2).magnitude, 3);
});

test("when a vector is scaled by a scalar it should result in a new vector where each component is the product of the original component and the scalar", () => {
  assertEquals(new Vec3(3, 4, 5).scale(2), new Vec3(6, 8, 10));
});

test("when a vector is mutated by a scalar it mutate each component such that the component's value is the product of the original component and the scalar", () => {
  assertEquals(new Vec3(3, 4, 5).scaleMut(2), new Vec3(6, 8, 10));
});

test("the unit of a vector should have a magnitude of 1", () => {
  assertKindaEquals(new Vec3(3, 4, 5).unit.magnitude, 1);
});

test("the unit of a vector scaled by the magnitude of the vector should the same components as the original vector", () => {
  assertKindaEquals(new Vec3(1, 2, 2).unit.scale(3), new Vec3(1, 2, 2));
});

test("a vector is a zero vector when all components are zero", () => {
  assert(new Vec3(0, 0, 0).isZero);
  assert(!new Vec3(1, 0, 0).isZero);
  assert(!new Vec3(0, 1, 0).isZero);
  assert(!new Vec3(0, 0, 1).isZero);
});

test("adding another vector to a vector should result in a new vector whose components are the sum of the paired components from each addend vector", () => {
  assertEquals(new Vec3(3, 4, 5).add(new Vec3(6, 7, 8)), new Vec3(9, 11, 13));
});

test("mutating a vector by adding another to it should update the vector such that it's components are increased by the matching component of the other vector", () => {
  assertEquals(
    new Vec3(3, 4, 5).addMut(new Vec3(6, 7, 8)),
    new Vec3(9, 11, 13),
  );
});

test("subtracting another vector from a vector should result in a new vector whose components are the difference of the paired components from each vector", () => {
  assertEquals(
    new Vec3(3, 4, 5).subtract(new Vec3(6, 7, 8)),
    new Vec3(-3, -3, -3),
  );
});

test("mutating a vector by subtracting another from it should update the vector such that it's components are decreased by the matching component of the other vector", () => {
  assertEquals(
    new Vec3(3, 4, 5).subtractMut(new Vec3(6, 7, 8)),
    new Vec3(-3, -3, -3),
  );
});

test("the dot product of two vectors is the sum of the products of their paired components", () => {
  assertEquals(new Vec3(3, 4, 5).dot(new Vec3(6, 7, 8)), 86);
});

test("the cross product of two vectors is a new vector that's the product of the two", () => {
  assertEquals(new Vec3(3, 4, 5).cross(new Vec3(6, 7, 8)), new Vec3(-3, 6, -3));
});

test("mutating a vector to be the cross product of itself and another vector results in it being the product of the two", () => {
  assertEquals(
    new Vec3(3, 4, 5).crossMut(new Vec3(6, 7, 8)),
    new Vec3(-3, 6, -3),
  );
});

test("multiplying by a matrix results in a new vector that is the linear combination of the columns of the matrix and the components of the vector", () => {
  assertEquals(
    new Vec3(3, 4, 5).multiply(Matrix3.fromRows(
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    )),
    new Vec3(6, 12, 20),
  );
});

test("mutating a vector by a matrix results the vector being a linear combination of the columns of the matrix and the components of the vector", () => {
  assertEquals(
    new Vec3(3, 4, 5).multiplyMut(Matrix3.fromRows(
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    )),
    new Vec3(6, 12, 20),
  );
});

test("vectors are orthogonal when their dot product is 0", () => {
  assert(new Vec3(1, 0, 1).isOrthogonalTo(new Vec3(0, 1, 0)));
});

test("vectors are parallel when their cross product is the zero vector", () => {
  assert(new Vec3(1, 0, 1).isParallelTo(new Vec3(3, 0, 3)));
});

test("projecting a vector onto another results in a new vector that points in the same direction as the other", () => {
  assertEquals(
    new Vec3(1, 2, 3).projectOnto(new Vec3(-1, 5, -2)),
    new Vec3(-0.1, 0.5, -0.2),
  );
});

test("mutating a vector by projecting it onto another results in the vector pointing in the same direction as the other", () => {
  assertEquals(
    new Vec3(1, 2, 3).projectOntoMut(new Vec3(-1, 5, -2)),
    new Vec3(-0.1, 0.5, -0.2),
  );
});

test("rejecting a vector from another results in a new vector that is perpendicular to the other", () => {
  assertEquals(
    new Vec3(1, 2, 3).rejectFrom(new Vec3(-1, 5, -2)),
    new Vec3(1.1, 1.5, 3.2),
  );
});

test("mutating a vector by rejecting it from another results in the vector being perpendicular to the other", () => {
  assertEquals(
    new Vec3(1, 2, 3).rejectFromMut(new Vec3(-1, 5, -2)),
    new Vec3(1.1, 1.5, 3.2),
  );
});
