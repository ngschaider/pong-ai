import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";
import Engine from "./Engine";
import RenderSystem from "./RenderSystem";

class Debug {

    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    axis(v: Vector2) {
        const camera = this.engine.scene.getActiveCamera();
        if(!camera) return;

        const graphics = this.engine.scene.getComponent(RenderSystem)?.graphics;
        if(!graphics) return;

        const matrix = camera.getWorldToClipMatrix()

        const start = Vector2.zero.applyMatrix(matrix);
        const end = v.applyMatrix(matrix);

        graphics.fill(Color.green);
        graphics.stroke(Color.green);
        graphics.line(start, end);
    }
        

}

export default Debug;