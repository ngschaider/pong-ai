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

class Ground extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(RectangleRenderer);
        r.fillColor = Color.white;

        this.transform.scale = new Vector2(20, 1);
        this.transform.position = new Vector2(0, -10);
    }
}

class Wrapper extends GameObject {

    update(): void {
        for(const go of this.scene.gameObjects) {
            if(go.transform.position.x < -10) {
                go.transform.move(new Vector2(20, 0));
            }
            if(go.transform.position.x > 10) {
                go.transform.move(new Vector2(-20, 0));
            }
            if(go.transform.position.y < -10) {
                go.transform.move(new Vector2(0, 20));
            }
            if(go.transform.position.y > 10) {
                go.transform.move(new Vector2(0, -20));
            }
        }
    }

}

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
        this.rigidBody.velocity = new Vector2(-0.05, 0.05);
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

        this.rigidBody.addForce(new Vector2(x, y).scalarMul(0.01));
    }

}


class MyBox extends GameObject {

    rigidBody: RigidBody;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.addComponent(BoxCollider);
        this.addComponent(Rotator);
        const c = this.addComponent(RectangleRenderer);
        c.fillColor = Color.red;

        this.transform.position = new Vector2(8, -8);
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

        this.rigidBody.addForce(new Vector2(x, y).scalarMul(0.1));
    }

}

class Rotator extends Component {
    constructor(gameObject: GameObject) {
        super(gameObject);

        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        const rb = this.gameObject.getComponent(RigidBody);
        if(rb) {
            rb.angularVelocity = Math.random() * 0.8 + 1;
        }
    }
}


class CollidingCircle extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RigidBody);
        this.addComponent(CircleCollider);

        const cr = this.addComponent(CircleRenderer);
        cr.fillColor = RandomHelper.color();
        cr.stroke = true;
        cr.strokeColor = Color.white;

        this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
    }

}

class CollidingBox extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RigidBody);
        this.addComponent(BoxCollider);
        const rr = this.addComponent(RectangleRenderer);
        rr.fillColor = RandomHelper.color();
        rr.stroke = true;
        rr.strokeColor = Color.white;

        this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
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

        const rb = this.addComponent(RigidBody);
        rb.mass = Infinity;

        this.addComponent(CircleCollider);

        this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
    }

}

class StaticBox extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        const rr = this.addComponent(RectangleRenderer);
        rr.fillColor = new Color(50, 50, 50);
        rr.stroke = true;
        rr.strokeColor = new Color(255, 0, 0);
        
        const rb = this.addComponent(RigidBody);
        rb.mass = Infinity;

        this.addComponent(BoxCollider);

        this.transform.position = new Vector2(RandomHelper.floatRange(-10, 10), RandomHelper.floatRange(-10, 10));
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
        this.addGameObject(Wrapper);

        for(let i = 0; i < 10; i++) {
            if(RandomHelper.boolean()) {
                this.addGameObject(CollidingCircle);
            } else {
                this.addGameObject(CollidingBox);
            }
        }

        this.addGameObject(StaticCircle).transform.position = new Vector2(2, 2);
        this.addGameObject(StaticCircle).transform.position = new Vector2(-2, -2);
        this.addGameObject(StaticBox).transform.position = new Vector2(4, 2);
        this.addGameObject(StaticBox).transform.position = new Vector2(-4, -2);
        this.addGameObject(StaticBox).transform.position = new Vector2(4, 6);
        this.addGameObject(StaticBox).transform.position = new Vector2(-4, -6);
        this.addGameObject(StaticCircle).transform.position = new Vector2(-6, 8);
        this.addGameObject(StaticCircle).transform.position = new Vector2(6, -8);
    }

}

export default PhysicsTestScene;