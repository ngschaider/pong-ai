import BoxCollider from "../engine/BoxCollider";
import GameObject from "../engine/GameObject";
import RectangleRenderer from "../engine/RectangleRenderer";
import RigidBody from "../engine/RigidBody";
import Scene from "../engine/Scene";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";

class Player extends GameObject {

    rigidBody: RigidBody;
    renderer: RectangleRenderer;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.rigidBody.mass = Infinity;

        this.renderer = this.addComponent(RectangleRenderer);
        this.renderer.fillColor = Color.white;
        this.transform.scale = new Vector2(0.6, 4);

        const collider = this.addComponent(BoxCollider);
    }

}

export default Player;