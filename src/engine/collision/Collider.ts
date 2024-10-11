import Color from "../../utils/Color";
import MyEvent from "../../utils/MyEvent";
import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Graphics from "../graphics/Graphics";
import Rect from "../Rect";
import Renderer, { RendererSpace } from "../rendering/Renderer";

const DRAW_AABB = false;

abstract class Collider extends Renderer {

    onCollision: MyEvent = new MyEvent();
    onCollisionStart: MyEvent = new MyEvent();
    onCollisionEnd: MyEvent = new MyEvent();

    /**
     * @returns local space bounds
     */
    abstract getLocalBounds(): Rect;

    /**
     * @returns world space bounds
     */
    getBounds(): Rect {
        const local = this.getLocalBounds();
        
        const min = local.topLeft.applyMatrix(this.transform.getLocalToWorldMatrix());
        const max = local.bottomRight.applyMatrix(this.transform.getLocalToWorldMatrix());

        return new Rect(min, AnchorPoint.TopLeft, max.sub(min));
    }

    public render(graphics: Graphics): void {
        super.render(graphics);

        if(!DRAW_AABB) return;

        const aabb = this.getLocalBounds();

        this.doFill = false;
        this.lineWidth = 0.01;
        this.doStroke = true;
        this.strokeColor = Color.lime;

        graphics.rectangle(aabb.topLeft, aabb.size);
    }

}

export default Collider;