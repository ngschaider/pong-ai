import Color from "../../utils/Color";
import MyEvent from "../../utils/MyEvent";
import Vector3 from "../../utils/Vector3";
import AnchorPoint from "../AnchorPoint";
import GameObject from "../core/GameObject";
import Graphics from "../graphics/Graphics";
import Rect from "../Rect";
import Renderer, { RendererSpace } from "../rendering/Renderer";

const DRAW_AABB = false;

abstract class Collider2D extends Renderer {

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

    constructor(gameObject: GameObject) {
        super(gameObject);
        this.doFill = false;
        this.lineWidth = 0.01;
        this.doStroke = true;
        this.strokeColor = Color.lime;
    }

    public render(graphics: Graphics): void {
        super.render(graphics);

        if(!DRAW_AABB) return;

        const bounds = this.getLocalBounds();
        const pos = new Vector3(bounds.topLeft.x, bounds.topLeft.y, 0)
        graphics.rectangle(pos, bounds.size);
    }

}

export default Collider2D;