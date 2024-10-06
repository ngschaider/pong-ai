import Camera from "../engine/Camera";
import GameObject from "../engine/GameObject";
import Scene from "../engine/Scene";
import Vector2 from "../utils/Vector2";

class MyCamera extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector2(0, 0);
        this.transform.renderOrder = 1;

        this.addComponent(Camera);
    }
    
}

export default MyCamera;