import CollisionSystem from "../engine/CollisionSystem";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import CanvasGraphics from "../graphics/CanvasGraphics";

class Systems extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RenderSystem);
        this.addComponent(InputSystem);
        this.addComponent(CollisionSystem);
    }

}

export default Systems;