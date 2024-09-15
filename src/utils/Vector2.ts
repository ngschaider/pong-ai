class Vector2 {

    static Zero = new Vector2(0, 0);
    static One = new Vector2(1, 1);

    static Right = new Vector2(1, 0);
    static Down = new Vector2(0, -1);
    static Up = new Vector2(0, 1);
    static Left = new Vector2(-1, 0);
    
    static get Random() {
        return new Vector2(Math.random(), Math.random());
    }

    static fromPolars(magnitude: number, angle: number): Vector2 {
        const x = magnitude * Math.cos(angle);        
        const y = magnitude * Math.sin(angle);
        return new Vector2(x, y);
    }

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    mul(v: Vector2): Vector2 {
        return Vector2.fromPolars(this.magnitude * v.magnitude, this.angle + v.angle);
    }

    scalarMul(v: Vector2|number): Vector2 {
        if(typeof v === "number") {
            return new Vector2(this.x * v, this.y * v);
        } else if(v instanceof Vector2) {
            return new Vector2(this.x * v.x, this.y * v.y);
        } else {
            throw new Error("Invalid type encountered: " + typeof v);
        }
    }

    clampX(min: number, max: number): Vector2 {
        return new Vector2(Math.min(max, Math.max(min, this.x)), this.y);
    }
    
    clampY(min: number, max: number): Vector2 {
        return new Vector2(this.x, Math.min(max, Math.max(min, this.y)));
    }
}

export default Vector2;