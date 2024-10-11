import Vector3 from "./Vector3";

class Quaternion {

    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public static identity = new Quaternion(0, 0, 0, 1);

    public static fromAngleAxis(angle: number, axis: Vector3): Quaternion {
        angle = angle / 180 * Math.PI;
        const vec = axis.mul(Math.sin(angle / 2));
        const scalar = Math.cos(angle / 2);

        return new Quaternion(vec.x, vec.y, vec.z, scalar);
    }

    public static fromEulerAngles(deg: Vector3): Quaternion {
        const rad = deg.mul(Math.PI/180);
        const cx = Math.cos(rad.x/2);
        const sx = Math.sin(rad.x/2);
        const cy = Math.cos(rad.y/2);
        const sy = Math.sin(rad.y/2);
        const cz = Math.cos(rad.z/2);
        const sz = Math.sin(rad.z/2);

        return new Quaternion(
            cx * cy * cz + sx * sy * sz,
            sx * cy * cz - cx * sy * sz,
            cx * cy * sz + sx * cy * sz,
            cx * cy * sz - sx * sy * cz,
        );
    }

    public static Lerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        const vector = a.vector.mul(1 - t).add(b.vector.mul(t));
        const scalar = a.w * (1 - t) + b.w * t;
        
        const factor = Math.sqrt(vector.magnitudeSquared + scalar * scalar)

        const v = vector.div(factor);
        const w = scalar / factor;

        return new Quaternion(v.x, v.y, v.z, w);
    }

    public get vector(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    public toAngleAxis(): {angle: number, axis: Vector3} {
        throw new Error();
    }

    public getEulerAngles(): Vector3 {
        const sinx_cosy = 2 * (this.w * this.x + this.y * this.z);
        const cosx_cosy = 1 - 2 * (this.x * this.x + this.y * this.y);
        const siny = Math.sqrt(1 + 2 * (this.w * this.y - this.x * this.z));
        const cosy = Math.sqrt(1 - 2 * (this.w * this.y - this.x * this.z));
        const sinz_cosy = 2 * (this.w * this.z + this.x * this.y);
        const cosz_cosy = 1 - 2 * (this.y * this.y + this.z * this.z);

        return new Vector3(
            Math.atan2(sinx_cosy, cosx_cosy) * 180/Math.PI,
            (2 * Math.atan2(siny, cosy) - Math.PI / 2) * 180/Math.PI,
            Math.atan2(sinz_cosy, cosz_cosy) * 180/Math.PI,
        )
    }

    public mul(q: Quaternion): Quaternion {
        const vector = q.vector.mul(this.w); + this.vector.mul(q.w);
        const scalar = this.w * q.w - this.vector.dot(q.vector);

        return new Quaternion(vector.x, vector.y, vector.z, scalar);
    }

    public dot(q: Quaternion): number {
        return this.x * q.x
            + this.y * q.y
            + this.z * q.z
            + this.w * q.w;
    }

    public invert(): Quaternion {
        return new Quaternion(-this.x, -this.y, -this.z, this.w);
    }

}

export default Quaternion;