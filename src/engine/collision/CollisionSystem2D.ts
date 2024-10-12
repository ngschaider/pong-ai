import Collider2D from "./Collider2D";
import Collision2D from "./Collision2D";
import CollisionChecker2D from "./CollisionChecker2D";
import Graphics from "../graphics/Graphics";
import Color from "../../utils/Color";
import { getCombinations } from "../../utils/funcs";
import Vector2 from "../../utils/Vector2";
import Renderer, { RendererSpace } from "../rendering/Renderer";
import RigidBody from "../RigidBody";
import GameObject from "../core/GameObject";
import Vector3 from "../../utils/Vector3";

class CollisionSystem2D extends Renderer {

    private currentCollisions: Collision2D[] = [];

    constructor(gameObject: GameObject) {
        super(gameObject);

        this.doFill = false;
        this.strokeColor = Color.lime;
        this.doStroke = true;
    }

    public render(g: Graphics): void {
        super.render(g);

        for(const collision of this.currentCollisions) {
            for(const contact of collision.contacts) {
                g.circle(new Vector3(contact.x, contact.y, 0), 0.2);
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
        const colliders = this.scene.getAllComponents(Collider2D);
        const combinations = getCombinations(colliders);

        for(const [bodyA, bodyB] of combinations) {
            if(bodyA === bodyB) continue;

            // find an existing collision and remove it from the list
            // (will be re-added again if we are still colliding)
            const existingCollision = this.currentCollisions.find(c => {
                return (c.bodyA == bodyA && c.bodyB == bodyB) || (c.bodyA == bodyB && c.bodyB == bodyA);
            });
            this.currentCollisions = this.currentCollisions.filter(c => c !== existingCollision);

            const c = CollisionChecker2D.checkCollision(bodyA, bodyB);

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

    private resolveCollision(collision: Collision2D) {
        const rbA = collision.bodyA.gameObject.getComponent(RigidBody);
        const rbB = collision.bodyB.gameObject.getComponent(RigidBody);
        if(!rbA || !rbB) return;

        const relativeVelocity: Vector2 = rbB.velocity.sub(rbA.velocity).xy;

        if(relativeVelocity.dot(collision.normal) > 0) {
            return;
        }

        const e: number = Math.min(rbA.restitution, rbB.restitution);
        
        const enumerator = -(1 + e) * relativeVelocity.dot(collision.normal);
        const denominator = (1/rbA.mass) + (1/rbB.mass);
        const j = enumerator / denominator;

        if(rbA.mass != Infinity) {
            const factor = rbB.mass === Infinity ? 1 : 2;
            rbA.transform.move(collision.normal.mul(-collision.depth / factor).toVector3());
            const newV = rbA.velocity.sub(collision.normal.mul(j/rbA.mass))
            rbA.velocity = newV;
        }

        if(rbB.mass != Infinity) {
            const factor = rbA.mass === Infinity ? 1 : 2;
            rbB.transform.move(collision.normal.mul(collision.depth / factor).toVector3());
            rbB.velocity = rbB.velocity.add(collision.normal.mul(j/rbB.mass).toVector3());
        }
    }

}

export default CollisionSystem2D;