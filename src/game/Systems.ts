import Keyboard from "../engine/input/Keyboard";
import Mouse from "../engine/input/Mouse";
import Scene from "../engine/core/Scene";
import CollisionSystem from "../engine/collision/CollisionSystem";
import GameObject from "../engine/core/GameObject";
import RenderSystem from "../engine/rendering/RenderSystem";

class Systems extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RenderSystem);
        this.addComponent(Keyboard);
        this.addComponent(Mouse);
        this.addComponent(CollisionSystem);

        this.transform.renderOrder = 10;
    }

}

export default Systems;