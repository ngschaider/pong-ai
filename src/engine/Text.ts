import Graphics from "../graphics/Graphics";
import Component from "./Component";

class Text extends Component {

    public text: string = "";

    draw(g: Graphics): void {
        g.text(this.gameObject.transform.position, this.text);
    }

}

export default Text;