import { vec2 } from "gl-matrix";
import Vector2 from "../utils/Vector2";
import AnchorPoint from "../engine/AnchorPoint";
import Collider from "./Collider";
import Polygon from "../engine/Polygon";
import PolygonCollider from "./PolygonCollider";
import Rect from "../engine/Rect";

class BoxCollider extends PolygonCollider {

    public rect: Rect = new Rect(Vector2.zero, AnchorPoint.CenterCenter, Vector2.one)

    public getLocalPolygon(): Polygon {
        return new Polygon([
            this.rect.topLeft, 
            this.rect.topRight, 
            this.rect.bottomRight, 
            this.rect.bottomLeft
        ]);
    }

}

export default BoxCollider;