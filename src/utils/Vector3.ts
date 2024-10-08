import Matrix from "./Matrix";
import Vector2 from "./Vector2";

class Vector3 {

    static zero = new Vector3(0, 0 ,0);
    static one = new Vector3(1, 1, 1);
    static right = new Vector3(1, 0, 0);
    static left = new Vector3(-1, 0, 0);
    static up = new Vector3(0, 1, 0);
    static down = new Vector3(0, -1, 0);
    static back = new Vector3(0, 0, -1);
    static front = new Vector3(0, 0, 1);

    private _x: number;
    public get x() {
        return this._x;
    }
    private set x(value: number) {
        this._x = value;
    }

    private _y: number;
    public get y() {
        return this._y;
    }
    private set y(value: number) {
        this._y = value;
    }

    private _z: number;
    public get z() {
        return this._z;
    }
    private set z(value: number) {
        this._z = value;
    }

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;    }
    
    get xx() {
        return new Vector2(this.x, this.x);
    }
    get xy() {
        return new Vector2(this.x, this.y);
    }
    get xz() {
        return new Vector2(this.x, this.z);
    }
    get yx() {
        return new Vector2(this.y, this.x);
    }
    get yy() {
        return new Vector2(this.y, this.y);
    }
    get yz() {
        return new Vector2(this.y, this.z);
    }
    get zx() {
        return new Vector2(this.z, this.x);
    }
    get zy() {
        return new Vector2(this.z, this.y);
    }
    get zz() {
        return new Vector2(this.z, this.z);
    }

    get magnitude() {
        return Math.abs(Math.sqrt(this.x**2 + this.y**2 + this.z**2));
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    add(v: Vector3): Vector3 {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v: Vector3|Vector2): Vector3 {
        if(v instanceof Vector2) {
            v = v.toVector3();
        }

        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    scalarMul(v: Vector3|number): Vector3 {
        if(typeof v === "number") {
            return new Vector3(this.x * v, this.y * v, this.z * v);
        } else if(v instanceof Vector3) {
            return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        } else {
            throw new Error("Invalid type encountered: " + typeof v);
        }
    }

    scalarDiv(v: Vector3|number): Vector3 {
        if(typeof v === "number") {
            return new Vector3(this.x / v, this.y / v, this.z * v);
        } else if(v instanceof Vector3) {
            return new Vector3(this.x / v.x, this.y / v.y, this.z * v.z);
        } else {
            throw new Error("Invalid type encountered: " + typeof v);
        }
    }

    public applyMatrix(m: Matrix<any>) {
        if(m.width !== 3 || m.height !== 3) {
            throw new Error("Applying a matrix is only implemented for 3x3 matrices.");
        }
        
        return new Vector3(
            m.getValue(0, 0) * this.x + m.getValue(1, 0) * this.y + m.getValue(2, 0) * this.z,
            m.getValue(0, 1) * this.x + m.getValue(1, 1) * this.y + m.getValue(2, 1) * this.z,
            m.getValue(0, 2) * this.x + m.getValue(1, 2) * this.y + m.getValue(2, 2) * this.z
        );
    }

}

export default Vector3;