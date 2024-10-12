import RigidBody from "../engine/RigidBody";
import RectangleCollider2D from "../engine/collision/RectangleCollider2D";
import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import RectangleRenderer from "../engine/rendering/RectangleRenderer";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";

class Player extends GameObject {

    rigidBody: RigidBody;
    renderer: RectangleRenderer;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.rigidBody.mass = Infinity;

        this.renderer = this.addComponent(RectangleRenderer);
        this.renderer.fillColor = Color.white;
        this.transform.scale = new Vector3(0.6, 4, 1);

        const collider = this.addComponent(RectangleCollider2D);
    }

}

export default Player;