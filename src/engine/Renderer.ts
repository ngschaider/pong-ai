import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Component from "./Component";

class Renderer extends Component {

    public fillColor: Color = Color.Black;
    public fill: boolean = true;

    public strokeColor: Color = Color.Black;
    public stroke: boolean = true;

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
    }

}

export default Renderer;