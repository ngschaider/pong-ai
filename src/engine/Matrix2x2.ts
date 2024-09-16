abstract class Matrix {

    values: number[];

    constructor(...args: number[]) {
        this.values = args;
    }

}

export class Matrix2x2 extends Matrix {

    constructor(a: number, b: number, c: number, d: number) {
        super(a, b, c, d);
    }

    toMatrix3x3(): Matrix3x3 {
        return new Matrix3x3(this.values[0], this.values[1], 0, this.values[2], this.values[3], 0, this.values[4], this.values[5], 0);
    }

}

export class Matrix3x3 extends Matrix {

    constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) {
        super(a, b, c, d, e, f, g, h, i);
    }

    get width() {
        return 3;
    }

    get height() {
        return 3;
    }

    getValue(z: number, s: number): number {
        const index = s + z * this.width;
        return this.values[index];
    }

    multiply(other: Matrix3x3): Matrix3x3 {
        const values = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        const helper = (z: number, s: number) => {
            return this.getValue(z, 0) * other.getValue(0, s)
                + this.getValue(z, 1) * other.getValue(1, s)
                + this.getValue(z, 2) * other.getValue(2, s);
        }

        return new Matrix3x3(
            helper(0, 0),
            helper(0, 1),
            helper(0, 2),
            helper(1, 0),
            helper(1, 1),
            helper(1, 2),
            helper(2, 0),
            helper(2, 1),
            helper(2, 2),
        );
    }

}