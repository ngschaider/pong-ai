import Collider from "./Collider";
import Vector2 from "../utils/Vector2"

class Collisions {

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

export default Collisions;