import Vector2 from "../utils/Vector2";
import Collider from "./Collider";
import Polygon from "./Polygon";

class PolygonCollider extends Collider {

    polygon: Polygon = new Polygon([
        new Vector2(-0.5, -0.5), 
        new Vector2(0.5, -0.5), 
        new Vector2(0.5, 0.5), 
        new Vector2(0.5, -0.5)
    ]);

    getWorldPolygon(): Polygon {
        const matrix = this.transform.getMatrix();

        return new Polygon(this.polygon.vertices.map(v => v.applyMatrix(matrix)));
    }

}

export default PolygonCollider;