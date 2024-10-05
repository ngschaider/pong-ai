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

    constructor(x: number, y: number, z?: number) {
        this._x = x;
        this._y = y;
        this._z = z ?? 0;
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