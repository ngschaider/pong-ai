import Collider from "./Collider";
import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Rect from "../Rect";

class CircleCollider extends Collider {

    localPosition: Vector2 = Vector2.zero;
    localRadius: number = 0.5;

    public get globalRadius(): number {
        // apply scaleX
        return this.localRadius * this.transform.getLocalToWorldMatrix().getValue(0, 0);
    }

    public get globalPosition(): Vector2 {
        const matrix = this.transform.getLocalToWorldMatrix();
        return this.localPosition.applyMatrix(matrix);
    }

    getLocalAABB(): Rect {
        return new Rect(this.localPosition, AnchorPoint.CenterCenter, new Vector2(this.localRadius*2, this.localRadius*2));
    }
}

export default CircleCollider;