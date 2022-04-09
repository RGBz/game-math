/**
 * Converts radians (0 to 2 PI) to degrees (0 to 360)
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Converts degrees (0 to 360) to radians (0 to 2 PI)
 */
export function degreesToRadians(degrees: number): number {
  return degrees / (180 / Math.PI);
}
