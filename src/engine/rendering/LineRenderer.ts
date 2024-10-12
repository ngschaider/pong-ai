import Vector2 from "../../utils/Vector2";
import Vector3 from "../../utils/Vector3";
import GameObject from "../core/GameObject";
import Graphics from "../graphics/Graphics";
import Renderer from "./Renderer";

class LineRenderer extends Renderer {

    constructor(gameObject: GameObject) {
        super(gameObject);
    }


    public render(graphics: Graphics): void {
        super.render(graphics);

        graphics.line(new Vector3(0, -0.5, 0), new Vector3(0, 0.5, 0));
    }


}

export default LineRenderer;