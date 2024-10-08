import BoxCollider from "../engine/BoxCollider";
import CircleCollider from "../engine/CircleCollider";
import CircleRenderer from "../engine/CircleRenderer";
import Component from "../engine/Component";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import Rect from "../engine/Rect";
import RectangleRenderer from "../engine/RectangleRenderer";
import RigidBody from "../engine/RigidBody";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import RandomHelper from "../utils/RandomHelper";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Background from "./Background";
import MyCamera from "./MyCamera";
import Systems from "./Systems";

class MyCircle extends GameObject {

    rigidBody: RigidBody;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.rigidBody.mass = 20;
        this.addComponent(CircleCollider);
        const c = this.addComponent(CircleRenderer);
        c.fillColor = Color.red;

        this.transform.position = new Vector2(8, -8);
        this.rigidBody.velocity = new Vector2(0, 0);
    }

    update(): void {
        const inputSystem = this.scene.getComponent(InputSystem);
        if(!inputSystem) return;

        let x = 0
        if(inputSystem.keys.D) x += 1;
        if(inputSystem.keys.A) x -= 1;

        let y = 0;
        if(inputSystem.keys.W) y -= 1;
        if(inputSystem.keys.S) y += 1;

        this.rigidBody.addForce(new Vector2(x, y).scalarMul(0.002));
    }

}


class CollidingCircle extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const rb = this.addComponent(RigidBody);
        rb.mass = 2;
        rb.acceleration = new Vector2(0, 0.001);

        this.addComponent(CircleCollider);

        const cr = this.addComponent(CircleRenderer);
        cr.fillColor = RandomHelper.color();
        cr.stroke = true;
        cr.strokeColor = Color.white;
        cr.lineWidth = 0.03;

        const radius = RandomHelper.floatRange(0.5641, 1.6925);
        this.transform.scale = new Vector2(radius, radius);
    }

}

class CollidingBox extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const rb = this.addComponent(RigidBody);
        rb.mass = 10;
        rb.acceleration = new Vector2(0, 0.001);

        this.addComponent(BoxCollider);
        const rr = this.addComponent(RectangleRenderer);
        rr.fillColor = RandomHelper.color();
        rr.stroke = true;
        rr.strokeColor = Color.white;
        rr.lineWidth = 0.03;

        this.transform.scale = new Vector2(RandomHelper.floatRange(0.5, 1.5), RandomHelper.floatRange(0.5, 1.5));
    }

    update(): void {
        //this.transform.position = Vector2.zero;
    }

}

class StaticCircle extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const cr = this.addComponent(CircleRenderer);
        cr.fillColor = new Color(50, 50, 50);
        cr.stroke = true;
        cr.strokeColor = new Color(255, 0, 0);
        cr.lineWidth = 0.03;

        const rb = this.addComponent(RigidBody);
        rb.mass = Infinity;

        this.addComponent(CircleCollider);

        this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
    }

}

// class StaticBox extends GameObject {

//     constructor(scene: Scene) {
//         super(scene);

//         const rr = this.addComponent(RectangleRenderer);
//         rr.fillColor = new Color(50, 50, 50);
//         rr.stroke = true;
//         rr.strokeColor = new Color(255, 0, 0);
//         rr.lineWidth = 0.03;
        
//         const rb = this.addComponent(RigidBody);
//         rb.mass = Infinity;

//         this.addComponent(BoxCollider);

//         this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
//     }

// }

class Ground extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.transform.scale = new Vector2(20, 1);
        this.transform.position = new Vector2(0, 9.5);

        const bc = this.addComponent(BoxCollider)

        const rb = this.addComponent(RigidBody)
        rb.mass = Infinity

        const rr = this.addComponent(RectangleRenderer)
        rr.fillColor = Color.green;
    }

}

class ObjectPlacer extends GameObject {

    inputSystem: InputSystem|null = null;

    constructor(scene: Scene) {
        super(scene);
        
        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        this.inputSystem = this.scene.getComponent(InputSystem);
        if(!this.inputSystem) return;

        this.inputSystem.onMouseLeft.on(this.onMouseLeft.bind(this));
    }

    onMouseLeft() {
        if(!this.inputSystem) return;

        if(Math.random() > 0.5) {
            const go = this.scene.addGameObject(CollidingBox);
            go.transform.position = this.inputSystem.mousePosition;
        } else {
            const go = this.scene.addGameObject(CollidingCircle);
            go.transform.position = this.inputSystem.mousePosition;

        }
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

        this.addGameObject(StaticCircle).transform.position = new Vector2(6, -4);
        this.addGameObject(StaticCircle).transform.position = new Vector2(-6, -4);
    }

}

export default PhysicsTestScene;