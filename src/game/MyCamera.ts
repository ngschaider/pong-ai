import Camera from "../engine/Camera";
import GameObject from "../engine/GameObject";
import Scene from "../engine/Scene";
import Vector3 from "../utils/Vector3";

class MyCamera extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector3(0, 0, 1);

        this.addComponent(Camera);
    }
    
}

export default MyCamera;