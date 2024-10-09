import Graphics from "../graphics/Graphics";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import Component from "./Component";
import Engine from "./Engine";
import GameObject from "./GameObject";
import RenderSystem from "./RenderSystem";

class Debug {

    private engine: Engine;

    private get g(): Graphics {
        return this.engine.scene.getComponent(RenderSystem)!.graphics;
    }

    constructor(engine: Engine) {
        this.engine = engine;
    }

    public axis(v: Vector2) {
        const camera = this.engine.scene.getActiveCamera();
        if(!camera) return;

        const matrix = camera.getWorldToClipMatrix()

        const start = Vector2.zero.applyMatrix(matrix);
        const end = v.applyMatrix(matrix);

        this.g.fill(Color.green);
        this.g.stroke(Color.green);
        this.g.line(start, end);
    }

    
    public circle(position: Vector2, radius: number) {
        const camera = this.engine.scene.getActiveCamera();
        if(!camera) return;

        const matrix = camera.getWorldToClipMatrix()

        this.g.noFill();
        this.g.stroke(Color.green);
        this.g.circle(position.applyMatrix(matrix), radius * matrix.getValue(0, 0));
    }

}

export default Debug;