import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Rect from "./Rect";
import Renderer from "./Renderer";

class RectangleRenderer extends Renderer {

    public readonly rect: Rect = new Rect(Vector2.zero, Vector2.one);

    public render(graphics: Graphics): void {
        super.render(graphics);

        graphics.rectangle(this.rect.bottomLeft, this.rect.size);
    }

}

export default RectangleRenderer;