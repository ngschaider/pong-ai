import Component from "../engine/Component";
import RigidBody from "../engine/RigidBody";
import Keys from "../input/Keys";
import Vector2 from "../utils/Vector2";

class ManualPlayer extends Component {

    rb!: RigidBody;

    onCreate(): void {
        this.rb = this.gameObject.getComponent(RigidBody)!;
    }

    update() {
        let velocity = 0;
        
        if(Keys.W) {
            velocity -= 2;
        }
        if(Keys.S) {
            velocity += 2;
        }

        this.rb.velocity = new Vector2(0, velocity);
    }

}

export default ManualPlayer;