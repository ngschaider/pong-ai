import CollisionSystem from "../engine/CollisionSystem";
import GameObject from "../engine/GameObject";
import Keyboard from "../engine/Keyboard";
import Mouse from "../engine/Mouse";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import CanvasGraphics from "../graphics/CanvasGraphics";

class Systems extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RenderSystem);
        this.addComponent(Keyboard);
        this.addComponent(Mouse);
        this.addComponent(CollisionSystem);
    }

}

export default Systems;