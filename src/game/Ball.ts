import CircleCollider from "../engine/CircleCollider";
import CircleRenderer from "../engine/CircleRenderer";
import GameObject from "../engine/GameObject";
import RigidBody from "../engine/RigidBody";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";

class Ball extends GameObject {

    rigidbody: RigidBody;
    collider: CircleCollider;

    constructor(scene: Scene) {
        super(scene);

        this.transform.scale = new Vector2(1, 1);
        this.transform.position = new Vector3(-6, -8, 0);

        this.rigidbody = this.addComponent(RigidBody);
        this.rigidbody.velocity = new Vector3(0, 0, 0);

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