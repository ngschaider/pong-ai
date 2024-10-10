import Graphics from "../graphics/Graphics";
import Sprite from "../utils/Sprite";
import Vector2 from "../utils/Vector2";
import AnchorPoint from "./AnchorPoint";
import Rect from "./Rect";
import Renderer from "./Renderer";

class SpriteRenderer extends Renderer {

    sprite?: Sprite;
    anchorPoint: AnchorPoint = AnchorPoint.CenterCenter;

    public render(graphics: Graphics): void {
        if(!this.sprite) return;

        super.render(graphics);

        const rect = new Rect(Vector2.zero, this.anchorPoint, this.sprite.size);

        graphics.image(rect.topLeft, this.sprite);
    }

}

export default SpriteRenderer;