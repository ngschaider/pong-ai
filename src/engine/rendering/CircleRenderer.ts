import Graphics from "../graphics/Graphics";
import Vector2 from "../../utils/Vector2";
import Renderer from "./Renderer";
import Vector3 from "../../utils/Vector3";

class CircleRenderer extends Renderer {

    public render(graphics: Graphics): void {
        super.render(graphics);

        graphics.circle(Vector3.zero, 1);
    }

}

export default CircleRenderer;