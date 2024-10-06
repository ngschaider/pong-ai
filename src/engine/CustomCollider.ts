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

    getWorldPolygon(): Polygon {
        const matrix = this.transform.getMatrix();

        return new Polygon(this.localPolygon.vertices.map(v => v.applyMatrix(matrix)));
    }

}

export default CustomCollider;