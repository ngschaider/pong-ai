import Collider from "../engine/Collider";
import Vector2 from "./Vector2"

class Collision {

    bodyA: Collider;
    bodyB: Collider;

    depth: number;
    normal: Vector2;

    contacts: Vector2[];

    constructor(bodyA: Collider, bodyB: Collider, depth: number, normal: Vector2, contacts: Vector2[]) {
        this.bodyA = bodyA;
        this.bodyB = bodyB;
        this.depth = depth;
        this.normal = normal;
        this.contacts = contacts;
    }

}

export default Collision;