import Color from "../utils/Color";
import Graphics from "../graphics/Graphics";
import MyEvent from "../utils/MyEvent";
import Component from "./Component";
import Rect from "./Rect";
import Renderer, { RendererSpace } from "./Renderer";
import AnchorPoint from "./AnchorPoint";

const DRAW_AABB = false;

abstract class Collider extends Renderer {

    onCollision: MyEvent = new MyEvent();
    onCollisionStart: MyEvent = new MyEvent();
    onCollisionEnd: MyEvent = new MyEvent();

    abstract getLocalAABB(): Rect;

    getWorldAABB(): Rect {
        const local = this.getLocalAABB();
        
        const min = local.topLeft.applyMatrix(this.transform.getLocalToWorldMatrix());
        const max = local.bottomRight.applyMatrix(this.transform.getLocalToWorldMatrix());

        return new Rect(min, AnchorPoint.TopLeft, max.subtract(min));
    }

    public render(graphics: Graphics): void {
        super.render(graphics);

        if(!DRAW_AABB) return;

        const aabb = this.getLocalAABB();

        this.fill = false;
        this.lineWidth = 0.01;
        this.stroke = true;
        this.strokeColor = Color.lime;

        graphics.rectangle(aabb.topLeft, aabb.size);
    }

}

export default Collider;