import { collideCircleCircle, collideCirclePoly, collidePolyPoly, collideRectCircle } from "../utils/collision";
import { getCombinations } from "../utils/funcs";
import CircleCollider from "./CircleCollider";
import Collider from "./Collider";
import Component, { ComponentConstructor } from "./Component";
import GameObject from "./GameObject";
import BoxCollider from "./BoxCollider";
import PolygonCollider from "./PolygonCollider";

class CollisionSystem extends Component {

    private currentCollisions: [Collider, Collider][] = [];
    
    public readonly algorithms: Map<[ComponentConstructor<Collider>, ComponentConstructor<Collider>], (a: Collider, b: Collider) => boolean> = new Map();

    constructor(gameObject: GameObject) {
        super(gameObject);


        this.algorithms.set([CircleCollider, CircleCollider], (a: Collider, b: Collider) => {
            const circle1 = a as CircleCollider;
            const circle2 = b as CircleCollider;

            return collideCircleCircle(circle1.position.xy, circle1.diameter, circle2.position.xy, circle2.diameter);
        });

        this.algorithms.set([CircleCollider, BoxCollider], (a: Collider, b: Collider) => {
            const circle = a as CircleCollider;
            const box = b as BoxCollider;

            return collideCirclePoly(circle.position.xy, circle.diameter, box.getWorldPolygon());
        });

        this.algorithms.set([CircleCollider, PolygonCollider], (a: Collider, b: Collider) => {
            const circle = a as CircleCollider;
            const poly = b as PolygonCollider;

            return collideCirclePoly(circle.position.xy, circle.diameter, poly.getWorldPolygon());
        });

        this.algorithms.set([BoxCollider, BoxCollider], (a: Collider, b: Collider) => {
            const box1 = a as BoxCollider;
            const box2 = b as BoxCollider;
            
            return collidePolyPoly(box1.getWorldPolygon(), box2.getWorldPolygon());
        });

        this.algorithms.set([BoxCollider, PolygonCollider], (a: Collider, b: Collider) => {
            const box = a as BoxCollider;
            const poly = b as PolygonCollider;
            
            return collidePolyPoly(box.getWorldPolygon(), poly.getWorldPolygon());
        });
        
        this.algorithms.set([PolygonCollider, PolygonCollider], (a: Collider, b: Collider) => {
            const poly1 = a as PolygonCollider;
            const poly2 = b as PolygonCollider;
            
            return collidePolyPoly(poly1.getWorldPolygon(), poly2.getWorldPolygon());
        });
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
                    a.onCollisionStart.emit(b);
                    b.onCollisionStart.emit(a);
                    this.currentCollisions.push([a, b]);
                }
    
                a.onCollision.emit(b);
                b.onCollision.emit(a);
            } else {
                if(collision) {
                    a.onCollisionEnd.emit(b);
                    b.onCollisionEnd.emit(a);
                    this.currentCollisions = this.currentCollisions.filter(c => c !== collision);
                }
            }
        }
    }

    private areColliding(a: Collider, b: Collider): boolean {
        for(const [comb, func] of this.algorithms) {;

            if(a instanceof comb[0] && b instanceof comb[1]) {
                return func(a, b);
            }
            if(a instanceof comb[1] && b instanceof comb[0]) {
                return func(b, a);
            }
        }

        throw new Error("Could not find suitable collision algorithm for colliders " + a.constructor.name + " and " + b.constructor.name + ".");
    }

}

export default CollisionSystem;