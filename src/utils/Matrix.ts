
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

    static create3x3(a: number, b: number, c: number, 
        d: number, e: number, f: number, 
        g: number, h: number, i: number) {

        return new Matrix([a, b, c, d, e, f, g, h, i], 3);
    }

    static create2x2(a: number, b: number, c: number, d: number) {
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
    }

    getValue(x: number, y: number) {
        if(x >= this.width - 1) {
            throw new Error("x must be less than width-1");
        }
        if(y >= this.height - 1) {
            throw new Error("y must be less than height-1");
        }

        return this.values[x + y * this.width];
    }
}