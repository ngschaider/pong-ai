import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import CircleRenderer from "../engine/rendering/CircleRenderer";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";

class Origin extends GameObject {
    constructor(scene: Scene) {
        super(scene);

        const c = this.addComponent(CircleRenderer);
        c.fillColor = Color.blue;


        this.transform.scale = new Vector3(0.5, 0.5, 1);
    }
}

export default Origin;