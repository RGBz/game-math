import { assertEquals } from "testing/asserts.ts";
import { Matrix3 } from "./Matrix3.ts";
import { Vec3 } from "./Vec3.ts";

Deno.test("a zero matrix has all zero entries", () => {
  const m = Matrix3.zero;
  assertEquals(m.c0.x, 0);
  assertEquals(m.c0.y, 0);
  assertEquals(m.c0.z, 0);
  assertEquals(m.c1.x, 0);
  assertEquals(m.c1.y, 0);
  assertEquals(m.c1.z, 0);
  assertEquals(m.c2.x, 0);
  assertEquals(m.c2.y, 0);
  assertEquals(m.c2.z, 0);
});

Deno.test("an identity matrix has all zero entries except for ones along the diagonal", () => {
  const m = Matrix3.identity;
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 0);
  assertEquals(m.c0.z, 0);
  assertEquals(m.c1.x, 0);
  assertEquals(m.c1.y, 1);
  assertEquals(m.c1.z, 0);
  assertEquals(m.c2.x, 0);
  assertEquals(m.c2.y, 0);
  assertEquals(m.c2.z, 1);
});

Deno.test("a matrix is square when its row and column counts are equal", () => {
  assertEquals(Matrix3.zero.isSquare, true);
});

Deno.test("a matrix's row count matches the number of components in its vector columns", () => {
  assertEquals(Matrix3.zero.rowCount, 3);
});

Deno.test("a matrix's column count matches the number of columns it has", () => {
  assertEquals(Matrix3.zero.columnCount, 3);
});

Deno.test("a matrix is diagonal when all non-diagonal entries are zero", () => {
  assertEquals(Matrix3.zero.isDiagonal, true);
  assertEquals(Matrix3.identity.isDiagonal, true);
  assertEquals(
    Matrix3.fromRows(
      new Vec3(1, 0, 1),
      new Vec3(0, 1, 0),
      new Vec3(0, 0, 1),
    ).isDiagonal,
    false,
  );
});

Deno.test("a matrix is symmetric when it's square and diagonal", () => {
  assertEquals(Matrix3.zero.isSymmetric, true);
  assertEquals(Matrix3.identity.isSymmetric, true);
  assertEquals(
    Matrix3.fromRows(
      new Vec3(1, 0, 1),
      new Vec3(0, 1, 0),
      new Vec3(0, 0, 1),
    ).isSymmetric,
    false,
  );
});

Deno.test("a matrix is anti-symmetric when it's square and diagonal and equal to its negative transpose", () => {
  assertEquals(Matrix3.zero.isAntiSymmetric, true);
  assertEquals(Matrix3.identity.isAntiSymmetric, false);
  assertEquals(
    Matrix3.fromRows(
      new Vec3(0, 4, 7),
      new Vec3(-4, 0, -3),
      new Vec3(-7, 3, 0),
    ).isAntiSymmetric,
    true,
  );
});

Deno.test("the transpose of a matrix flips it along its diagonal", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  ).transpose;
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c0.z, 7);
  assertEquals(m.c1.x, 2);
  assertEquals(m.c1.y, 5);
  assertEquals(m.c1.z, 8);
  assertEquals(m.c2.x, 3);
  assertEquals(m.c2.y, 6);
  assertEquals(m.c2.z, 9);
});

Deno.test("a matrix made from rows is the transpose of one made from columns", () => {
  const m = Matrix3.fromRows(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  );
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c0.z, 7);
  assertEquals(m.c1.x, 2);
  assertEquals(m.c1.y, 5);
  assertEquals(m.c1.z, 8);
  assertEquals(m.c2.x, 3);
  assertEquals(m.c2.y, 6);
  assertEquals(m.c2.z, 9);
});

Deno.test("a matrix made from columns is the transpose of one made from rows", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  );
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 2);
  assertEquals(m.c0.z, 3);
  assertEquals(m.c1.x, 4);
  assertEquals(m.c1.y, 5);
  assertEquals(m.c1.z, 6);
  assertEquals(m.c2.x, 7);
  assertEquals(m.c2.y, 8);
  assertEquals(m.c2.z, 9);
});

Deno.test("a matrix scaled by a scalar results in a new matrix with each entry scaled by the scalar", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  ).scale(2);
  assertEquals(m.c0.x, 2);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c0.z, 6);
  assertEquals(m.c1.x, 8);
  assertEquals(m.c1.y, 10);
  assertEquals(m.c1.z, 12);
  assertEquals(m.c2.x, 14);
  assertEquals(m.c2.y, 16);
  assertEquals(m.c2.z, 18);
});

Deno.test("mutating a matrix by a scalar results in the matrix having each entry scaled by the scalar", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  );
  m.scaleMut(2);
  assertEquals(m.c0.x, 2);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c0.z, 6);
  assertEquals(m.c1.x, 8);
  assertEquals(m.c1.y, 10);
  assertEquals(m.c1.z, 12);
  assertEquals(m.c2.x, 14);
  assertEquals(m.c2.y, 16);
  assertEquals(m.c2.z, 18);
});

Deno.test("adding another matrix to a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  ).add(Matrix3.fromColumns(
    new Vec3(9, 8, 7),
    new Vec3(6, 5, 4),
    new Vec3(3, 2, 1),
  ));
  assertEquals(m.c0.x, 10);
  assertEquals(m.c0.y, 10);
  assertEquals(m.c0.z, 10);
  assertEquals(m.c1.x, 10);
  assertEquals(m.c1.y, 10);
  assertEquals(m.c1.z, 10);
  assertEquals(m.c2.x, 10);
  assertEquals(m.c2.y, 10);
  assertEquals(m.c2.z, 10);
});

Deno.test("mutating a matrix by adding another to it results in the matrix's entries being the sum of the matrix's entries and the other's corresponding entries", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  );
  m.addMut(Matrix3.fromColumns(
    new Vec3(9, 8, 7),
    new Vec3(6, 5, 4),
    new Vec3(3, 2, 1),
  ));
  assertEquals(m.c0.x, 10);
  assertEquals(m.c0.y, 10);
  assertEquals(m.c0.z, 10);
  assertEquals(m.c1.x, 10);
  assertEquals(m.c1.y, 10);
  assertEquals(m.c1.z, 10);
  assertEquals(m.c2.x, 10);
  assertEquals(m.c2.y, 10);
  assertEquals(m.c2.z, 10);
});

Deno.test("subtracting another matrix from a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  ).subtract(Matrix3.fromColumns(
    new Vec3(9, 8, 7),
    new Vec3(6, 5, 4),
    new Vec3(3, 2, 1),
  ));
  assertEquals(m.c0.x, -8);
  assertEquals(m.c0.y, -6);
  assertEquals(m.c0.z, -4);
  assertEquals(m.c1.x, -2);
  assertEquals(m.c1.y, 0);
  assertEquals(m.c1.z, 2);
  assertEquals(m.c2.x, 4);
  assertEquals(m.c2.y, 6);
  assertEquals(m.c2.z, 8);
});

Deno.test("mutating a matrix by subtracting another from it results in the matrix's entries being the difference of the matrix's entries and the other's corresponding entries", () => {
  const m = Matrix3.fromColumns(
    new Vec3(1, 2, 3),
    new Vec3(4, 5, 6),
    new Vec3(7, 8, 9),
  );
  m.subtractMut(Matrix3.fromColumns(
    new Vec3(9, 8, 7),
    new Vec3(6, 5, 4),
    new Vec3(3, 2, 1),
  ));
  assertEquals(m.c0.x, -8);
  assertEquals(m.c0.y, -6);
  assertEquals(m.c0.z, -4);
  assertEquals(m.c1.x, -2);
  assertEquals(m.c1.y, 0);
  assertEquals(m.c1.z, 2);
  assertEquals(m.c2.x, 4);
  assertEquals(m.c2.y, 6);
  assertEquals(m.c2.z, 8);
});
