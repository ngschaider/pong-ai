import Vector2 from "../../utils/Vector2";
import Polygon2D from "../Polygon2D";
import PolygonCollider2D from "./PolygonCollider2D";

class CustomCollider2D extends PolygonCollider2D {
    
    localPolygon: Polygon2D = new Polygon2D([
        new Vector2(-0.5, -0.5), 
        new Vector2(0.5, -0.5), 
        new Vector2(0.5, 0.5), 
        new Vector2(0.5, -0.5)
    ]);

    getLocalPolygon(): Polygon2D {
        return this.localPolygon;
    }

}

export default CustomCollider2D;