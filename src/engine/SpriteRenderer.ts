import Graphics from "../graphics/Graphics";
import Sprite from "../utils/Sprite";
import Renderer from "./Renderer";

class SpriteRenderer extends Renderer {

    sprite?: Sprite;

    public render(graphics: Graphics): void {
        if(!this.sprite) return;

        super.render(graphics);
        graphics.image(this.sprite);
    }

}

export default SpriteRenderer;