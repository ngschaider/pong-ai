import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Component from "./Component";

class Circle extends Component {

    public diameter: number = 20; 

    draw(g: Graphics): void {
        g.fill(Color.White);
        g.noStroke();
        g.circle(Vector2.Zero, this.diameter);
    }

}

export default Circle;