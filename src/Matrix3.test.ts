import { assertEquals } from "testing/asserts.ts";
import { assertKindaEquals, suite, test } from "./testing.ts";
import { Matrix3 } from "./Matrix3.ts";
import { Vec3 } from "./Vec3.ts";
import { degreesToRadians } from "./util.ts";

suite("Matrix3");

test("a scale matrix scales a vector the described amount when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 2, 3).multiply(
      Matrix3.scale(-2),
    ),
    new Vec3(-2, -4, -6),
  );
});

test("a reflection matrix reflects a vector off the plane described by its normal vector when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 2, 3).multiply(
      Matrix3.reflection(new Vec3(1, 0, 0)),
    ),
    new Vec3(-1, 2, 3),
  );
  assertKindaEquals(
    new Vec3(1, 2, 3).multiply(
      Matrix3.reflection(new Vec3(0, 1, 0)),
    ),
    new Vec3(1, -2, 3),
  );
  assertKindaEquals(
    new Vec3(1, 2, 3).multiply(
      Matrix3.reflection(new Vec3(0, 0, 1)),
    ),
    new Vec3(1, 2, -3),
  );
  assertKindaEquals(
    new Vec3(1, 2, 3).multiply(
      Matrix3.reflection(new Vec3(1, 1, 1)),
    ),
    new Vec3(-11, -10, -9),
  );
});

test("a rotation matrix rotates a vector about the defined axis when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(
      Matrix3.rotation(degreesToRadians(90), new Vec3(1, 0, 0)),
    ),
    new Vec3(1, -1, 1),
  );
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(
      Matrix3.rotation(degreesToRadians(90), new Vec3(0, 1, 0)),
    ),
    new Vec3(1, 1, -1),
  );
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(
      Matrix3.rotation(degreesToRadians(90), new Vec3(0, 0, 1)),
    ),
    new Vec3(-1, 1, 1),
  );
});

test("an X axis rotation matrix rotates a vector about the X axis when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(Matrix3.xAxisRotation(degreesToRadians(90))),
    new Vec3(1, -1, 1),
  );
});

test("an Y axis rotation matrix rotates a vector about the X axis when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(Matrix3.yAxisRotation(degreesToRadians(90))),
    new Vec3(1, 1, -1),
  );
});

test("an Z axis rotation matrix rotates a vector about the X axis when multiplied", () => {
  assertKindaEquals(
    new Vec3(1, 1, 1).multiply(Matrix3.zAxisRotation(degreesToRadians(90))),
    new Vec3(-1, 1, 1),
  );
});

test("a zero matrix has all zero entries", () => {
  assertEquals(Matrix3.zero, new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0));
});

test("an identity matrix has all zero entries except for ones along the diagonal", () => {
  assertEquals(Matrix3.identity, new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1));
});

test("a matrix is square when its row and column counts are equal", () => {
  assertEquals(Matrix3.zero.isSquare, true);
});

test("a matrix's row count matches the number of components in its vector columns", () => {
  assertEquals(Matrix3.zero.rowCount, 3);
});

test("a matrix's column count matches the number of columns it has", () => {
  assertEquals(Matrix3.zero.columnCount, 3);
});

test("a matrix is diagonal when all non-diagonal entries are zero", () => {
  assertEquals(Matrix3.zero.isDiagonal, true);
  assertEquals(Matrix3.identity.isDiagonal, true);
  assertEquals(
    Matrix3.fromRows(
      [1, 0, 1],
      [0, 1, 0],
      [0, 0, 1],
    ).isDiagonal,
    false,
  );
});

test("a matrix is symmetric when it's square and diagonal", () => {
  assertEquals(Matrix3.zero.isSymmetric, true);
  assertEquals(Matrix3.identity.isSymmetric, true);
  assertEquals(
    Matrix3.fromRows(
      [1, 0, 1],
      [0, 1, 0],
      [0, 0, 1],
    ).isSymmetric,
    false,
  );
});

test("a matrix is anti-symmetric when it's square and diagonal and equal to its negative transpose", () => {
  assertEquals(Matrix3.zero.isAntiSymmetric, true);
  assertEquals(Matrix3.identity.isAntiSymmetric, false);
  assertEquals(
    Matrix3.fromRows(
      [0, 4, 7],
      [-4, 0, -3],
      [-7, 3, 0],
    ).isAntiSymmetric,
    true,
  );
});

test("the transpose of a matrix flips it along its diagonal", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).transpose,
    Matrix3.fromRows(
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ),
  );
});

test("the inverse of a matrix can be multiplied against the matrix to get the identity matrix", () => {
  assertKindaEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0],
    ).inverse,
    Matrix3.fromRows(
      [-24, 18, 5],
      [20, -15, -4],
      [-5, 4, 1],
    ),
  );
});

test("the determinant of a matrix is the volume of transformed unit cube", () => {
  assertEquals(Matrix3.identity.determinant, 1);
  assertEquals(
    Matrix3.fromRows(
      [4, -3, 5],
      [1, 0, 3],
      [-1, 5, 2],
    ).determinant,
    -20,
  );
});

test("a matrix made from rows is the transpose of one made from columns", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ),
    new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9),
  );
});

test("a matrix made from columns is the transpose of one made from rows", () => {
  assertEquals(
    Matrix3.fromColumns(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ),
    Matrix3.fromRows(
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ),
  );
});

test("a matrix scaled by a scalar results in a new matrix with each entry scaled by the scalar", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).scale(2),
    Matrix3.fromRows(
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18],
    ),
  );
});

test("mutating a matrix by a scalar results in the matrix having each entry scaled by the scalar", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).scaleMut(2),
    Matrix3.fromRows(
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18],
    ),
  );
});

test("adding another matrix to a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).add(Matrix3.fromRows(
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    )),
    Matrix3.fromRows(
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ),
  );
});

test("mutating a matrix by adding another to it results in the matrix's entries being the sum of the matrix's entries and the other's corresponding entries", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).addMut(Matrix3.fromRows(
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    )),
    Matrix3.fromRows(
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ),
  );
});

test("subtracting another matrix from a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).subtract(Matrix3.fromRows(
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    )),
    Matrix3.fromRows(
      [-8, -6, -4],
      [-2, 0, 2],
      [4, 6, 8],
    ),
  );
});

test("mutating a matrix by subtracting another from it results in the matrix's entries being the difference of the matrix's entries and the other's corresponding entries", () => {
  assertEquals(
    Matrix3.fromRows(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ).subtractMut(Matrix3.fromRows(
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    )),
    Matrix3.fromRows(
      [-8, -6, -4],
      [-2, 0, 2],
      [4, 6, 8],
    ),
  );
});

test("multiplying a matrix by another results in a new matrix that is the product", () => {
  assertEquals(
    Matrix3.fromRows(
      [12, 8, 4],
      [3, 17, 14],
      [9, 8, 10],
    ).multiply(Matrix3.fromRows(
      [5, 19, 3],
      [6, 15, 9],
      [7, 8, 16],
    )),
    Matrix3.fromRows(
      [136, 380, 172],
      [215, 424, 386],
      [163, 371, 259],
    ),
  );
});

test("mutating a matrix by multiplying with another results in this matrix being their product", () => {
  assertEquals(
    Matrix3.fromRows(
      [12, 8, 4],
      [3, 17, 14],
      [9, 8, 10],
    ).multiplyMut(Matrix3.fromRows(
      [5, 19, 3],
      [6, 15, 9],
      [7, 8, 16],
    )),
    Matrix3.fromRows(
      [136, 380, 172],
      [215, 424, 386],
      [163, 371, 259],
    ),
  );
});
