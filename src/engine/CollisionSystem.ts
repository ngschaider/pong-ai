import { getCombinations } from "../utils/funcs";
import Collider from "./Collider";
import Component from "./Component";
import CollisionChecker from "../utils/CollisionChecker";
import Collision from "../utils/Collision";

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

}

export default CollisionSystem;