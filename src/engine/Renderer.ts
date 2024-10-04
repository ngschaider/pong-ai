import Graphics from "../graphics/Graphics";
import Component from "./Component";

abstract class Renderer extends Component {

    abstract render(graphics: Graphics): void;

}

export default Renderer;