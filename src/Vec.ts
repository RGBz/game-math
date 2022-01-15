export interface Vec<T extends Vec<T>> {
  size: number;

  magnitudeSquared: number;
  magnitude: number;

  unit: T;

  dot(other: T): number;

  scale(scalar: number): T;
  scaleMut(scalar: number): this;

  add(other: T): T;
  addMut(other: T): this;

  subtract(other: T): T;
  subtractMut(other: T): this;
}
