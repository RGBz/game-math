import { assert, assertEquals } from "testing/asserts.ts";
import { Box3A } from "./Box3A.ts";
import { Point3 } from "./Point3.ts";

Deno.test("The right of the box should be half its width right of its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).right, 5);
});

Deno.test("The left of the box should be half its width left of its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).left, -3);
});

Deno.test("The top of the box should be half its height above its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).top, 7);
});

Deno.test("The bottom of the box should be half its height below its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).bottom, -3);
});

Deno.test("The front of the box should be half its depth in front of its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).front, 9);
});

Deno.test("The back of the box should be half its depth behind its center", () => {
  assertEquals(new Box3A(new Point3(1, 2, 3), 8, 10, 12).bottom, -3);
});

Deno.test("Boxes that do not overlap should not intersect", () => {
  assert(
    !new Box3A(Point3.origin, 4, 6, 8).intersects(
      new Box3A(new Point3(-3.1, -3.1, -3.1), 2, 2, 2),
    ),
  );
});
Deno.test("Boxes that overlap should intersect", () => {
  assert(
    new Box3A(Point3.origin, 4, 6, 8).intersects(
      new Box3A(Point3.origin, 2, 2, 2),
    ),
  );
  assert(
    new Box3A(Point3.origin, 1, 0, 1).intersects(
      new Box3A(new Point3(0, 1, 0), 2, 2, 2),
    ),
  );
  assert(
    new Box3A(Point3.origin, 0, 0, 0).intersects(
      new Box3A(Point3.origin, 2, 2, 2),
    ),
  );
});
