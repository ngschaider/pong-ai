import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import CircleRenderer from "./CircleRenderer";
import Collider from "./Collider";
import GameObject from "./GameObject";

const DEBUG = true;

class CircleCollider extends Collider {

    offset: Vector2 = Vector2.zero;
    diameter: number = 1;

    public get position(): Vector3 {
        return this.transform.position.add(this.offset.toVector3());
    }

}

export default CircleCollider;