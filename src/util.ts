import { bold, green, red } from "fmt/colors.ts";
import { AssertionError } from "testing/asserts.ts";

/**
 * Confirm two numbers are almost equal to each other within some epsilon range
 */
export function assertKindaEquals(
  a: number,
  b: number,
  epsilon = 0.000000001,
): void {
  if (Math.abs(a - b) > epsilon) {
    throw new AssertionError(
      [
        `\n   ${red(bold("Actual"))} / ${green(bold("Expected"))}\n`,
        red(bold(`-  ${a}`)),
        green(bold(`+  ${b}`)),
      ].join("\n"),
    );
  }
}
