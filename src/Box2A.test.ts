import { assert, assertEquals } from "testing/asserts.ts";
import { suite, test } from "./testing.ts";
import { Box2A } from "./Box2A.ts";
import { Point2 } from "./Point2.ts";
import { Vec2 } from "./Vec2.ts";

suite("Box2A");

test("constructing a box from its center point should have the edges half the width and height from the center", () => {
  const { top, left, bottom, right } = Box2A.fromCenter(
    new Point2(10, 10),
    2,
    3,
  );
  assertEquals({ top, left, bottom, right }, {
    top: 8.5,
    left: 9,
    bottom: 11.5,
    right: 11,
  });
});

test("constructing a box from the top left as origin should have the top and left be 0, the right and bottom equal the width and height", () => {
  const { top, left, bottom, right } = Box2A.fromTopLeftOrigin(2, 3);
  assertEquals({ top, left, bottom, right }, {
    top: 0,
    left: 0,
    bottom: 3,
    right: 2,
  });
});

test("constructing a box from its edges should have the expected center, width and height", () => {
  assertEquals(
    Box2A.fromEdges(1, 2, 3, 4),
    Box2A.fromCenter(new Point2(3, 2), 2, 2),
  );
});

test("constructing a box from the center as origin should have the top and left be negative half with width and height, the right and bottom equal half the width and height", () => {
  const { top, left, bottom, right } = Box2A.fromCenterOrigin(2, 3);
  assertEquals({ top, left, bottom, right }, {
    top: -1.5,
    left: -1,
    bottom: 1.5,
    right: 1,
  });
});

test("the fields should be correct", () => {
  const {
    top,
    left,
    bottom,
    right,
    center,
    width,
    height,
    aspectRatio,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  } = Box2A.fromEdges(1, 2, 6, 12);
  assertEquals({
    top,
    left,
    bottom,
    right,
    center,
    width,
    height,
    aspectRatio,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  }, {
    top: 1,
    left: 2,
    bottom: 6,
    right: 12,
    width: 10,
    height: 5,
    aspectRatio: 2,
    center: new Point2(7, 3.5),
    topLeft: new Point2(2, 1),
    topRight: new Point2(12, 1),
    bottomLeft: new Point2(2, 6),
    bottomRight: new Point2(12, 6),
  });
});

test("a box intersects another when they overlap", () => {
  assertEquals(
    Box2A.fromEdges(1, 2, 3, 4).intersects(Box2A.fromEdges(1, 2, 3, 4)),
    true,
  );
  assertEquals(
    Box2A.fromEdges(1, 2, 3, 4).intersects(Box2A.fromEdges(11, 12, 13, 14)),
    false,
  );
});

test("the intersection of 2 boxes is the box where they overlap", () => {
  assertEquals(
    Box2A.fromEdges(1, 2, 3, 4).intersection(Box2A.fromEdges(2, 3, 4, 5)),
    Box2A.fromEdges(2, 3, 3, 4),
  );
  assertEquals(
    Box2A.fromEdges(1, 2, 3, 4).intersection(Box2A.fromEdges(12, 13, 14, 15)),
    null,
  );
});

test("translating a box creates a new one in a new spot", () => {
  const box = Box2A.fromEdges(1, 2, 3, 4);
  const translated = box.translate(new Vec2(1, 2));
  assert(box !== translated);
  assertEquals(
    translated,
    Box2A.fromEdges(3, 3, 5, 5),
  );
});

test("mutably translating a box updates its location", () => {
  const box = Box2A.fromEdges(1, 2, 3, 4);
  const translated = box.translateMut(new Vec2(1, 2));
  assert(box === translated);
  assertEquals(
    box,
    Box2A.fromEdges(3, 3, 5, 5),
  );
});

test("scaling a box creates a new one of a different size, but same center", () => {
  const box = Box2A.fromCenter(new Point2(1, 2), 3, 4);
  const translated = box.scaleUniform(3);
  assert(box !== translated);
  assertEquals(
    translated,
    Box2A.fromCenter(new Point2(1, 2), 9, 12),
  );
});

test("mutably scaling a box updates its size, but keeps its center", () => {
  const box = Box2A.fromCenter(new Point2(1, 2), 3, 4);
  const translated = box.scaleUniformMut(3);
  assert(box === translated);
  assertEquals(
    box,
    Box2A.fromCenter(new Point2(1, 2), 9, 12),
  );
});

test("mutably scaling a box updates its size, but keeps its center", () => {
  const box = Box2A.fromCenter(new Point2(1, 2), 3, 4);
  const translated = box.scaleUniformMut(3);
  assert(box === translated);
  assertEquals(
    box,
    Box2A.fromCenter(new Point2(1, 2), 9, 12),
  );
});

test("projecting a point from one box to another should put it in the same spot in the other", () => {
  assertEquals(
    Box2A.fromEdges(1, 2, 11, 24).project(
      new Point2(6, 5),
      Box2A.fromEdges(100, 200, 1100, 2400),
    ),
    new Point2(600, 500),
  );
});

test("projecting a box from one box to another should put it in the same spot in the other", () => {
  assertEquals(
    Box2A.fromEdges(1, 2, 11, 24).projectBox(
      Box2A.fromEdges(6, 7, 8, 9),
      Box2A.fromEdges(100, 200, 1100, 2400),
    ),
    Box2A.fromEdges(600, 700, 800, 900),
  );
});
