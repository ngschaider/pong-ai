import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Renderer from "./Renderer";

class CircleRenderer extends Renderer {

    public render(graphics: Graphics): void {
        super.render(graphics);

        graphics.circle(Vector2.zero, 1);
    }

}

export default CircleRenderer;