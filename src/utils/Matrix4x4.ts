import Matrix from "./Matrix";

class Matrix4x4 extends Matrix<Matrix4x4> {

    public static readonly identity: Matrix4x4 = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    clone(): Matrix4x4 {
        return new Matrix4x4(
            this.values[0], this.values[1], this.values[2], this.values[3], 
            this.values[4], this.values[5], this.values[6], this.values[7], 
            this.values[8], this.values[9], this.values[10], this.values[11], 
            this.values[12], this.values[13], this.values[14], this.values[15], 
        );
    }

    det(): number {
        throw new Error("Method not implemented.");
    }
    adj(): Matrix4x4 {
        throw new Error("Method not implemented.");
    }

    constructor(a: number, b: number, c: number, d: number,
        e: number, f: number, g: number, h: number, 
        i: number, j: number, k: number, l: number,
        m: number, n: number, o: number, p: number) {
        super([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p], 4);
    }

    getColumnMajorArray(): number[] {
        return [
            this.values[0], this.values[4], this.values[8], this.values[12], 
            this.values[1], this.values[5], this.values[9], this.values[13], 
            this.values[2], this.values[6], this.values[10], this.values[14], 
            this.values[3], this.values[7], this.values[11], this.values[15], 
        ]
    }

}

export default Matrix4x4;