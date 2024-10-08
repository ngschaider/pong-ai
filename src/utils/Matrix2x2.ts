import Matrix from "./Matrix";
import Matrix3x3 from "./Matrix3x3";

class Matrix2x2 extends Matrix<Matrix2x2> {

    public static readonly identity: Matrix2x2 = new Matrix2x2(1, 0, 0, 1);

    constructor(a: number, b: number, c: number, d: number) {

        super([a, b, c, d], 2);
    }

    clone() {
        return new Matrix2x2(this.values[0], this.values[1], this.values[2], this.values[3]);
    }

    det() {
        return this.getValue(0, 0) * this.getValue(1, 1) - this.getValue(1, 0) * this.getValue(0, 1);
    }

    adj() {
        return new Matrix2x2(this.getValue(1, 1), -this.getValue(1, 0), -this.getValue(0, 1), this.getValue(0, 0))
    }

    toMatrix3x3(): Matrix3x3 {
        return new Matrix3x3(
            this.values[0], this.values[1], 0,
            this.values[2], this.values[3], 0,
            0, 0, 0
        );
    }

}

export default Matrix2x2;