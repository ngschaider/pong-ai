import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Engine from "./core/Engine";
import Graphics from "./graphics/Graphics";
import RenderSystem from "./rendering/RenderSystem";

class Debug {

    private engine: Engine;

    private get g(): Graphics {
        return this.engine.scene.getComponent(RenderSystem)!.graphics;
    }

    constructor(engine: Engine) {
        this.engine = engine;
    }

    public axis(v: Vector3) {
        const camera = this.engine.scene.getActiveCamera();
        if(!camera) return;

        const matrix = camera.getWorldToCameraMatrix()

        const start = Vector3.zero.applyMatrix(matrix);
        const end = v.applyMatrix(matrix);

        this.g.fill(Color.green);
        this.g.stroke(Color.green);
        this.g.line(start, end);
    }

    
    public circle(position: Vector3, radius: number) {
        const camera = this.engine.scene.getActiveCamera();
        if(!camera) return;

        const matrix = camera.getWorldToCameraMatrix()

        this.g.noFill();
        this.g.stroke(Color.green);
        this.g.circle(position.applyMatrix(matrix), radius * matrix.getValue(0, 0));
    }

}

export default Debug;