import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import InputManager from "../input/InputManager";
import GameObject from "./GameObject";

type GameObjectConstructor<T extends GameObject> = new (engine: Engine) => T;

class Engine {

    graphics: Graphics = new Graphics();

    gameObjects: GameObject[] = [];

    inputManager = new InputManager();

    createGameObject<T extends GameObject>(objType: GameObjectConstructor<T>): T {
        const gameObject = new objType(this);
        gameObject.onCreate();
        this.gameObjects.push(gameObject);
        return gameObject;
    }

    update() {
        for(const child of this.gameObjects) {
            child.update();
        }
    }

    draw() {
        this.graphics.background(Color.Gray);

        for(const child of this.gameObjects) {
            child.transform.beforeDraw(this.graphics);
            child.draw(this.graphics);
            child.transform.afterDraw(this.graphics);
        }
    }

}

export default Engine;