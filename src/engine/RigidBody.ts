import Quaternion from "../utils/Quaternion";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Collider2D from "./collision/Collider2D";
import Collision2D from "./collision/Collision2D";
import Component from "./core/Component";
import GameObject from "./core/GameObject";

class RigidBody extends Component {

    velocity: Vector3 = Vector3.zero;
    acceleration: Vector3 = Vector3.zero;

    angularVelocity: Quaternion = Quaternion.identity;
    angularAcceleration: Quaternion = Quaternion.identity;
    mass: number = 1;
    restitution = 0.6;


    constructor(gameObject: GameObject) {
        super(gameObject);

        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        const collider = this.gameObject.getComponent(Collider2D);
        if(!collider) return;

        collider.onCollision.on(this.onCollision.bind(this));
    }

    onCollision(collision: Collision2D) {

    }

    public addForce(force: Vector3): void {
        this.velocity = this.velocity.add(force.div(this.mass).mul(this.engine.deltaTimePhysics));
    }

    public physicsUpdate(): void {
        super.update();

        // apply linear acceleration, velocity and friction
        this.velocity = this.velocity.add(this.acceleration.mul(this.engine.deltaTimePhysics));
        this.transform.position = this.transform.position.add(this.velocity.mul(this.engine.deltaTimePhysics));

        // apply angular acceleration, velocity and friction
        this.angularVelocity = this.angularVelocity.mul(Quaternion.Lerp(Quaternion.identity, this.angularAcceleration, this.engine.deltaTimePhysics));
        this.transform.rotation = this.transform.rotation.mul(Quaternion.Lerp(Quaternion.identity, this.angularVelocity, this.engine.deltaTimePhysics));
    }

}

export default RigidBody;