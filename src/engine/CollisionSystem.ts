import { getCombinations } from "../utils/funcs";
import Collider from "./Collider";
import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import RigidBody from "./RigidBody";
import CollisionChecker from "./CollisionChecker";
import Color from "../utils/Color";
import Renderer from "./Renderer";
import Graphics from "../graphics/Graphics";

class CollisionSystem extends Renderer {

    private currentCollisions: Collision[] = [];

    public render(g: Graphics): void {
        g.noFill();
        g.stroke(Color.lime);

        for(const collision of this.currentCollisions) {
            for(const contact of collision.contacts) {
                g.circle(collision.bodyA.transform.position.add(contact), 0.2);
            }
        }
    }

    public physicsUpdate(): void {
        this.detectCollisions();

        for(const collision of this.currentCollisions) {
            this.resolveCollision(collision);
        }
    }

    private detectCollisions() {
        const colliders = this.scene.getAllComponents(Collider);
        const combinations = getCombinations(colliders);

        for(const [bodyA, bodyB] of combinations) {
            if(bodyA === bodyB) continue;

            // find an existing collision and remove it from the list
            // (will be re-added again if we are still colliding)
            const existingCollision = this.currentCollisions.find(c => {
                return (c.bodyA == bodyA && c.bodyB == bodyB) || (c.bodyA == bodyB && c.bodyB == bodyA);
            });
            this.currentCollisions = this.currentCollisions.filter(c => c !== existingCollision);

            const c = CollisionChecker.checkCollision(bodyA, bodyB);

            if(c !== null) {
                if(!existingCollision) {
                    // we werent colliding before
                    bodyA.onCollisionStart.emit(c);
                    bodyB.onCollisionStart.emit(c);
                }

                bodyA.onCollision.emit(c);
                bodyB.onCollision.emit(c);
                this.currentCollisions.push(c);
            } else {
                // we are not colliding
                if(existingCollision) {
                    // but we were before!
                    bodyA.onCollisionEnd.emit(existingCollision);
                    bodyB.onCollisionEnd.emit(existingCollision);
                }
            }
        }
    }

    private resolveCollision(collision: Collision) {
        const rbA = collision.bodyA.gameObject.getComponent(RigidBody);
        const rbB = collision.bodyB.gameObject.getComponent(RigidBody);
        if(!rbA || !rbB) return;

        const relativeVelocity: Vector2 = rbB.velocity.subtract(rbA.velocity);

        if(rbB.velocity.subtract(rbA.velocity).dot(collision.normal) > 0) {
            return;
        }

        const e: number = Math.min(rbA.restitution, rbB.restitution);
        
        const enumerator = -(1 + e) * relativeVelocity.dot(collision.normal);
        const denominator = (1/rbA.mass) + (1/rbB.mass);
        const j = enumerator / denominator;

        if(rbA.mass != Infinity) {
            const factor = rbB.mass === Infinity ? 1 : 2;
            rbA.transform.move(collision.normal.scalarMul(-collision.depth / factor));
            const newV = rbA.velocity.subtract(collision.normal.scalarMul(j/rbA.mass))
            rbA.velocity = newV;
        }

        if(rbB.mass != Infinity) {
            const factor = rbA.mass === Infinity ? 1 : 2;
            rbB.transform.move(collision.normal.scalarMul(collision.depth / factor));
            rbB.velocity = rbB.velocity.add(collision.normal.scalarMul(j/rbB.mass));
        }
    }

}

export default CollisionSystem;