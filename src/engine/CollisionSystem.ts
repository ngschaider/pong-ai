import { collideRectCircle } from "../utils/collision";
import { getCombinations } from "../utils/funcs";
import CircleCollider from "./CircleCollider";
import Collider from "./Collider";
import Component, { ComponentConstructor } from "./Component";
import GameObject from "./GameObject";
import Rect from "./Rect";
import RectangleCollider from "./RectangleCollider";

class CollisionSystem extends Component {

    private currentCollisions: [Collider, Collider][] = [];
    
    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public update(): void {
        const colliders = this.scene.getAllComponents(Collider);
        const combinations = getCombinations(colliders);

        for(const combination of combinations) {
            const a = combination[0];
            const b = combination[1];

            if(a === b) continue;

            const collision = this.currentCollisions.find(collision => {
                return (collision[0] === a && collision[1] === b) || (collision[0] === b && collision[1] === a)
            });

            if(this.areColliding(a, b)) {
                if(!collision) {
                    a.onCollisionStart.emit();
                    b.onCollisionStart.emit();
                    this.currentCollisions.push([a, b]);
                }
    
                a.onCollision.emit();
                b.onCollision.emit();
            } else {
                if(collision) {
                    a.onCollisionEnd.emit();
                    b.onCollisionEnd.emit();
                    this.currentCollisions = this.currentCollisions.filter(c => c === collision);
                }
            }
        }
    }

    private areColliding(a: Collider, b: Collider): boolean {
        
        a.getPolygon()

        throw new Error("Could not find suitable collision algorithm for colliders " + a.constructor.name + " and " + b.constructor.name + ".");
    }

}

export default CollisionSystem;