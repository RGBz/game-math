import { assertEquals } from "testing/asserts.ts";
import { suite, test } from "./testing.ts";
import { degreesToRadians, radiansToDegrees } from "./util.ts";

suite("util");

test("convert degrees to radians", () => {
  assertEquals(degreesToRadians(0), 0);
  assertEquals(degreesToRadians(90), 0.5 * Math.PI);
  assertEquals(degreesToRadians(180), Math.PI);
  assertEquals(degreesToRadians(270), 1.5 * Math.PI);
  assertEquals(degreesToRadians(360), 2 * Math.PI);
});

test("convert radians to degrees", () => {
  assertEquals(radiansToDegrees(0), 0);
  assertEquals(radiansToDegrees(0.5 * Math.PI), 90);
  assertEquals(radiansToDegrees(Math.PI), 180);
  assertEquals(radiansToDegrees(1.5 * Math.PI), 270);
  assertEquals(radiansToDegrees(2 * Math.PI), 360);
});
