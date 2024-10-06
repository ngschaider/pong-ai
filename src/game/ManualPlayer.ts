import InputSystem from "../engine/InputSystem";
import Scene from "../engine/Scene";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Player from "./Player";

class ManualPlayer extends Player {

    inputSystem: InputSystem|null = null;

    constructor(scene: Scene) {
        super(scene);

        this.inputSystem = this.scene.getComponent(InputSystem);

        this.transform.position = new Vector2(-9, 0);
    }

    update(): void {
        super.update();

        if(!this.inputSystem) return;
        
        let value = 0;
        if(this.inputSystem.keys.W) value += 1;
        if(this.inputSystem.keys.S) value -= 1;

        this.rigidBody.velocity = new Vector2(0, value);
    }

}

export default ManualPlayer;