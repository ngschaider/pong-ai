import { collideCircleCircle } from "../utils/collision";
import Circle from "./Circle";
import Collider from "./Collider";

class CircleCollider extends Collider {

    public diameter: number = 1;

    update(): void {
        this.checkCircle();
    }

    checkCircle(): void {
        const objs = this.gameObject.engine.gameObjects.filter(go => go.getComponent(CircleCollider) !== undefined);

        for(const obj of objs) {
            const collider = obj.getComponent(CircleCollider)!;
            const colliding = collideCircleCircle(this.gameObject.transform.position, this.diameter, obj.transform.position, collider.diameter);
            if(colliding) {
                this.colliding(collider);
            } else {
                this.notColliding(collider);
            }
        }
    }

}