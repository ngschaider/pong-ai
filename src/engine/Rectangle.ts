import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Component from "./Component";

class Rectangle extends Component {

    size: Vector2 = new Vector2(1, 1);

    draw(g: Graphics): void {
        g.fill(Color.White);
        g.noStroke();
        g.rectangle(Vector2.Zero, this.size);
    }

}

export default Rectangle;