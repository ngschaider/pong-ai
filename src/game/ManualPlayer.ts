import Keys from "../input/Keys";
import Vector2 from "../utils/Vector2";
import Player from "./Player";

class ManualPlayer extends Player {

    constructor(xPosition: number) {
        super(xPosition);
        this.name = "ManualPlayer";
    }

    update() {
        this.rb.velocity.y = 0;

        if(Keys.W) {
            this.rb.velocity.y -= 1 / 40;
        }
        if(Keys.S) {
            this.rb.velocity.y += 1 / 40;
        }

        super.update();
    }

}

export default ManualPlayer;