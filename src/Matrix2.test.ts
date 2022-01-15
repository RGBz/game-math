import { assertEquals } from "testing/asserts.ts";
import { Matrix2 } from "./Matrix2.ts";
import { Vec2 } from "./Vec2.ts";

Deno.test("a zero matrix has all zero entries", () => {
  const m = Matrix2.zero;
  assertEquals(m.c0.x, 0);
  assertEquals(m.c0.y, 0);
  assertEquals(m.c1.x, 0);
  assertEquals(m.c1.y, 0);
});

Deno.test("an identity matrix has all zero entries except for ones along the diagonal", () => {
  const m = Matrix2.identity;
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 0);
  assertEquals(m.c1.x, 0);
  assertEquals(m.c1.y, 1);
});

Deno.test("a matrix is square when its row and column counts are equal", () => {
  assertEquals(Matrix2.zero.isSquare, true);
});

Deno.test("a matrix's row count matches the number of components in its vector columns", () => {
  assertEquals(Matrix2.zero.rowCount, 2);
});

Deno.test("a matrix's column count matches the number of columns it has", () => {
  assertEquals(Matrix2.zero.columnCount, 2);
});

Deno.test("a matrix is diagonal when all non-diagonal entries are zero", () => {
  assertEquals(Matrix2.zero.isDiagonal, true);
  assertEquals(Matrix2.identity.isDiagonal, true);
  assertEquals(
    Matrix2.fromRows(
      new Vec2(1, 1),
      new Vec2(0, 1),
    ).isDiagonal,
    false,
  );
});

Deno.test("a matrix is symmetric when it's square and diagonal", () => {
  assertEquals(Matrix2.zero.isSymmetric, true);
  assertEquals(Matrix2.identity.isSymmetric, true);
  assertEquals(
    Matrix2.fromRows(
      new Vec2(1, 1),
      new Vec2(0, 1),
    ).isSymmetric,
    false,
  );
});

Deno.test("a matrix is anti-symmetric when it's square and diagonal and equal to its negative transpose", () => {
  assertEquals(Matrix2.zero.isAntiSymmetric, true);
  assertEquals(Matrix2.identity.isAntiSymmetric, false);
  assertEquals(
    Matrix2.fromRows(
      new Vec2(0, 4),
      new Vec2(-4, 0),
    ).isAntiSymmetric,
    true,
  );
});

Deno.test("the transpose of a matrix flips it along its diagonal", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  ).transpose;
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c1.x, 2);
  assertEquals(m.c1.y, 5);
});

Deno.test("a matrix made from rows is the transpose of one made from columns", () => {
  const m = Matrix2.fromRows(
    new Vec2(1, 2),
    new Vec2(4, 5),
  );
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c1.x, 2);
  assertEquals(m.c1.y, 5);
});

Deno.test("a matrix made from columns is the transpose of one made from rows", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  );
  assertEquals(m.c0.x, 1);
  assertEquals(m.c0.y, 2);
  assertEquals(m.c1.x, 4);
  assertEquals(m.c1.y, 5);
});

Deno.test("a matrix scaled by a scalar results in a new matrix with each entry scaled by the scalar", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  ).scale(2);
  assertEquals(m.c0.x, 2);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c1.x, 8);
  assertEquals(m.c1.y, 10);
});

Deno.test("mutating a matrix by a scalar results in the matrix having each entry scaled by the scalar", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  );
  m.scaleMut(2);
  assertEquals(m.c0.x, 2);
  assertEquals(m.c0.y, 4);
  assertEquals(m.c1.x, 8);
  assertEquals(m.c1.y, 10);
});

Deno.test("adding another matrix to a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  ).add(Matrix2.fromColumns(
    new Vec2(9, 8),
    new Vec2(6, 5),
  ));
  assertEquals(m.c0.x, 10);
  assertEquals(m.c0.y, 10);
  assertEquals(m.c1.x, 10);
  assertEquals(m.c1.y, 10);
});

Deno.test("mutating a matrix by adding another to it results in the matrix's entries being the sum of the matrix's entries and the other's corresponding entries", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  );
  m.addMut(Matrix2.fromColumns(
    new Vec2(9, 8),
    new Vec2(6, 5),
  ));
  assertEquals(m.c0.x, 10);
  assertEquals(m.c0.y, 10);
  assertEquals(m.c1.x, 10);
  assertEquals(m.c1.y, 10);
});

Deno.test("subtracting another matrix from a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  ).subtract(Matrix2.fromColumns(
    new Vec2(9, 8),
    new Vec2(6, 5),
  ));
  assertEquals(m.c0.x, -8);
  assertEquals(m.c0.y, -6);
  assertEquals(m.c1.x, -2);
  assertEquals(m.c1.y, 0);
});

Deno.test("mutating a matrix by subtracting another from it results in the matrix's entries being the difference of the matrix's entries and the other's corresponding entries", () => {
  const m = Matrix2.fromColumns(
    new Vec2(1, 2),
    new Vec2(4, 5),
  );
  m.subtractMut(Matrix2.fromColumns(
    new Vec2(9, 8),
    new Vec2(6, 5),
  ));
  assertEquals(m.c0.x, -8);
  assertEquals(m.c0.y, -6);
  assertEquals(m.c1.x, -2);
  assertEquals(m.c1.y, 0);
});
