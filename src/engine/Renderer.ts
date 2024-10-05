import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Component from "./Component";

class Renderer extends Component {

    public fillColor: Color = Color.black;
    public fill: boolean = true;

    public strokeColor: Color = Color.black;
    public stroke: boolean = false;

    public lineWidth: number = 0.1;

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

        graphics.lineWidth(this.lineWidth);
    }

}

export default Renderer;