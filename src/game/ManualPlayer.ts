import Keys from "../input/Keys";
import Vector2 from "../utils/Vector2";
import Player from "./Player";

class ManualPlayer extends Player {

    onCreate() {
        super.onCreate();
        
        this.name = "ManualPlayer";
    }

    update() {
        super.update();

        let velocity = 0;
        
        if(Keys.W) {
            velocity -= 2;
        }
        if(Keys.S) {
            velocity += 2;
        }

        this.rb.velocity = new Vector2(0, velocity);
        
        super.update();
    }

}

export default ManualPlayer;