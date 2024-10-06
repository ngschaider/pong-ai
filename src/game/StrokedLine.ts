import GameObject from "../engine/GameObject";
import LineRenderer from "../engine/LineRenderer";
import Renderer from "../engine/Renderer";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";


class Line extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(LineRenderer);
        r.stroke = true;
        r.strokeColor = Color.white;
    }
}

class StrokedLine extends GameObject {

    public numSegments: number = 20;
    public space: number = 1;

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector3(0, -10, 0);

        for(let i = 0; i < this.numSegments; i++) {
            const line = this.addGameObject(Line);
            line.transform.position = new Vector3(0, (this.space + 1) * i, 0);
        }
    }

}

export default StrokedLine;