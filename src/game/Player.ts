import GameObject from "../engine/GameObject";
import RigidBody from "../engine/RigidBody";
import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import RectangleMode from "../graphics/RectangleMode";
import Vector2 from "../utils/Vector2";

class Player extends GameObject {

    rb: RigidBody;

    size: Vector2 = new Vector2(10, 200);

    constructor(xPosition: number) {
        super();

        this.name = "Player";

        this.rb = this.addComponent(RigidBody);
        this.tf.position.x = xPosition;
    }

    update() {
        this.tf.position = this.tf.position.clampY(-1, 1);
    }

    draw(g: Graphics) {
        super.draw(g);

        g.fill(Color.White);
        g.noStroke();
        g.rectangleMode(RectangleMode.CENTER);
        g.rectangle(Vector2.Zero, this.size);
    }

}

export default Player;