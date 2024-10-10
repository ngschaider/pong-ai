import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import LineRenderer from "../engine/rendering/LineRenderer";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";


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

        this.transform.position = new Vector2(0, -10);

        for(let i = 0; i < this.numSegments; i++) {
            const line = this.addChild(Line);
            line.transform.position = new Vector2(0, (this.space + 1) * i);
        }
    }

}

export default StrokedLine;