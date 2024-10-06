import BoxCollider from "../engine/BoxCollider";
import CircleCollider from "../engine/CircleCollider";
import CircleRenderer from "../engine/CircleRenderer";
import Collider from "../engine/Collider";
import Component from "../engine/Component";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RectangleRenderer from "../engine/RectangleRenderer";
import RigidBody from "../engine/RigidBody";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Background from "./Background";
import Ball from "./Ball";
import MyCamera from "./MyCamera";
import Origin from "./Origin";
import Systems from "./Systems";

class RectangleObj extends GameObject{

    collider: BoxCollider;

    constructor(scene: Scene) {
        super(scene);

        const r = this.addComponent(RectangleRenderer);
        r.fillColor = Color.red;

        this.collider = this.addComponent(BoxCollider);
    }

}

class Test extends GameObject {

    r: RectangleRenderer;
    c: BoxCollider;

    constructor(scene: Scene) {
        super(scene);

        this.r = this.addComponent(RectangleRenderer);
        this.r.fillColor = Color.red;
        this.c = this.addComponent(BoxCollider);

        this.transform.scale = new Vector2(5, 5);
    }

    update(): void {
    }
}

class MyCircle extends GameObject {

    rigidBody: RigidBody;

    constructor(scene: Scene) {
        super(scene);

        this.rigidBody = this.addComponent(RigidBody);
        this.addComponent(CircleCollider);
        const c = this.addComponent(CircleRenderer);
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

        this.rigidBody.velocity = new Vector2(x, y).scalarMul(0.1);
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

        this.rigidBody.velocity = new Vector2(x, y).scalarMul(0.1);
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
        const c = this.addComponent(CircleRenderer);
        c.fillColor = Color.white;
    }

}

class CollidingBox extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.addComponent(RigidBody);
        this.addComponent(BoxCollider);
        //this.addComponent(Rotator);
        const c = this.addComponent(RectangleRenderer);
        c.fillColor = Color.white;
    }

    update(): void {
        this.transform.position = Vector2.zero;
    }

}

class PhysicsTestScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        // this.addGameObject(Systems);
        // this.addGameObject(Background);
        // this.addGameObject(MyCamera);
        // this.addGameObject(Test);

        // this.addGameObject(Origin);
        this.addGameObject(Systems);
        this.addGameObject(Background);
        this.addGameObject(MyCamera);
        // const boundary = this.addGameObject(Boundary);


        const g = this.addGameObject(CollidingBox)
        g.transform.position = new Vector2(3, 3);

        this.addGameObject(MyCircle);
        // this.addGameObject(MyBox);

        // for(let y = 0; y < 3; y++) {
        //     for(let x = 0; x < 3; x++) {
        //         const g = this.addGameObject(CollidingCircle)
        //         g.transform.position = new Vector2((x-3) * 3, (y-3) * 3);
        //     }
        // }

        
        //const g2 = this.addGameObject(CollidingBox)
        //g2.transform.position = new Vector2(-3, -3);

        // const ball = this.addGameObject(Ball);
        // ball.rigidbody.velocity = new Vector2(0.1, 0.2);
    }

}

export default PhysicsTestScene;