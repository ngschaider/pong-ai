import RigidBody from "../engine/RigidBody";
import CircleCollider from "../engine/collision/CircleCollider";
import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import CircleRenderer from "../engine/rendering/CircleRenderer";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";

class Ball extends GameObject {

    rigidbody: RigidBody;
    collider: CircleCollider;

    constructor(scene: Scene) {
        super(scene);

        this.transform.scale = new Vector2(1, 1);
        this.transform.position = new Vector2(-6, -8);

        this.rigidbody = this.addComponent(RigidBody);
        this.rigidbody.velocity = new Vector2(0, 0);

        const r = this.addComponent(CircleRenderer);
        r.fillColor = Color.white;

        this.collider = this.addComponent(CircleCollider);
        this.collider.onCollisionStart.on(this.onCollisionStart.bind(this));
        this.collider.onCollision.on(this.onCollision.bind(this));
    }

    onCollisionStart() {
        // console.log("COLLISION START !");
    }

    onCollision() {
        // console.log("COLLLLISSSSSIONN!");
    }

}

export default Ball;