import Vector2 from "../../utils/Vector2";
import GameObject from "../core/GameObject";
import Graphics from "../graphics/Graphics";
import Renderer from "./Renderer";

class LineRenderer extends Renderer {

    constructor(gameObject: GameObject) {
        super(gameObject);
    }


    public render(graphics: Graphics): void {
        super.render(graphics);

        graphics.line(new Vector2(0, -0.5), new Vector2(0, 0.5));
    }


}

export default LineRenderer;