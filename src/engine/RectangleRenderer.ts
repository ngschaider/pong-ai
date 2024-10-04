import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Renderer from "./Renderer";

class RectangleRenderer extends Renderer {

    render(graphics: Graphics): void {
        graphics.rectangle(Vector2.Zero, Vector2.One);
    }

}

export default RectangleRenderer;