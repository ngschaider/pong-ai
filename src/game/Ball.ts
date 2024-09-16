import Vector2 from "../utils/Vector2";
import GameObject from "../engine/GameObject";
import Graphics from "../graphics/Graphics";
import Color from "../graphics/Color";
import RigidBody from "../engine/RigidBody";

class Ball extends GameObject {

    rb!: RigidBody;

    onCreate(): void {
        this.name = "Ball";
        this.rb = this.addComponent(RigidBody);
    }

    update() {
        super.update();
    }

    draw(g: Graphics) {
        super.draw(g);
        
        g.fill(Color.White);
        g.noStroke();
        g.circle(Vector2.Zero, 10);
    }

}

export default Ball;