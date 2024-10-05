import Vector2 from "../utils/Vector2";
import Collider from "./Collider";
import Rect from "./Rect";

class RectangleCollider extends Collider {

    public localRect: Rect = new Rect(Vector2.zero, Vector2.one)

}

export default RectangleCollider;