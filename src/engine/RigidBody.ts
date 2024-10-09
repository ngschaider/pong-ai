import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Collider from "./Collider";
import Component from "./Component";
import GameObject from "./GameObject";

class RigidBody extends Component {

    velocity: Vector2 = Vector2.zero;
    acceleration: Vector2 = Vector2.zero;

    angularVelocity: number = 0;
    angularAcceleration: number = 0;
    angularFriction: number = 1;
    mass: number = 1;
    restitution = 0.6;


    constructor(gameObject: GameObject) {
        super(gameObject);

        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        const collider = this.gameObject.getComponent(Collider);
        if(!collider) return;

        collider.onCollision.on(this.onCollision.bind(this));
    }

    onCollision(collision: Collision) {

    }

    public addForce(force: Vector2): void {
        this.velocity = this.velocity.add(force.scalarDiv(this.mass).scalarMul(this.engine.deltaTimePhysics));
    }

    public physicsUpdate(): void {
        super.update();

        // apply linear acceleration, velocity and friction
        this.velocity = this.velocity.add(this.acceleration.scalarMul(this.engine.deltaTimePhysics));
        this.transform.position = this.transform.position.add(this.velocity.scalarMul(this.engine.deltaTimePhysics));

        // apply angular acceleration, velocity and friction
        this.angularVelocity += this.angularAcceleration * this.engine.deltaTimePhysics;
        this.transform.rotation += this.angularVelocity * this.engine.deltaTimePhysics;
        this.angularVelocity *= this.angularFriction;
    }

}

export default RigidBody;