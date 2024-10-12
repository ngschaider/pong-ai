import Vector2 from "../../utils/Vector2";
import Collider2D from "./Collider2D";

class Collision2D {

    bodyA: Collider2D;
    bodyB: Collider2D;

    depth: number;
    normal: Vector2;

    contacts: Vector2[];

    constructor(bodyA: Collider2D, bodyB: Collider2D, depth: number, normal: Vector2, contacts: Vector2[]) {
        this.bodyA = bodyA;
        this.bodyB = bodyB;
        this.depth = depth;
        this.normal = normal;
        this.contacts = contacts;
    }

}

export default Collision2D;