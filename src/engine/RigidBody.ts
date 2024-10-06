import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Collider from "./Collider";
import Component from "./Component";
import GameObject from "./GameObject";

class RigidBody extends Component {

    velocity: Vector2 = Vector2.zero;
    acceleration: Vector2 = Vector2.zero

    angularVelocity: number = 0;
    angularAcceleration: number = 0;

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
        if(collision.bodyA.gameObject === this.gameObject) {
            this.transform.move(collision.normal.scalarMul(-collision.depth));
        } else if(collision.bodyB.gameObject === this.gameObject) {
            this.transform.move(collision.normal.scalarMul(collision.depth));
        } else {
            throw new Error();
        }
    }


    public fixedUpdate(): void {
        super.fixedUpdate();

        this.velocity = this.velocity.add(this.acceleration);
        this.transform.position = this.transform.position.add(this.velocity);

        this.angularVelocity += this.angularAcceleration;
        this.transform.rotation += this.angularVelocity;
    }

}

export default RigidBody;