import { assert, assertEquals } from "testing/asserts.ts";
import { suite, test } from "./testing.ts";
import { Matrix2 } from "./Matrix2.ts";
import { Point2 } from "./Point2.ts";
import { Vec2 } from "./Vec2.ts";

suite("Point2");

test("a point as an array is [x, y]", () => {
  assertEquals(new Point2(101, 247).array, [101, 247]);
});

test("the zero point should have 0 for the x and y components", () => {
  assertEquals(Point2.origin, new Point2(0, 0));
});

test("cloning a point results in a new point with identical coordinates", () => {
  assertEquals(new Point2(101, 247).clone(), new Point2(101, 247));
});

test("a point equals another when their components match", () => {
  assert(new Point2(2, 4).equals(new Point2(2, 4)));
  assert(!new Point2(2, 4).equals(new Point2(6, 7)));
});

test("adding a vector to a point should result in a new point whose components are the sum of the paired components from each addend vector", () => {
  assertEquals(
    new Point2(2, 4).add(new Vec2(6, 7)),
    new Point2(8, 11),
  );
});

test("subtracting a vector from a point should result in a new point whose components are the difference of the paired components from each vector", () => {
  assertEquals(
    new Point2(2, 4).subtract(new Vec2(6, 7)),
    new Point2(-4, -3),
  );
});

test("multiplying by a matrix results in a new point that is the linear combination of the columns of the matrix and the components of the point", () => {
  assertEquals(
    new Point2(2, 4).multiply(Matrix2.fromRows(
      [2, 0],
      [0, 2],
    )),
    new Point2(4, 8),
  );
});

test("the distance squared between points is the magnitude squared of their difference", () => {
  assertEquals(
    new Point2(10, 10).distanceToSquared(new Point2(13, 14)),
    25,
  );
});

test("the distance between points is the magnitude of their difference", () => {
  assertEquals(new Point2(10, 10).distanceTo(new Point2(13, 14)), 5);
});

test("points within a distance of each other are near", () => {
  assertEquals(
    new Point2(10, 10).isNearWithin(new Point2(13, 14), 5),
    true,
  );
  assertEquals(
    new Point2(10, 10).isNearWithin(new Point2(13, 14), 5.1),
    true,
  );
  assertEquals(
    new Point2(10, 10).isNearWithin(new Point2(13, 14), 4.9),
    false,
  );
});
