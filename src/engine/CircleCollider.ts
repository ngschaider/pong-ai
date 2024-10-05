import Vector2 from "../utils/Vector2";
import Collider from "./Collider";

class CircleCollider extends Collider {

    offset: Vector2 = Vector2.zero;
    diameter: number = 1;

    public get polygon() {
        
    }

}

export default CircleCollider;