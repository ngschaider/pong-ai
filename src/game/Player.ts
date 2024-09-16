import GameObject from "../engine/GameObject";
import RigidBody from "../engine/RigidBody";
import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import RectangleMode from "../graphics/RectangleMode";
import Vector2 from "../utils/Vector2";

class Player extends GameObject {

    rb!: RigidBody;

    size: Vector2 = new Vector2(10, 200);

    onCreate(): void {
        this.name = "Player";

        this.rb = this.addComponent(RigidBody);
    }

    update() {
        super.update();

        this.transform.position = this.transform.position.clampY(-540 - this.size.y/2, 540 + this.size.y/2);
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