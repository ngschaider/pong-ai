import { notEmpty } from "../utils/funcs";
import Camera from "./Camera";
import Component, { ComponentConstructor } from "./Component";
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

    public getAllComponents<T extends Component>(type: ComponentConstructor<T>): T[] {
        return this.gameObjects.map(go => go.getComponent(type)).filter(notEmpty);
    }

    public getComponent<T extends Component>(type: ComponentConstructor<T>): T|null {
        const components = this.getAllComponents(type);
        return components.length === 0 ? null : components[0]
    }

    public getActiveCamera(): Camera|null {
        return this.getAllComponents(Camera).find(c => c.isActive) ?? null;
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