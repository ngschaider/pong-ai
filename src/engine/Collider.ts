import MyEvent from "../utils/MyEvent";
import Component, { ComponentConstructor } from "./Component";
import Polygon from "./Polygon";

abstract class Collider extends Component {

    onCollision: MyEvent = new MyEvent();
    onCollisionStart: MyEvent = new MyEvent();
    onCollisionEnd: MyEvent = new MyEvent();

    public abstract getPolygon(): Polygon;

}

export default Collider;