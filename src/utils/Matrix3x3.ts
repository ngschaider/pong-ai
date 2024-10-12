import Matrix2x2 from "./Matrix2x2";
import Matrix4x4 from "./Matrix4x4";
import Vector2 from "./Vector2";

class Matrix3x3 {

    public static readonly identity: Matrix3x3 = new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    public static translate(position: Vector2): Matrix3x3 {
        return new Matrix3x3([
            1, 0, position.x, 
            0, 1, position.y, 
            0, 0, 1
        ]);
    }

    public static rotate(rotation: number): Matrix3x3 {
        return new Matrix3x3([
            Math.cos(rotation/180*Math.PI), -Math.sin(rotation/180*Math.PI), 0, 
            Math.sin(rotation/180*Math.PI), Math.cos(rotation/180*Math.PI), 0, 
            0, 0, 1
        ]);
    }

    public static scale(scale: Vector2): Matrix3x3 {
        return new Matrix3x3([
            scale.x, 0, 0, 
            0, scale.y, 0,
            0, 0, 1
        ]);
    }

    public static TRS(position: Vector2, rotation: number, scaling: Vector2): Matrix3x3 {
        const translate = this.translate(position)
        const rotate = this.rotate(rotation);
        const scale = this.scale(scaling);

        return translate.mul(rotate).mul(scale);
    }


    public readonly values: number[];

    public readonly width: number = 3;
    public readonly height: number = 3;

    constructor(values: number[]) {
        if(values.length != this.width * this.height) {
            throw new Error("Wrong amount of values supplied.");
        }
        this.values = values;
    }

    getColumnMajorArray(): number[] {
        return [
            this.values[0], this.values[3], this.values[6], 
            this.values[1], this.values[4], this.values[7],
            this.values[2], this.values[5], this.values[8],
        ]
    }
    
    toMatrix4x4() {
        return new Matrix4x4([
            this.values[0], this.values[1], this.values[2], 0,
            this.values[3], this.values[4], this.values[5], 0,
            this.values[6], this.values[7], this.values[8], 0,
            0, 0, 0, 1
        ]);
    }

    clone(): Matrix3x3 {
        return new Matrix3x3([
            this.values[0], this.values[1], this.values[2], 
            this.values[3], this.values[4], this.values[5], 
            this.values[6], this.values[7], this.values[8], 
        ]);
    }

    transpose(): Matrix3x3 {
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

    getValue(x: number, y: number): number {
        if(x < 0) throw new Error("x must be positive.");
        if(y < 0) throw new Error("y must be positive.");
        if(x >= this.width) throw new Error("x must be below width.");
        if(y >= this.height) throw new Error("y must be below height.");

        return this.values[x + y * this.width];
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
        return new Matrix3x3([
            e*i-f*h, c*h-b*i, b*f-c*e, 
            f*g-d*i, a*i-c*g, c*d-a*f, 
            d*h-e*g, b*g-a*h, a*e-b*d
        ]);
    }

    div(other: number): Matrix3x3 {
        const values = this.values.map(v => v / other);
        return new Matrix3x3(values);
    }

    invert(): Matrix3x3 {
        return this.adj().div(this.det());
    }

    mul(other: Matrix3x3|number): Matrix3x3 {
        if(typeof other === "number") {
            const values = this.values.map(v => v * other);
            return new Matrix3x3(values)
        } else {
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

            return new Matrix3x3(values);
        }
    }

    toMatrix2x2(): Matrix2x2 {
        return new Matrix2x2([
            this.values[0], this.values[1], 
            this.values[3], this.values[4]
        ]);
    }

}

export default Matrix3x3;