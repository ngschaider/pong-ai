import BoxCollider from "../engine/BoxCollider";
import CircleCollider from "../engine/CircleCollider";
import CircleRenderer from "../engine/CircleRenderer";
import Collider from "../engine/Collider";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import Rect from "../engine/Rect";
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

class Boundary extends GameObject {

    right: RectangleObj;
    bottom: RectangleObj;
    left: RectangleObj;
    top: RectangleObj;

    constructor(scene: Scene) {
        super(scene);

        this.right = this.addGameObject(RectangleObj);
        this.right.name = "Right";
        this.right.transform.position = new Vector3(9.5, 0, 0);
        this.right.transform.scale = new Vector2(1, 20);
        
        this.bottom = this.addGameObject(RectangleObj);
        this.bottom.name = "Bottom";
        this.bottom.transform.position = new Vector3(0, -9.5, 0);
        this.bottom.transform.scale = new Vector2(20, 1);
        
        this.left = this.addGameObject(RectangleObj);
        this.left.name = "Left";
        this.left.transform.position = new Vector3(-9.5, 0, 0);
        this.left.transform.scale = new Vector2(1, 20);
        
        this.top = this.addGameObject(RectangleObj);
        this.top.name = "Top";
        this.top.transform.position = new Vector3(0, 9.5, 0);
        this.top.transform.scale = new Vector2(20, 1);
    }

}

class Reflector extends GameObject {

    public targetCollider?: Collider;
    public target?: RigidBody;
    public right?: Collider;
    public bottom?: Collider;
    public left?: Collider;
    public top?: Collider;

    constructor(scene: Scene) {
        super(scene);

        this.engine.onStart.on(this.onStart.bind(this));
    }

    onStart() {
        if(!this.targetCollider) return;
        this.targetCollider.onCollisionStart.on(this.onCollisionStart.bind(this));
    }

    onCollisionStart(other: Collider) {
        if(!this.target || !this.right || !this.bottom || !this.left || !this.top) {
            return;
        }

        if([this.left, this.right].includes(other)) {
            this.target.velocity = this.target.velocity.scalarMul(new Vector3(-1, 1, 1));
        }
        if([this.top, this.bottom].includes(other)) {
            this.target.velocity = this.target.velocity.scalarMul(new Vector3(1, -1, 1));
        }
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

class PhysicsTestScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        // this.addGameObject(Systems);
        // this.addGameObject(Background);
        // this.addGameObject(MyCamera);
        // this.addGameObject(Test);

        this.addGameObject(Origin);
        this.addGameObject(Systems);
        this.addGameObject(Background);
        this.addGameObject(MyCamera);
        const boundary = this.addGameObject(Boundary);
        const ball = this.addGameObject(Ball);

        const reflector = this.addGameObject(Reflector);
        reflector.targetCollider = ball.collider;
        reflector.target = ball.rigidbody;
        reflector.top = boundary.top.collider;
        reflector.right = boundary.right.collider;
        reflector.bottom = boundary.bottom.collider;
        reflector.left = boundary.left.collider;
        
        ball.rigidbody.velocity = new Vector3(0.1, 0.2, 0);
    }

}

export default PhysicsTestScene;