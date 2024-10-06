import CollisionSystem from "../engine/CollisionSystem";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import CanvasGraphics from "../graphics/CanvasGraphics";

class Systems extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(RenderSystem);
        r.graphics = new CanvasGraphics(document.getElementById("root") as HTMLCanvasElement);
        
        this.addComponent(InputSystem);
        this.addComponent(CollisionSystem);
    }

}

export default Systems;