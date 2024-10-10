import MyEvent from "../../utils/MyEvent";
import Scene, { SceneConstructor } from "./Scene";

class Engine {
    
    onStart: MyEvent = new MyEvent();

    private _deltaTime: number = 0;
    private set deltaTime(value: number) {
        this._deltaTime = value;
    }
    public get deltaTime(): number {
        return this._deltaTime;
    }

    private _deltaTimePhysics: number = 0;
    private set deltaTimePhysics(value: number) {
        this._deltaTimePhysics = value;
    }
    public get deltaTimePhysics(): number {
        return this._deltaTimePhysics;
    }

    private frameStart: Date|null = null;
    private frameStartPhysics: Date|null = null;
    private physicsIterationPerFrame: number = 20;

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
        const now = new Date();
        this.deltaTime = this.frameStart === null ? 0 : (now.getTime() - this.frameStart.getTime()) / 1000;
        this.frameStart = now;

        this.scene.update();
    }

    physicsUpdate() {
        const now = new Date();
        const frame = this.frameStartPhysics === null ? 0 : (now.getTime() - this.frameStartPhysics.getTime()) / 1000;
        this.deltaTimePhysics = frame / this.physicsIterationPerFrame;
        this.frameStartPhysics = now;

        for(let i = 0; i < this.physicsIterationPerFrame; i++) {
            this.scene.physicsUpdate();
        }
    }

    start() {
        const func = () => {
            this.update();
            this.physicsUpdate();
            window.requestAnimationFrame(func);
        }
        window.requestAnimationFrame(func);

        const physicsFunc = () => {
            this.physicsUpdate();
            window.requestAnimationFrame(physicsFunc);
        }
        window.requestAnimationFrame(physicsFunc);

        this.onStart.emit();
    }

}

export default Engine;