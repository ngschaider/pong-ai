import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import InputManager from "../input/InputManager";
import Vector2 from "../utils/Vector2";
import GameObject from "./GameObject";
import { Matrix3x3 } from "./Matrix2x2";
import Transform from "./Transform";

type GameObjectConstructor<T extends GameObject> = new (engine: Engine) => T;

class Engine {

    graphics: Graphics = new Graphics();

    gameObjects: GameObject[] = [];

    inputManager = new InputManager();

    createGameObject<T extends GameObject>(objType: GameObjectConstructor<T>, parent?: Transform): T {
        const gameObject = new objType(this);
        this.gameObjects.push(gameObject);

        if(parent) {
            gameObject.transform.setParent(parent);
        }
        
        gameObject.onCreate();

        return gameObject;
    }

    update() {
        for(const child of this.gameObjects) {
            child.update();
        }
    }

    draw() {
        this.graphics.setTransformationMatrix(new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1));
        this.graphics.fill(Color.Gray);

        const v = new Vector2(window.innerWidth, window.innerHeight)
        this.graphics.rectangle(v.scalarDiv(2), v);

        for(const child of this.gameObjects) {
            child.transform.beforeDraw(this.graphics);
            child.draw(this.graphics);
            child.transform.afterDraw(this.graphics);
        }
    }

    start() {
        const draw = () => {
            this.draw();
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
        
        const tick = () => {
            this.update();
        };
        setInterval(tick, 10/1000);
    }

}

export default Engine;