import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Polygon2D from "../Polygon2D";
import Rect from "../Rect";
import PolygonCollider2D from "./PolygonCollider2D";

class RectangleCollider2D extends PolygonCollider2D {

    public rect: Rect = new Rect(Vector2.zero, AnchorPoint.CenterCenter, Vector2.one)

    public getLocalPolygon(): Polygon2D {
        return new Polygon2D([
            this.rect.topLeft, 
            this.rect.topRight, 
            this.rect.bottomRight, 
            this.rect.bottomLeft
        ]);
    }

}

export default RectangleCollider2D;