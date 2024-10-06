import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Collider from "./Collider";
import Component from "./Component";
import GameObject from "./GameObject";

class RigidBody extends Component {

    velocity: Vector2 = Vector2.zero;
    acceleration: Vector2 = Vector2.zero;
    friction: number = 1;

    angularVelocity: number = 0;
    angularAcceleration: number = 0;
    angularFriction: number = 0.9;
    mass: number = 1;
    restitution = 1;


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
        const rbA = collision.bodyA.gameObject.getComponent(RigidBody);
        const rbB = collision.bodyB.gameObject.getComponent(RigidBody);
        if(!rbA || !rbB) return;

        const e: number = Math.min(rbA.restitution, rbB.restitution);
        const vAB: Vector2 = rbB.velocity.subtract(rbA.velocity);

        const enumerator = -(1 + e) * vAB.dot(collision.normal);
        const denominator = (1/rbA.mass) + (1/rbB.mass);
        const j = enumerator / denominator;

        const deltaV = collision.normal.scalarMul(j/this.mass);

        if(collision.bodyA.gameObject === this.gameObject) {
            this.transform.move(collision.normal.scalarMul(-collision.depth));
            this.velocity = this.velocity.subtract(deltaV);
        } else if(collision.bodyB.gameObject === this.gameObject) {
            this.transform.move(collision.normal.scalarMul(collision.depth));
            this.velocity = this.velocity.add(deltaV);
        } else {
            throw new Error();
        }
    }

    public addForce(force: Vector2): void {
        this.velocity = this.velocity.add(force.scalarDiv(this.mass).scalarMul(this.engine.fixedUpdateInterval));
    }

    public fixedUpdate(): void {
        super.fixedUpdate();

        // apply linear acceleration, velocity and friction
        this.velocity = this.velocity.add(this.acceleration);
        this.transform.position = this.transform.position.add(this.velocity);
        this.velocity = this.velocity.scalarMul(this.friction);

        // apply angular acceleration, velocity and friction
        this.angularVelocity += this.angularAcceleration * this.engine.fixedUpdateInterval;
        this.transform.rotation += this.angularVelocity * this.engine.fixedUpdateInterval;
        this.angularVelocity *= this.angularFriction;

        
    }

}

export default RigidBody;