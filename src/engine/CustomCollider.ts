import Vector2 from "../utils/Vector2";
import Polygon from "./Polygon";
import PolygonCollider from "./PolygonCollider";

class CustomCollider extends PolygonCollider {
    
    localPolygon: Polygon = new Polygon([
        new Vector2(-0.5, -0.5), 
        new Vector2(0.5, -0.5), 
        new Vector2(0.5, 0.5), 
        new Vector2(0.5, -0.5)
    ]);

    getLocalPolygon(): Polygon {
        return this.localPolygon;
    }

}

export default CustomCollider;