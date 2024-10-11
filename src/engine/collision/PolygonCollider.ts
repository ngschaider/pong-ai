import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Polygon from "../Polygon";
import Rect from "../Rect";
import Collider from "./Collider";

abstract class PolygonCollider extends Collider {

    abstract getLocalPolygon(): Polygon;

    getWorldPolygon(): Polygon {
        const matrix = this.transform.getLocalToWorldMatrix();
        const local = this.getLocalPolygon();
        return new Polygon(local.vertices.map(v => v.applyMatrix(matrix)));
    }

    getLocalBounds(): Rect {
        const g = this.getLocalPolygon();

        const minX = Math.min(...g.vertices.map(v => v.x));
        const maxX = Math.max(...g.vertices.map(v => v.x));
        const minY = Math.min(...g.vertices.map(v => v.y));
        const maxY = Math.max(...g.vertices.map(v => v.y));

        const min = new Vector2(minX, minY);
        const max = new Vector2(maxX, maxY);

        return new Rect(min, AnchorPoint.TopLeft, max.sub(min));
    }

}

export default PolygonCollider;