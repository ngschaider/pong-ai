import RigidBody from "../engine/RigidBody";
import RectangleCollider2D from "../engine/collision/RectangleCollider2D";
import CircleCollider2D from "../engine/collision/CircleCollider2D";
import Engine from "../engine/core/Engine";
import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import Keyboard, { KeyCode } from "../engine/input/Keyboard";
import Mouse from "../engine/input/Mouse";
import CircleRenderer from "../engine/rendering/CircleRenderer";
import RectangleRenderer from "../engine/rendering/RectangleRenderer";
import Color from "../utils/Color";
import RandomHelper from "../utils/RandomHelper";
import Background from "./Background";
import FpsLogger from "./FpsLogger";
import MyCamera from "./MyCamera";
import Systems from "./Systems";
import Vector3 from "../utils/Vector3";

class MyCircle extends GameObject {

    rigidBody: RigidBody;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.rigidBody.mass = 20;
        this.addComponent(CircleCollider2D);
        const c = this.addComponent(CircleRenderer);
        c.fillColor = Color.red;

        this.transform.position = new Vector3(8, 8, 0);
        this.rigidBody.velocity = new Vector3(0, 0, 0);
    }

    update(): void {
        const keyboard = this.scene.getComponent(Keyboard);
        if(!keyboard) return;

        let x = 0
        if(keyboard.isKeyPressed(KeyCode.D)) x += 1;
        if(keyboard.isKeyPressed(KeyCode.A)) x -= 1;

        let y = 0;
        if(keyboard.isKeyPressed(KeyCode.W)) y -= 1;
        if(keyboard.isKeyPressed(KeyCode.S)) y += 1;

        this.rigidBody.addForce(new Vector3(x, y, 0).mul(100000));
    }

}


class CollidingCircle extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const rb = this.addComponent(RigidBody);
        rb.mass = 10;
        // rb.mass = Infinity;
        rb.acceleration = new Vector3(0, 9.807, 0);

        this.addComponent(CircleCollider2D);

        const cr = this.addComponent(CircleRenderer);
        cr.fillColor = RandomHelper.color();
        cr.doStroke = true;
        cr.strokeColor = Color.white;
        cr.lineWidth = 0.03;

        const radius = RandomHelper.floatRange(0.5641, 1.6925);
        this.transform.scale = new Vector3(radius, radius, 1);
    }

}

class CollidingBox extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const rb = this.addComponent(RigidBody);
        rb.mass = 10;
        // rb.mass = Infinity;
        rb.acceleration = new Vector3(0, 9.807, 0);

        this.addComponent(RectangleCollider2D);
        const rr = this.addComponent(RectangleRenderer);
        rr.fillColor = RandomHelper.color();
        rr.doStroke = true;
        rr.strokeColor = Color.white;
        rr.lineWidth = 0.03;

        this.transform.scale = new Vector3(RandomHelper.floatRange(0.5, 1.5), RandomHelper.floatRange(0.5, 1.5), 1);
    }

}

class StaticCircle extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const cr = this.addComponent(CircleRenderer);
        cr.fillColor = new Color(50, 50, 50);
        cr.doStroke = true;
        cr.strokeColor = new Color(255, 0, 0);
        cr.lineWidth = 0.03;

        const rb = this.addComponent(RigidBody);
        rb.mass = Infinity;

        this.addComponent(CircleCollider2D);

        this.transform.position = new Vector3(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10), 0);
    }

}

class Ground extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.scale = new Vector3(20, 1, 1);
        this.transform.position = new Vector3(0, -9.5, 0);

        const bc = this.addComponent(RectangleCollider2D)

        const rb = this.addComponent(RigidBody)
        rb.mass = Infinity

        const rr = this.addComponent(RectangleRenderer)
        rr.fillColor = Color.darkGreen;
    }

}

class ObjectPlacer extends GameObject {

    mouse: Mouse|null = null;
    keyboard: Keyboard|null = null;

    constructor(scene: Scene) {
        super(scene);
        
        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        this.keyboard = this.scene.getComponent(Keyboard);
        if(!this.keyboard) return;

        this.mouse = this.scene.getComponent(Mouse);
        if(!this.mouse) return;
        
        this.keyboard.keys.get(KeyCode.R)?.onKeyDown.on(() => {
            if(!this.mouse) return;
            const go = this.scene.addGameObject(CollidingBox);
            go.transform.position = this.mouse.worldPosition;
        })

        this.keyboard.keys.get(KeyCode.F)?.onKeyDown.on(() => {
            if(!this.mouse) return;
            const go = this.scene.addGameObject(CollidingCircle);
            go.transform.position = this.mouse.worldPosition;
        })
    }

}

class PhysicsTestScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        this.addGameObject(Systems);
        this.addGameObject(Background);
        this.addGameObject(MyCamera);

        this.addGameObject(MyCircle);
        this.addGameObject(Ground);
        this.addGameObject(ObjectPlacer);

        const fpsLogger = this.addGameObject(FpsLogger);
        fpsLogger.transform.position = new Vector3(0, 0, 0);

        this.addGameObject(StaticCircle).transform.position = new Vector3(6, 4, 0);
        this.addGameObject(StaticCircle).transform.position = new Vector3(-6, 4, 0);
    }

    update(): void {
        super.update();

        
    }

}

export default PhysicsTestScene;