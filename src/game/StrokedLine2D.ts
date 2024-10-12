import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import LineRenderer from "../engine/rendering/LineRenderer";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";


class Line2D extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(LineRenderer);
        r.doStroke = true;
        r.strokeColor = Color.white;
    }
}

class StrokedLine2D extends GameObject {

    public numSegments: number = 20;
    public space: number = 1;

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector3(0, -10, 0);

        for(let i = 0; i < this.numSegments; i++) {
            const line = this.addChild(Line2D);
            line.transform.position = new Vector3(0, (this.space + 1) * i, 0);
        }
    }

}

export default StrokedLine2D;