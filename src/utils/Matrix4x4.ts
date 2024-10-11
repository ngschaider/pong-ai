import Quaternion from "./Quaternion";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

class Matrix4x4 {

    public static readonly identity: Matrix4x4 = new Matrix4x4(
        1, 0, 0, 0, 
        0, 1, 0, 0, 
        0, 0, 1, 0, 
        0, 0, 0, 1
    );

    public static translate(pos: Vector3): Matrix4x4 {
        return new Matrix4x4(
            1, 0, 0, pos.x,
            0, 1, 0, pos.y, 
            0, 0, 1, pos.z, 
            0, 0, 0, 1,
        )
    }

    public static rotateX(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4(
            1, 0, 0, 0,
            0, c, -s, 0, 
            0, s, c, 0, 
            0, 0, 0, 1,
        )
    }

    public static rotateY(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4(
            c, 0, s, 0,
            0, 1, 0, 0, 
            -s, 0, c, 0, 
            0, 0, 0, 1,
        )
    }

    public static rotateZ(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4(
            c, -s, 0, 0,
            s, c, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1,
        )
    }

    public static scale(scaling: Vector3): Matrix4x4 {
        return new Matrix4x4(
            scaling.x, 0, 0, 0,
            0, scaling.y, 0, 0, 
            0, 0, scaling.z, 0, 
            0, 0, 0, 1,
        )
    }

    public static orthographic(pos: Vector3, size: Vector3, near: number, far: number) {
        return new Matrix4x4(
            2 / size.x, 0, 0, pos.x,
            0, 2/ size.y, 0, pos.y,
            0, 0, 2 / (near - far), pos.z,
            0, 0, 0, 1
        )
    }

    public static TRS(position: Vector3, rotation: Quaternion, scaling: Vector3): Matrix4x4 {
        const euler = rotation.getEulerAngles();

        return this.translate(position)
            .multiply(this.rotateZ(euler.z))
            .multiply(this.rotateX(euler.x))
            .multiply(this.rotateY(euler.y))
            .multiply(this.scale(scaling));
    }

    clone(): Matrix4x4 {
        return new Matrix4x4(
            this.values[0], this.values[1], this.values[2], this.values[3], 
            this.values[4], this.values[5], this.values[6], this.values[7], 
            this.values[8], this.values[9], this.values[10], this.values[11], 
            this.values[12], this.values[13], this.values[14], this.values[15], 
        );
    }

    public get height() {
        return this.values.length / this.width;
    }

    public multiply(other: Matrix4x4): Matrix4x4 {
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

    public getValue(x: number, y: number): number {
        return this.values[x + y * this.width];
    }

    transpose(): Matrix4x4 {
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

    det(): number {
        throw new Error("Method not implemented.");
    }
    adj(): Matrix4x4 {
        throw new Error("Method not implemented.");
    }

    values: number[];
    width: number;

    constructor(a: number, b: number, c: number, d: number,
        e: number, f: number, g: number, h: number, 
        i: number, j: number, k: number, l: number,
        m: number, n: number, o: number, p: number) {
        this.values = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
        this.width = 4;
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