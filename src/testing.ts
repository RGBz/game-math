import { bold, cyan } from "fmt/colors.ts";
import { assertEquals, equal } from "testing/asserts.ts";

/**
 * Same as assertEquals except numbers are compored with an epsilon value
 */
export function assertKindaEquals(
  a: unknown,
  b: unknown,
  msg?: string,
  epsilon = 0.000000000000001,
): void {
  if (!kindaEquals(a, b, epsilon)) {
    assertEquals(a, b, msg);
  }
}

function kindaEquals(
  a: unknown,
  b: unknown,
  epsilon: number,
): boolean {
  if (typeof (a) === "object" && typeof (b) === "object") {
    if (
      Object.keys(a as Record<string, unknown>).length !==
        Object.keys(b as Record<string, unknown>).length
    ) {
      return false;
    }
    for (const key of Object.keys(a as Record<string, unknown>)) {
      if (
        !kindaEquals(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          epsilon,
        )
      ) {
        return false;
      }
    }
    return true;
  }
  if (typeof (a) === "number" && typeof (b) === "number") {
    return Math.abs(a - b) <= epsilon;
  }
  return equal(a, b);
}

let currentSuite = "";

export function suite(name: string): void {
  currentSuite = name;
  console.log();
}

export function test(
  name: string,
  runner: (() => void) | (() => Promise<void>),
): void {
  Deno.test(`${cyan(bold(currentSuite))}: ${name}`, runner);
}
