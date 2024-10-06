import MyEvent from "../utils/MyEvent";
import Component, { ComponentConstructor } from "./Component";

class Collider extends Component {

    onCollision: MyEvent = new MyEvent();
    onCollisionStart: MyEvent = new MyEvent();
    onCollisionEnd: MyEvent = new MyEvent();

}

export default Collider;