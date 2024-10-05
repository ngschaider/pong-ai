import BackgroundRenderer from "../engine/BackgroundRenderer";
import Camera from "../engine/Camera";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Vector3 from "../utils/Vector3";
import ManualPlayer from "./ManualPlayer";
import StrokedLine from "../engine/StrokedLine";
import CanvasGraphics from "../graphics/CanvasGraphics";
import FpsLogger from "./FpsLogger";
import CircleRenderer from "../engine/CircleRenderer";
import Vector2 from "../utils/Vector2";
import RigidBody from "../engine/RigidBody";
import CircleCollider from "../engine/CircleCollider";
import CollisionSystem from "../engine/CollisionSystem";

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
        this.addComponent(CollisionSystem);
    }

}

class Ball extends GameObject {

    rigidbody: RigidBody;

    constructor(scene: Scene) {
        super(scene);

        this.transform.scale = new Vector2(1, 1);
        this.transform.position = new Vector3(5, 9, 0);

        this.rigidbody = this.addComponent(RigidBody);
        this.rigidbody.velocity = new Vector3(-0.05, 0);

        const r = this.addComponent(CircleRenderer);
        r.fillColor = Color.white

        const collider = this.addComponent(CircleCollider);
        collider.onCollisionStart.on(this.onCollisionStart.bind(this));
    }

    onCollisionStart() {
        this.rigidbody.velocity = new Vector3(0, 0, 0);
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
        this.addGameObject(FpsLogger);
        this.addGameObject(Ball);
    }

}

export default PongScene;