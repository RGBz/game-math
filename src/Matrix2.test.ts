import { assertEquals } from "testing/asserts.ts";
import { assertKindaEquals, suite, test } from "./testing.ts";
import { Matrix2 } from "./Matrix2.ts";

suite("Matrix2");

test("a zero matrix has all zero entries", () => {
  assertEquals(Matrix2.zero, new Matrix2(0, 0, 0, 0));
});

test("an identity matrix has all zero entries except for ones along the diagonal", () => {
  assertEquals(Matrix2.identity, new Matrix2(1, 0, 0, 1));
});

test("a matrix is diagonal when all non-diagonal entries are zero", () => {
  assertEquals(Matrix2.zero.isDiagonal, true);
  assertEquals(Matrix2.identity.isDiagonal, true);
  assertEquals(
    Matrix2.fromRows(
      [1, 1],
      [0, 1],
    ).isDiagonal,
    false,
  );
});

test("a matrix is symmetric when it's square and diagonal", () => {
  assertEquals(Matrix2.zero.isSymmetric, true);
  assertEquals(Matrix2.identity.isSymmetric, true);
  assertEquals(
    Matrix2.fromRows(
      [1, 1],
      [0, 1],
    ).isSymmetric,
    false,
  );
});

test("a matrix is anti-symmetric when it's square and diagonal and equal to its negative transpose", () => {
  assertEquals(Matrix2.zero.isAntiSymmetric, true);
  assertEquals(Matrix2.identity.isAntiSymmetric, false);
  assertEquals(
    Matrix2.fromRows(
      [0, 4],
      [-4, 0],
    ).isAntiSymmetric,
    true,
  );
});

test("the transpose of a matrix flips it along its diagonal", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).transpose,
    Matrix2.fromRows(
      [1, 4],
      [2, 5],
    ),
  );
});

test("the inverse of a matrix can be multiplied against the matrix to get the identity matrix", () => {
  assertKindaEquals(
    Matrix2.fromRows(
      [4, 7],
      [2, 6],
    ).inverse,
    Matrix2.fromRows(
      [0.6, -0.7],
      [-0.2, 0.4],
    ),
  );
});

test("the determinant of a matrix is the area of the transformed unit square", () => {
  assertEquals(Matrix2.identity.determinant, 1);
  assertEquals(
    Matrix2.fromRows(
      [3, -1],
      [4, 3],
    ).determinant,
    13,
  );
});

test("a matrix made from rows is the transpose of one made from columns", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ),
    new Matrix2(1, 2, 4, 5),
  );
});

test("a matrix made from columns is the transpose of one made from rows", () => {
  assertEquals(
    Matrix2.fromColumns(
      [1, 2],
      [4, 5],
    ),
    Matrix2.fromRows(
      [1, 4],
      [2, 5],
    ),
  );
});

test("a matrix scaled by a scalar results in a new matrix with each entry scaled by the scalar", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).scale(2),
    Matrix2.fromRows(
      [2, 4],
      [8, 10],
    ),
  );
});

test("mutating a matrix by a scalar results in the matrix having each entry scaled by the scalar", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).scaleMut(2),
    Matrix2.fromRows(
      [2, 4],
      [8, 10],
    ),
  );
});

test("adding another matrix to a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).add(Matrix2.fromRows(
      [9, 8],
      [6, 5],
    )),
    Matrix2.fromRows(
      [10, 10],
      [10, 10],
    ),
  );
});

test("mutating a matrix by adding another to it results in the matrix's entries being the sum of the matrix's entries and the other's corresponding entries", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).addMut(Matrix2.fromRows(
      [9, 8],
      [6, 5],
    )),
    Matrix2.fromRows(
      [10, 10],
      [10, 10],
    ),
  );
});

test("subtracting another matrix from a matrix results in a new matrix with each entry being the sum of the corresponding entries from the two matrices", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).subtract(Matrix2.fromRows(
      [9, 8],
      [6, 5],
    )),
    Matrix2.fromRows(
      [-8, -6],
      [-2, 0],
    ),
  );
});

test("mutating a matrix by subtracting another from it results in the matrix's entries being the difference of the matrix's entries and the other's corresponding entries", () => {
  assertEquals(
    Matrix2.fromRows(
      [1, 2],
      [4, 5],
    ).subtractMut(Matrix2.fromRows(
      [9, 8],
      [6, 5],
    )),
    Matrix2.fromRows(
      [-8, -6],
      [-2, 0],
    ),
  );
});

test("multiplying a matrix by another results in a new matrix that is the product", () => {
  assertEquals(
    Matrix2.fromRows(
      [3, 7],
      [4, 9],
    ).multiply(Matrix2.fromRows(
      [6, 2],
      [5, 8],
    )),
    Matrix2.fromRows(
      [53, 62],
      [69, 80],
    ),
  );
});

test("mutating a matrix by multiplying with another results in this matrix being their product", () => {
  assertEquals(
    Matrix2.fromRows(
      [3, 7],
      [4, 9],
    ).multiplyMut(Matrix2.fromRows(
      [6, 2],
      [5, 8],
    )),
    Matrix2.fromRows(
      [53, 62],
      [69, 80],
    ),
  );
});
