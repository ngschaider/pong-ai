import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import AnchorPoint from "./AnchorPoint";
import Renderer from "./Renderer";



class RectangleRenderer extends Renderer {

    public anchorPoint: AnchorPoint = AnchorPoint.CenterCenter;

    public render(graphics: Graphics): void {
        super.render(graphics);

        if(this.anchorPoint === AnchorPoint.TopLeft) {
            graphics.rectangle(new Vector2(0, 0), new Vector2(1, 1));
        } else if(this.anchorPoint === AnchorPoint.CenterCenter) {
            graphics.rectangle(new Vector2(-0.5, -0.5), new Vector2(1, 1));
        } else {
            throw new Error("Unimplemented anchor point encountered.")
        }
    }

}

export default RectangleRenderer;