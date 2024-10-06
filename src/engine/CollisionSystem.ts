import { getCombinations } from "../utils/funcs";
import Collider from "./Collider";
import Component from "./Component";
import CollisionChecker from "../utils/CollisionChecker";
import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import RigidBody from "./RigidBody";

class CollisionSystem extends Component {

    private currentCollisions: Collision[] = [];

    public update(): void {
        const colliders = this.scene.getAllComponents(Collider);
        const combinations = getCombinations(colliders);

        for(const [bodyA, bodyB] of combinations) {
            if(bodyA === bodyB) continue;

            // find an existing collision and remove it from the list
            // (will be added again when we are still colliding)
            const existingCollision = this.currentCollisions.find(c => {
                return (c.bodyA == bodyA && c.bodyB == bodyB) || (c.bodyA == bodyB && c.bodyB == bodyA);
            });
            this.currentCollisions = this.currentCollisions.filter(c => c !== existingCollision);

            const c = CollisionChecker.checkCollision(bodyA, bodyB);

            if(c !== null) {
                // we are still colliding
                this.resolveCollision(c)

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

        const e: number = Math.min(rbA.restitution, rbB.restitution);
        const relativeVelocity: Vector2 = rbB.velocity.subtract(rbA.velocity);

        const enumerator = -(1 + e) * relativeVelocity.dot(collision.normal);
        const denominator = (1/rbA.mass) + (1/rbB.mass);
        const j = enumerator / denominator;

        console.log(rbA.mass + rbB.mass);

        if(rbA.mass != Infinity) {
            rbA.transform.move(collision.normal.scalarMul(-collision.depth/2 * rbA.mass / (rbA.mass + rbB.mass)));
            rbA.velocity = rbA.velocity.subtract(collision.normal.scalarMul(j/rbA.mass));
        }

        if(rbB.mass != Infinity) {
            rbB.transform.move(collision.normal.scalarMul(collision.depth/2 * rbB.mass / (rbA.mass + rbB.mass)));
            rbB.velocity = rbB.velocity.add(collision.normal.scalarMul(j/rbB.mass));
        }
    }

}

export default CollisionSystem;