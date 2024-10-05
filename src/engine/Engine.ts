import Component from "./Component";
import Renderer from "./Renderer";
import Scene, { SceneConstructor } from "./Scene";

class Engine {

    private _scene!: Scene;
    public get scene() {
        return this._scene;
    }
    private set scene(scene: Scene) {
        this._scene = scene;
    }

    constructor() {
        this.switchScene(Scene);
    }

    switchScene<T extends Scene>(type: SceneConstructor<T>): T {
        const scene = new type(this);
        this._scene = scene;
        return scene;
    }

    update() {
        this.scene.update();
    }

    fixedUpdate() {
        this.scene.fixedUpdate();
    }

    start() {
        const func = () => {
            this.update();
            window.requestAnimationFrame(func);
        }
        window.requestAnimationFrame(func);

        const fixedFunc = () => {
            this.fixedUpdate();
        }
        setInterval(fixedFunc, 1000/60);
    }

}

export default Engine;