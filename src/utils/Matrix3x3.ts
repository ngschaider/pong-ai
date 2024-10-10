import Matrix from "./Matrix";
import Matrix2x2 from "./Matrix2x2";
import Matrix4x4 from "./Matrix4x4";
import Vector2 from "./Vector2";

class Matrix3x3 extends Matrix<Matrix3x3> {

    public static readonly identity: Matrix3x3 = new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1);

    constructor(a: number, b: number, c: number, 
        d: number, e: number, f: number, 
        g: number, h: number, i: number) {

        super([a, b, c, d, e, f, g, h, i], 3);
    }

    getColumnMajorArray(): number[] {
        return [
            this.values[0], this.values[3], this.values[6], 
            this.values[1], this.values[4], this.values[7],
            this.values[2], this.values[5], this.values[8],
        ]
    }
    
    toMatrix4x4() {
        return new Matrix4x4(
            this.values[0], this.values[1], this.values[2], 0,
            this.values[3], this.values[4], this.values[5], 0,
            this.values[6], this.values[7], this.values[8], 0,
            0, 0, 0, 1
        );
    }

    clone(): Matrix3x3 {
        return new Matrix3x3(
            this.values[0], this.values[1], this.values[2], 
            this.values[3], this.values[4], this.values[5], 
            this.values[6], this.values[7], this.values[8], 
        );
    }

    det(): number {
        return this.getValue(0, 0) * this.getValue(1, 1) * this.getValue(2, 2)
                + this.getValue(1, 0) * this.getValue(2, 1) * this.getValue(0, 2)
                + this.getValue(2, 0) * this.getValue(0, 1) * this.getValue(1, 2)
                - this.getValue(2, 0) * this.getValue(1, 1) * this.getValue(0, 2)
                - this.getValue(0, 0) * this.getValue(2, 1) * this.getValue(1, 2)
                - this.getValue(1, 0) * this.getValue(0, 1) * this.getValue(2, 2);
    }

    adj(): Matrix3x3 {
        const a = this.getValue(0, 0);
        const b = this.getValue(1, 0);
        const c = this.getValue(2, 0);
        const d = this.getValue(0, 1);
        const e = this.getValue(1, 1);
        const f = this.getValue(2, 1);
        const g = this.getValue(0, 2);
        const h = this.getValue(1, 2);
        const i = this.getValue(2, 2);
        return new Matrix3x3(e*i-f*h, c*h-b*i, b*f-c*e, f*g-d*i, a*i-c*g, c*d-a*f, d*h-e*g, b*g-a*h, a*e-b*d);
    }

    multiply(other: Matrix3x3): Matrix3x3 {
        const a = super.multiply(other);

        const ret = new Matrix3x3(0, 0, 0, 0, 0, 0, 0, 0, 0);
        ret.values = a.values;

        return ret;
    }

    toMatrix2x2(): Matrix2x2 {
        return new Matrix2x2(this.values[0], this.values[1], this.values[3], this.values[4]);
    }

    public static translate(position: Vector2): Matrix3x3 {
        return new Matrix3x3(1, 0, position.x, 0, 1, position.y, 0, 0, 1);
    }

    public static rotate(rotation: number): Matrix3x3 {
        return new Matrix3x3(
            Math.cos(rotation/180*Math.PI), -Math.sin(rotation/180*Math.PI), 0, 
            Math.sin(rotation/180*Math.PI), Math.cos(rotation/180*Math.PI), 0, 
            0, 0, 1
        );
    }

    public static scale(scale: Vector2): Matrix3x3 {
        return new Matrix3x3(
            scale.x, 0, 0, 
            0, scale.y, 0,
            0, 0, 1
        );
    }

    public static TRS(position: Vector2, rotation: number, scaling: Vector2): Matrix3x3 {
        const translate = this.translate(position)
        const rotate = this.rotate(rotation);
        const scale = this.scale(scaling);

         return translate.multiply(rotate).multiply(scale);
    }

}

export default Matrix3x3;