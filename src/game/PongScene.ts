import BackgroundRenderer from "../engine/BackgroundRenderer";
import Camera from "../engine/Camera";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Vector3 from "../utils/Vector3";
import ManualPlayer from "./ManualPlayer";
import StrokedLine from "../engine/StrokedLine";
import MiddleLine from "../engine/StrokedLine";
import CanvasGraphics from "../graphics/CanvasGraphics";

class MyBackground extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector3(0, 0, -1);

        const r = this.addComponent(BackgroundRenderer);
        r.color = Color.black;
    }

}

class MyCamera extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.position = new Vector3(0, 0, 1);

        const c = this.addComponent(Camera);
        c.size = 20;
    }

    
}

class Systems extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(RenderSystem);
        r.graphics = new CanvasGraphics(document.getElementById("root") as HTMLCanvasElement);
        
        this.addComponent(InputSystem);
    }

}

class PongScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        this.addGameObject(Systems);
        this.addGameObject(MyCamera);
        this.addGameObject(MyBackground);
        this.addGameObject(ManualPlayer);
        this.addGameObject(StrokedLine);
    }

}

export default PongScene;