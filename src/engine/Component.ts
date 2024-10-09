import { notEmpty } from "../utils/funcs";
import Engine from "./Engine";
import GameObject from "./GameObject";
import Scene from "./Scene";
import Transform from "./Transform";

export type AbstractComponentConstructor<T extends Component> = abstract new (gameObject: GameObject) => T;
export type ComponentConstructor<T extends Component> = new (gameObject: GameObject) => T;

class Component {

    private _gameObject: GameObject;
    public get gameObject() {
        return this._gameObject;
    }

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    public get scene(): Scene {
        return this.gameObject.scene;
    }

    public get engine(): Engine {
        return this.scene.engine;
    }

    public get transform(): Transform {
        return this.gameObject.transform;
    }

    public update() {

    }

    public physicsUpdate() {

    }

}

export default Component;