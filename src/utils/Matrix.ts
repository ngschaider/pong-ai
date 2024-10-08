import Vector3 from "./Vector3";

abstract class Matrix<T extends Matrix<any>> {

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

    abstract clone(): T;

    transpose(): T {
        const height = this.width;
        const width = this.height;

        const m = this.clone();

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                m.values[x + y * width] = this.getValue(y, x);
            }
        }

        return m;
    }

    multiply(other: Matrix<any>): Matrix<any> {
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

        const m = this.clone();
        m.values = values;
        return m;
    }

    scalarMul(other: number): T {
        const m = this.clone()
        m.values = this.values.map(v => v * other);

        return m;
    }

    scalarDiv(other: number): T {
        const m = this.clone()
        m.values = this.values.map(v => v / other);

        return m;
    }

    abstract det(): number;

    abstract adj(): T;

    
    invert<T extends this>(): T {
        return this.adj().scalarDiv(this.det()) as T;
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