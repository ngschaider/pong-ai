import Matrix3x3 from "./Matrix3x3";
import Matrix4x4 from "./Matrix4x4";
import Quaternion from "./Quaternion";
import Vector2 from "./Vector2";
import Vector4 from "./Vector4";

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

    get magnitudeSquared() {
        return this.x**2 + this.y**2 + this.z**2;
    }

    get magnitude() {
        return Math.sqrt(this.magnitudeSquared);
    }

    add(v: Vector3): Vector3 {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v: Vector3|Vector2): Vector3 {
        if(v instanceof Vector2) {
            v = v.toVector3();
        }

        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mul(v: Vector3|number): Vector3 {
        if(typeof v === "number") {
            return new Vector3(this.x * v, this.y * v, this.z * v);
        } else if(v instanceof Vector3) {
            return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        } else {
            throw new Error("Invalid type encountered: " + typeof v);
        }
    }

    div(v: number): Vector3 {
        return new Vector3(this.x / v, this.y / v, this.z / v);
    }

    rotate(rotation: Quaternion): Vector3 {
        const positionQuaternion = new Quaternion(this.x, this.y, this.z, 0);
        const inverseRotation = rotation.invert();

        const newPositionQuaternion = rotation.mul(positionQuaternion).mul(inverseRotation);

        return new Vector3(
            newPositionQuaternion.x, 
            newPositionQuaternion.y, 
            newPositionQuaternion.z
        );
    }

    /**
     * the "cross product"
     * also called "vector product" or "directed area product"
     */
    cross(v: Vector3): Vector3 {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    /**
     * the "dot product"
     * also called "inner product" or "projection product"
     */
    dot(v: Vector3): number {
        return this.x * v.x 
            + this.y * v.y
            + this.z * v.z;
    }

    public applyMatrix(m: Matrix3x3|Matrix4x4) {
        if(m instanceof Matrix3x3) {
            return new Vector3(
                m.getValue(0, 0) * this.x + m.getValue(1, 0) * this.y + m.getValue(2, 0) * this.z,
                m.getValue(0, 1) * this.x + m.getValue(1, 1) * this.y + m.getValue(2, 1) * this.z,
                m.getValue(0, 2) * this.x + m.getValue(1, 2) * this.y + m.getValue(2, 2) * this.z
            );
        } else if(m instanceof Matrix4x4) {
            const v4 = new Vector4(this.x, this.y, this.z, 1).applyMatrix(m);
            return new Vector3(v4.x, v4.y, v4.z);
        } else {
            throw new Error("Encountered unsupported type.");
        }
    }

}

export default Vector3;