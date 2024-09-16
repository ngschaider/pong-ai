import GameObject from "../engine/GameObject";
import RigidBody from "../engine/RigidBody";
import Circle from "../engine/Circle";

class Ball extends GameObject {

    rb!: RigidBody;

    onCreate(): void {
        this.name = "Ball";
        this.rb = this.addComponent(RigidBody);

        const circle = this.addComponent(Circle);
        circle.diameter = 10;
    }

}

export default Ball;