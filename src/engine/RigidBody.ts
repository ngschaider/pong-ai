import Vector2 from "../utils/Vector2";

class RigidBody {

    position: Vector2 = Vector2.Zero;
    velocity: Vector2 = Vector2.Zero;
    acceleration: Vector2 = Vector2.Zero

    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

}

export default RigidBody;