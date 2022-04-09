import { assert, assertEquals } from "testing/asserts.ts";
import { suite, test } from "./testing.ts";
import { Matrix3 } from "./Matrix3.ts";
import { Point3 } from "./Point3.ts";
import { Vec3 } from "./Vec3.ts";

suite("Point3");

test("a point as an array is [x, y, z]", () => {
  assertEquals(new Point3(101, 247, 99).array, [101, 247, 99]);
});

test("the zero point should have 0 for the x, y and z components", () => {
  assertEquals(Point3.origin, new Point3(0, 0, 0));
});

test("cloning a point results in a new point with identical coordinates", () => {
  assertEquals(new Point3(101, 247, 99).clone(), new Point3(101, 247, 99));
});

test("a point equals another when their components match", () => {
  assert(new Point3(3, 4, 5).equals(new Point3(3, 4, 5)));
  assert(!new Point3(3, 4, 5).equals(new Point3(6, 7, 8)));
});

test("adding a vector to a point should result in a new point whose components are the sum of the paired components from each addend vector", () => {
  assertEquals(
    new Point3(3, 4, 5).add(new Vec3(6, 7, 8)),
    new Point3(9, 11, 13),
  );
});

test("subtracting a vector from a point should result in a new point whose components are the difference of the paired components from each vector", () => {
  assertEquals(
    new Point3(3, 4, 5).subtract(new Vec3(6, 7, 8)),
    new Point3(-3, -3, -3),
  );
});

test("multiplying by a matrix results in a new point that is the linear combination of the columns of the matrix and the components of the point", () => {
  assertEquals(
    new Point3(3, 4, 5).multiply(Matrix3.fromRows(
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    )),
    new Point3(6, 12, 20),
  );
});

test("the distance squared between points is the magnitude squared of their difference", () => {
  assertEquals(
    new Point3(10, 10, 10).distanceToSquared(new Point3(9, 8, 8)),
    9,
  );
});

test("the distance between points is the magnitude of their difference", () => {
  assertEquals(new Point3(10, 10, 10).distanceTo(new Point3(9, 8, 8)), 3);
});

test("points within a distance of each other are near", () => {
  assertEquals(
    new Point3(10, 10, 10).isNearWithin(new Point3(9, 8, 8), 3),
    true,
  );
  assertEquals(
    new Point3(10, 10, 10).isNearWithin(new Point3(9, 8, 8), 4),
    true,
  );
  assertEquals(
    new Point3(10, 10, 10).isNearWithin(new Point3(9, 8, 8), 2.9),
    false,
  );
});
