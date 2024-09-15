import p5 from "p5";
import Keys from "./Keys";
import Player from "./Player";

class ManualPlayer extends Player {

    update() {
        this.velocity = 0;

        if(Keys.W) {
            this.velocity -= 1 / 40;
        }
        if(Keys.S) {
            this.velocity += 1 / 40;
        }

        super.update();
    }

}

export default ManualPlayer;