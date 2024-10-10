import Color from "../../utils/Color";
import Component from "../core/Component";
import Graphics from "../graphics/Graphics";

export enum RendererSpace {
    Screen,
    Clip,
    World,
    Local,
}

class Renderer extends Component {

    public fillColor: Color = Color.black;
    public fill: boolean = true;

    public strokeColor: Color = Color.black;
    public stroke: boolean = false;

    public lineWidth: number = 0.1;
    public fontSize: number = 0.03;

    public space: RendererSpace = RendererSpace.Local;

    public render(graphics: Graphics) {
        if(this.fill) {
            graphics.fill(this.fillColor);
        } else {
            graphics.noFill();
        }

        if(this.stroke) {
            graphics.stroke(this.strokeColor);
        } else {
            graphics.noStroke();
        }

        graphics.fontSize(this.fontSize);

        graphics.lineWidth(this.lineWidth);
    }

}

export default Renderer;