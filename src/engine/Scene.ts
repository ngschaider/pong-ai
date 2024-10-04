import Engine from "./Engine";
import GameObject, { GameObjectConstructor } from "./GameObject";

export type SceneConstructor<T extends Scene> = new (engine: Engine) => T;

class Scene {

    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    _gameObjects: GameObject[] = [];
    public get gameObjects(): Readonly<GameObject[]> {
        return this._gameObjects;
    }

    getRootObjects(): GameObject[] {
        return this.gameObjects.filter(go => go.transform.isRootObject);
    }

    addGameObject<T extends GameObject>(type: GameObjectConstructor<T>): T {
        const gameObject = new type(this);
        this._gameObjects.push(gameObject);
        return gameObject;
    }

    update() {
        for(const gameObject of this.gameObjects) {
            gameObject.update();
        }
    }

    fixedUpdate() {
        for(const gameObject of this.gameObjects) {
            gameObject.update();
        }
    }

}

export default Scene;