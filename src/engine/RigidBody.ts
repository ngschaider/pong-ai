import Vector3 from "../utils/Vector3";
import Component from "./Component";
import GameObject from "./GameObject";

class RigidBody extends Component {

    velocity: Vector3 = Vector3.zero;
    acceleration: Vector3 = Vector3.zero

    angularVelocity: number = 0;
    angularAcceleration: number = 0;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public fixedUpdate(): void {
        this.velocity = this.velocity.add(this.acceleration);
        this.transform.position = this.transform.position.add(this.velocity);

        this.angularVelocity += this.angularAcceleration;
        this.transform.rotation += this.angularVelocity;
    }

}

export default RigidBody;