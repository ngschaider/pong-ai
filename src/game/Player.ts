import GameObject from "../engine/GameObject";
import Rectangle from "../engine/Rectangle";
import RigidBody from "../engine/RigidBody";
import Vector2 from "../utils/Vector2";

class Player extends GameObject {

    onCreate(): void {
        this.addComponent(RigidBody);
        this.addComponent(Rectangle);

        this.transform.scale = new Vector2(10, 200);
    }
}

export default Player;