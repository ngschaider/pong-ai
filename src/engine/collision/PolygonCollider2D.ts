import Vector2 from "../../utils/Vector2";
import Vector3 from "../../utils/Vector3";
import AnchorPoint from "../AnchorPoint";
import Polygon2D from "../Polygon2D";
import Rect from "../Rect";
import Collider2D from "./Collider2D";

abstract class PolygonCollider2D extends Collider2D {

    abstract getLocalPolygon(): Polygon2D;

    getWorldPolygon(): Polygon2D {
        const matrix = this.transform.getLocalToWorldMatrix();
        const local = this.getLocalPolygon();
        return new Polygon2D(local.vertices.map(v => v.applyMatrix(matrix)));
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

export default PolygonCollider2D;