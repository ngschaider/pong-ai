import Graphics from "../graphics/Graphics";
import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Rect from "../Rect";
import Renderer from "./Renderer";

class RectangleRenderer extends Renderer {

    public anchorPoint: AnchorPoint = AnchorPoint.CenterCenter;

    public render(graphics: Graphics): void {
        super.render(graphics);

        const rect = new Rect(Vector2.zero, this.anchorPoint, Vector2.one);

        graphics.rectangle(rect.topLeft, rect.size);
    }

}

export default RectangleRenderer;