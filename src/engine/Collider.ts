import Color from "../utils/Color";
import Graphics from "../graphics/Graphics";
import MyEvent from "../utils/MyEvent";
import Component from "./Component";
import Rect from "./Rect";
import Renderer, { RendererSpace } from "./Renderer";

abstract class Collider extends Renderer {

    onCollision: MyEvent = new MyEvent();
    onCollisionStart: MyEvent = new MyEvent();
    onCollisionEnd: MyEvent = new MyEvent();

    abstract getLocalAABB(): Rect;

    public render(graphics: Graphics): void {
        super.render(graphics);

        const aabb = this.getLocalAABB();

        this.fill = false;
        this.lineWidth = 0.01;
        this.stroke = true;
        this.strokeColor = Color.lime;

        graphics.rectangle(aabb.topLeft, aabb.size);
    }

}

export default Collider;