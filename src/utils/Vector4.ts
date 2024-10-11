import Matrix4x4 from "./Matrix4x4";

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

}

export default Vector4;