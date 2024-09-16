import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Component from "./Component";

class Transform extends Component {

    parent?: Transform;

    position: Vector2 = Vector2.Zero;
    rotation: number = 0;

    beforeDraw(g: Graphics) {
        g.save();
        g.translate(this.position);
        g.rotate(this.rotation);
    }

    update() {
        
    }

    afterDraw(g: Graphics) {
        g.restore();
    }

}

export default Transform;