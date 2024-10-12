import Matrix2x2 from "./Matrix2x2";
import Matrix3x3 from "./Matrix3x3";
import Matrix4x4 from "./Matrix4x4";
import NumberUtils from "./NumberUtils";
import Vector3 from "./Vector3";
import Vector4 from "./Vector4";

class Vector2 {

    static zero = new Vector2(0, 0);
    static one = new Vector2(1, 1);
    static right = new Vector2(1, 0);
    static down = new Vector2(0, -1);
    static up = new Vector2(0, 1);
    static left = new Vector2(-1, 0);
    
    static get random() {
        return new Vector2(Math.random(), Math.random());
    }

    public static fromPolars(magnitude: number, angle: number): Vector2 {
        const x = magnitude * Math.cos(angle*Math.PI/180);
        const y = magnitude * Math.sin(angle*Math.PI/180);
        return new Vector2(x, y);
    }

    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.magnitudeSquared);
    }

    get magnitudeSquared() {
        return this.x**2 + this.y**2;
    }

    get angle(): number {
        return Math.atan2(this.y, this.x) * 180/Math.PI;
    }

    normal(): Vector2 {
        return new Vector2(-this.y, this.x);
    }

    normalize(): Vector2 {
        return this.div(this.magnitude);
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    /**
     * also called "inner product" or "projection product"
     */
    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    mul(v: Vector2|number) {
        if(v instanceof Vector2) {
            return Vector2.fromPolars(this.magnitude * v.magnitude, this.angle + v.angle);
        } else if(typeof v === "number") {
            return new Vector2(this.x * v, this.y * v);
        } else {
            throw new Error("Invalid type encountered.");
        }
    }
    
    div(v: Vector2|number): Vector2 {
        if(v instanceof Vector2) {
            return Vector2.fromPolars(this.magnitude / v.magnitude, this.angle - v.angle);
        } else if(typeof v === "number") {
            return new Vector2(this.x / v, this.y / v);
        } else {
            throw new Error("Invalid type encountered.");
        }
    }

    public distance(v: Vector2) {
        return v.sub(this).magnitude;
    }

    public distanceSquared(v: Vector2) {
        return v.sub(this).magnitudeSquared;
    }

    public equals(v: Vector2, threshold = 0.0005): boolean {
        return NumberUtils.nearlyEquals(this.x, v.x, threshold) 
            && NumberUtils.nearlyEquals(this.y, v.y, threshold);
    }

    public toVector3(z: number = 0): Vector3 {
        return new Vector3(this.x, this.y, z);
    }

    public applyMatrix(m: Matrix2x2|Matrix3x3|Matrix4x4): Vector2 {
        if(m instanceof Matrix4x4) {
            return new Vector4(this.x, this.y, 0, 0).applyMatrix(m).xy;
        } else if(m instanceof Matrix3x3) {
            return new Vector3(this.x, this.y, 0).applyMatrix(m).xy;
        } else {
            return new Vector2(
                m.getValue(0, 0) * this.x + m.getValue(1, 0) * this.y,
                m.getValue(0, 1) * this.x + m.getValue(1, 1) * this.y,
            );
        }
    }

    // clampX(min: number, max: number): Vector2 {
    //     return new Vector2(Math.min(max, Math.max(min, this.x)), this.y);
    // }
    
    // clampY(min: number, max: number): Vector2 {
    //     return new Vector2(this.x, Math.min(max, Math.max(min, this.y)));
    // }
}

export default Vector2;