import Graphics from "../graphics/Graphics";
import Color from "../utils/Color";
import Vector2 from "../utils/Vector2";
import GameObject from "./GameObject";
import Renderer, { RendererSpace } from "./Renderer";

class TextRenderer extends Renderer {

    // public anchorPoint: AnchorPoint = AnchorPoint.TopLeft;
    public text: string = "";
    public offset: Vector2 = Vector2.zero;

    constructor(gameObject: GameObject) {
        super(gameObject);

        this.fillColor = Color.white;
        this.strokeColor = Color.white;
        this.space = RendererSpace.Clip;
    }

    public render(graphics: Graphics): void {
        graphics.text(this.offset, this.text);
    }

}

export default TextRenderer;