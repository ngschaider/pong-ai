import CircleRenderer from "../engine/CircleRenderer";
import GameObject from "../engine/GameObject";
import RectangleRenderer from "../engine/RectangleRenderer";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";

class Origin extends GameObject {
    constructor(scene: Scene) {
        super(scene);

        const c = this.addComponent(CircleRenderer);
        c.fillColor = Color.blue;


        this.transform.scale = new Vector2(0.5, 0.5);
    }
}

export default Origin;