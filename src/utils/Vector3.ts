import Vector2 from "./Vector2";

class Vector3 {

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
        this._z = z;
    }
    
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

}

export default Vector3;