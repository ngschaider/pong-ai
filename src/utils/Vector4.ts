import Matrix4x4 from "./Matrix4x4";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

class Vector4 {
    
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public applyMatrix(m: Matrix4x4) {
        return new Vector4(
            m.getValue(0, 0) * this.x + m.getValue(1, 0) * this.y + m.getValue(2, 0) * this.z + m.getValue(3, 0) * this.w,
            m.getValue(0, 1) * this.x + m.getValue(1, 1) * this.y + m.getValue(2, 1) * this.z + m.getValue(3, 1) * this.w,
            m.getValue(0, 2) * this.x + m.getValue(1, 2) * this.y + m.getValue(2, 2) * this.z + m.getValue(3, 2) * this.w,
            m.getValue(0, 3) * this.x + m.getValue(1, 3) * this.y + m.getValue(2, 3) * this.z + m.getValue(3, 3) * this.w,
        );
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
    get xw() {
        return new Vector2(this.x, this.w);
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
    get yw() {
        return new Vector2(this.y, this.w);
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
    get zw() {
        return new Vector2(this.z, this.w);
    }
    
    get wx() {
        return new Vector2(this.w, this.x);
    }
    get wy() {
        return new Vector2(this.w, this.y);
    }
    get wz() {
        return new Vector2(this.w, this.z);
    }

    get xxx() {
        return new Vector3(this.x, this.x, this.x);
    }
    get xxy() {
        return new Vector3(this.x, this.x, this.y);
    }
    get xxz() {
        return new Vector3(this.x, this.x, this.z);
    }
    get xyx() {
        return new Vector3(this.x, this.y, this.x);
    }
    get xyy() {
        return new Vector3(this.x, this.y, this.y);
    }
    get xyz() {
        return new Vector3(this.x, this.y, this.z);
    }
    get xzx() {
        return new Vector3(this.x, this.z, this.x);
    }
    get xzy() {
        return new Vector3(this.x, this.z, this.y);
    }
    get xzz() {
        return new Vector3(this.x, this.z, this.z);
    }

    get yxx() {
        return new Vector3(this.y, this.x, this.x);
    }
    get yxy() {
        return new Vector3(this.y, this.x, this.y);
    }
    get yxz() {
        return new Vector3(this.y, this.x, this.z);
    }
    get yyx() {
        return new Vector3(this.y, this.y, this.x);
    }
    get yyy() {
        return new Vector3(this.y, this.y, this.y);
    }
    get yyz() {
        return new Vector3(this.y, this.y, this.z);
    }
    get yzx() {
        return new Vector3(this.y, this.z, this.x);
    }
    get yzy() {
        return new Vector3(this.y, this.z, this.y);
    }
    get yzz() {
        return new Vector3(this.y, this.z, this.z);
    }

    get zxx() {
        return new Vector3(this.z, this.x, this.x);
    }
    get zxy() {
        return new Vector3(this.z, this.x, this.y);
    }
    get zxz() {
        return new Vector3(this.z, this.x, this.z);
    }
    get zyx() {
        return new Vector3(this.z, this.y, this.z);
    }
    get zyy() {
        return new Vector3(this.z, this.y, this.y);
    }
    get zyz() {
        return new Vector3(this.z, this.y, this.z);
    }
    get zzx() {
        return new Vector3(this.z, this.z, this.x);
    }
    get zzy() {
        return new Vector3(this.z, this.z, this.y);
    }
    get zzz() {
        return new Vector3(this.z, this.z, this.z);
    }

}

export default Vector4;