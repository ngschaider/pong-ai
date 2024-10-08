import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import CircleRenderer from "./CircleRenderer";
import Collider from "./Collider";
import GameObject from "./GameObject";

const DEBUG = true;

class CircleCollider extends Collider {

    localPosition: Vector2 = Vector2.zero;
    radius: number = 0.5;

    public get worldRadius(): number {
        // apply scaleX
        return this.radius * this.transform.getMatrix().getValue(0, 0);
    }

    public get worldPosition(): Vector2 {
        const matrix = this.transform.getMatrix();
        return this.localPosition.applyMatrix(matrix);
    }

}

export default CircleCollider;