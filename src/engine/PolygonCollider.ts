import Vector2 from "../utils/Vector2";
import Collider from "./Collider";
import Polygon from "./Polygon";

abstract class PolygonCollider extends Collider {

    abstract getWorldPolygon(): Polygon;

}

export default PolygonCollider;