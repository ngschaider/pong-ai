import Vector2 from "../utils/Vector2";
import Component from "./Component";
import GameObject from "./GameObject";
import Transform from "./Transform";

class RigidBody extends Component {

    velocity: Vector2 = Vector2.Zero;
    acceleration: Vector2 = Vector2.Zero

    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.gameObject.transform.position = this.gameObject.transform.position.add(this.velocity);
    }

}

export default RigidBody;