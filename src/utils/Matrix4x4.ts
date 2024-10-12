import Matrix3x3 from "./Matrix3x3";
import Quaternion from "./Quaternion";
import Vector3 from "./Vector3";

class Matrix4x4 {

    public static readonly identity: Matrix4x4 = new Matrix4x4([
        1, 0, 0, 0, 
        0, 1, 0, 0, 
        0, 0, 1, 0, 
        0, 0, 0, 1
    ]);

    public static translate(pos: Vector3): Matrix4x4 {
        return new Matrix4x4([
            1, 0, 0, pos.x,
            0, 1, 0, pos.y, 
            0, 0, 1, pos.z, 
            0, 0, 0, 1,
        ]);
    }

    public static rotateX(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4([
            1, 0, 0, 0,
            0, c, -s, 0, 
            0, s, c, 0, 
            0, 0, 0, 1,
        ]);
    }

    public static rotateY(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4([
            c, 0, s, 0,
            0, 1, 0, 0, 
            -s, 0, c, 0, 
            0, 0, 0, 1,
        ]);
    }

    public static rotateZ(rotation: number): Matrix4x4 {
        const c = Math.cos(rotation/180 * Math.PI);
        const s = Math.sin(rotation/180 * Math.PI);
        return new Matrix4x4([
            c, -s, 0, 0,
            s, c, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1,
        ]);
    }

    public static scale(scaling: Vector3): Matrix4x4 {
        return new Matrix4x4([
            scaling.x, 0, 0, 0,
            0, scaling.y, 0, 0, 
            0, 0, scaling.z, 0, 
            0, 0, 0, 1,
        ]);
    }

    public static orthographic(pos: Vector3, size: Vector3, near: number, far: number) {
        return new Matrix4x4([
            2 / size.x, 0, 0, pos.x,
            0, 2/ size.y, 0, pos.y,
            0, 0, 2 / (near - far), pos.z,
            0, 0, 0, 1
        ])
    }

    public static TRS(position: Vector3, rotation: Quaternion, scaling: Vector3): Matrix4x4 {
        const euler = rotation.getEulerAngles();

        return this.translate(position)
            .mul(this.rotateZ(euler.z))
            .mul(this.rotateX(euler.x))
            .mul(this.rotateY(euler.y))
            .mul(this.scale(scaling));
    }


    public readonly values: ReadonlyArray<number>;
    public readonly width: number = 4;
    public readonly height: number = 4;

    constructor(values: number[]) {
        if(values.length !== this.width * this.height) {
            throw new Error("Invalid amount of values");
        }
        this.values = values;
        // this.values = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
    }

    public clone(): Matrix4x4 {
        return new Matrix4x4([
            this.values[0], this.values[1], this.values[2], this.values[3], 
            this.values[4], this.values[5], this.values[6], this.values[7], 
            this.values[8], this.values[9], this.values[10], this.values[11], 
            this.values[12], this.values[13], this.values[14], this.values[15], 
        ]);
    }

    public div(other: number): Matrix4x4 {
        const v = this.values.map(v => v / other)
        return new Matrix4x4(v);
    }

    public mul(other: Matrix4x4): Matrix4x4 {
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

        return new Matrix4x4(values);
    }

    public getValue(x: number, y: number): number {
        return this.values[x + y * this.width];
    }

    public transpose(): Matrix4x4 {
        const values: number[] = [];

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                values.push(this.getValue(y, x));
            }
        }

        return new Matrix4x4(values);
    }

    public det(): number {
        return this.getValue(0, 0) * this.getValue(1, 1) * this.getValue(2, 2) * this.getValue(3, 3)
            + this.getValue(0, 1) * this.getValue(1, 2) * this.getValue(2, 3) * this.getValue(3, 0)
            + this.getValue(0, 2) * this.getValue(1, 3) * this.getValue(2, 0) * this.getValue(3, 1)
            + this.getValue(0, 3) * this.getValue(1, 0) * this.getValue(2, 1) * this.getValue(3, 2)
            - this.getValue(3, 0) * this.getValue(2, 1) * this.getValue(1, 2) * this.getValue(0, 3)
            - this.getValue(3, 1) * this.getValue(2, 2) * this.getValue(1, 3) * this.getValue(0, 0)
            - this.getValue(3, 3) * this.getValue(2, 0) * this.getValue(1, 1) * this.getValue(0, 2);
    }

    /**
     * TODO: optimize this with analytically simplified calculation tailored to 4x4 matrices
     */
    public adj(): Matrix4x4 {
        const getM = (x: number, y: number) => {
            const values: number[] = [];
            for(let yi = 0; yi < this.height; yi++) {
                if(yi === y) continue;
                for(let xi = 0; xi < this.width; xi++) {
                    if(xi === x) continue;
                    values.push(this.getValue(xi, yi));
                }
            }

            return new Matrix3x3(values);
        }

        const values: number[] = [];
        for(let yi = 0; yi < this.height; yi++) {
            for(let xi = 0; xi < this.width; xi++) {
                const sign = (-1)**((yi+1)*(xi+1));
                values.push(sign * getM(xi, yi).det());
            }
        }

        return new Matrix4x4(values);
    }

    public invert(): Matrix4x4 {
        return this.adj().div(this.det());
    }

    public getColumnMajorArray(): number[] {
        return [
            this.values[0], this.values[4], this.values[8], this.values[12], 
            this.values[1], this.values[5], this.values[9], this.values[13], 
            this.values[2], this.values[6], this.values[10], this.values[14], 
            this.values[3], this.values[7], this.values[11], this.values[15], 
        ]
    }


}

export default Matrix4x4;