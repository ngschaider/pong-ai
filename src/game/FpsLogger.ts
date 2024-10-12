import Collider2D from "../engine/collision/Collider2D";
import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import TextRenderer from "../engine/rendering/TextRenderer";
import Vector2 from "../utils/Vector2";

class FpsLogger extends GameObject {

    private lastUpdate: number = 0;

    private lastPhysicsUpdate: number = 0;

    private updateRate: TextRenderer;
    private updatePhysicsRate: TextRenderer;
    private colliderCount: TextRenderer;

    constructor(scene: Scene) {
        super(scene);

        this.updateRate = this.addComponent(TextRenderer);
        this.updateRate.offset = new Vector2(0, 0.03);

        this.updatePhysicsRate = this.addComponent(TextRenderer);
        this.updatePhysicsRate.offset = new Vector2(0, 0.06);

        this.colliderCount = this.addComponent(TextRenderer);
        this.colliderCount.offset = new Vector2(0, 0.09);
    }

    update(): void {
        const now = new Date().getTime();

        const delta = now - this.lastUpdate;
        const fps = 1000/delta;
        this.updateRate.text = "Update: " + Math.round(fps) + " FPS";

        this.lastUpdate = now;


        this.colliderCount.text = "Collider Count: " + this.scene.getAllComponents(Collider2D).length;
    }

    physicsUpdate(): void {
        const now = new Date().getTime();

        const delta = now - this.lastPhysicsUpdate;
        const fps = 1000/delta;
        this.updatePhysicsRate.text = "Physics Update: " + Math.round(fps) + " FPS";

        this.lastPhysicsUpdate = now;
    }

}

export default FpsLogger;