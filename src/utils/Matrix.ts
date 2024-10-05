
class Matrix {

    width: number;
    values: number[];

    constructor(values: number[], width: number) {
        if(values.length % width !== 0) {
            throw new Error("Number of values must be a multiple of specified width");
        }

        this.values = values;
        this.width = width;
    }

    public get height() {
        return this.values.length / this.width;
    }

    public static createIdentity(width: number, height: number) {
        const values = [];

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                values.push(0);
            }
        }

        const num = Math.min(width, height);
        for(let i = 0; i < num; i++) {
            values[i + i * width] = 1;
        }
        
        return new Matrix(values, width);
    }

    public static create3x3(a: number, b: number, c: number, 
        d: number, e: number, f: number, 
        g: number, h: number, i: number): Matrix {

        return new Matrix([a, b, c, d, e, f, g, h, i], 3);
    }

    public static create2x2(a: number, b: number, c: number, d: number): Matrix {
        return new Matrix([a, b, c, d], 2);
    }

    multiply(other: Matrix) {
        if(this.width !== other.height) {
            throw new Error("Width of left matrix must equal to height of right matrix.");
        }

        const helper = (x: number, y: number): number => {
            let ret = 0;
            for(let i = 0; i < this.width; i++) {
                ret += this.getValue(i, y) * other.getValue(x, i);
            }
            return ret;
        }

        const values = [];
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < other.width; x++) {
                values.push(helper(x, y));
            }
        }

        return new Matrix(values, this.width);
    }

    scalarMul(other: number) {
        const values = this.values.map(v => v * other);
        return new Matrix(values, this.width);
    }

    scalarDiv(other: number) {
        const values = this.values.map(v => v / other);
        return new Matrix(values, this.width);
    }

    det(): number {
        if(this.height === 3 && this.width === 3) {
            return this.getValue(0, 0) * this.getValue(1, 1) * this.getValue(2, 2)
                + this.getValue(1, 0) * this.getValue(2, 1) * this.getValue(0, 2)
                + this.getValue(2, 0) * this.getValue(0, 1) * this.getValue(1, 2)
                - this.getValue(2, 0) * this.getValue(1, 1) * this.getValue(0, 2)
                - this.getValue(0, 0) * this.getValue(2, 1) * this.getValue(1, 2)
                - this.getValue(1, 0) * this.getValue(0, 1) * this.getValue(2, 2);
        } else if(this.height === 2 && this.width === 2) {
            return this.getValue(0, 0) * this.getValue(1, 1) - this.getValue(1, 0) * this.getValue(0, 1);
        } else {
            throw new Error("det is only implemented for 2x2 and 3x3 matrices.");
        }
    }

    adj(): Matrix {
        if(this.height === 3 && this.width === 3) {
            const a = this.getValue(0, 0);
            const b = this.getValue(1, 0);
            const c = this.getValue(2, 0);
            const d = this.getValue(0, 1);
            const e = this.getValue(1, 1);
            const f = this.getValue(2, 1);
            const g = this.getValue(0, 2);
            const h = this.getValue(1, 2);
            const i = this.getValue(2, 2);
            return Matrix.create3x3(e*i-f*h, c*h-b*i, b*f-c*e, f*g-d*i, a*i-c*g, c*d-a*f, d*h-e*g, b*g-a*h, a*e-b*d)
        } else if(this.height === 2 && this.width === 2) {
            return Matrix.create2x2(this.getValue(1, 1), -this.getValue(1, 0), -this.getValue(0, 1), this.getValue(0, 0))
        } else {
            throw new Error("invert is only implemented for 2x2 and 3x3 matrices.");
        }
    }

    invert(): Matrix {
        if(this.height === 3 && this.width === 3) {
            return this.adj().scalarDiv(this.det())
        } else if(this.height === 2 && this.width === 2) {
            return this.adj().scalarDiv(this.det());
        } else {
            throw new Error("invert is only implemented for 2x2 and 3x3 matrices.");
        }
    }

    getValue(x: number, y: number) {
        if(x > this.width - 1) {
            throw new Error("x must be less than width");
        }
        if(y > this.height - 1) {
            throw new Error("y must be less than height");
        }

        return this.values[x + y * this.width];
    }
}

export default Matrix;