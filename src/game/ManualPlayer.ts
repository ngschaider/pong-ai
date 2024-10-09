import Keyboard from "../engine/Keyboard";
import Scene from "../engine/Scene";
import Vector2 from "../utils/Vector2";
import Player from "./Player";

class ManualPlayer extends Player {

    keyboard: Keyboard|null = null;

    constructor(scene: Scene) {
        super(scene);

        this.keyboard = this.scene.getComponent(Keyboard);

        this.transform.position = new Vector2(-9, 0);
    }

    update(): void {
        super.update();

        if(!this.keyboard) return;
        
        let value = 0;
        if(this.keyboard.w) value -= 1;
        if(this.keyboard.s) value += 1;

        this.rigidBody.velocity = new Vector2(0, value).scalarMul(0.4);
    }

}

export default ManualPlayer;