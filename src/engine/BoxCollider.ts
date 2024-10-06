import Vector2 from "../utils/Vector2";
import Collider from "./Collider";
import Polygon from "./Polygon";
import PolygonCollider from "./PolygonCollider";
import Rect from "./Rect";

class BoxCollider extends PolygonCollider {

    public rect: Rect = new Rect(Vector2.zero, Vector2.one)

    public getWorldPolygon() {
        const matrix = this.transform.getMatrix();
        
        const p1 = this.rect.topLeft.applyMatrix(matrix);
        const p2 = this.rect.topRight.applyMatrix(matrix);
        const p3 = this.rect.bottomRight.applyMatrix(matrix);
        const p4 = this.rect.bottomLeft.applyMatrix(matrix);

        return new Polygon([p1, p2, p3, p4]);
    }

}

export default BoxCollider;