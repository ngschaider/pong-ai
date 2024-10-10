import Transform from "../Transform";
import Component, { AbstractComponentConstructor, ComponentConstructor } from "./Component";
import Engine from "./Engine";
import Scene from "./Scene";

export type GameObjectConstructor<T extends GameObject> = new (scene: Scene) => T;

class GameObject {

    name: string = "Unnamed GameObject";

    _components: Component[] = [];
    public get components(): Readonly<Component[]> {
        return this._components;
    }

    addComponent<T extends Component>(type: ComponentConstructor<T>): T {
        const component = new type(this);
        this._components.push(component);
        return component;
    }

    addChild<T extends GameObject>(type: GameObjectConstructor<T>): T {
        const go = this.scene.addGameObject(type);
        go.transform.parent = this.transform;
        return go;
    }

    private _scene: Scene;
    public get scene() {
        return this._scene;
    }

    private _transform: Transform;
    public get transform() {
        return this._transform;
    }

    public get engine(): Engine {
        return this.scene.engine;
    }

    constructor(scene: Scene) {
        this._scene = scene;
        this._transform = this.addComponent(Transform);
        this.name = this.constructor.name;
    }

    getComponent<T extends Component>(type: AbstractComponentConstructor<T>): T|null {
        return this.getComponents(type)[0] || null;
    }

    getComponents<T extends Component>(type: AbstractComponentConstructor<T>): T[] {
        const isType = (c: Component): c is T => c instanceof type;
        return this.components.filter(isType);
    }

    update() {
        for(const component of this.components) {
            component.update();
        }
    }

    physicsUpdate() {
        for(const component of this.components) {
            component.physicsUpdate();
        }
    }

}


export default GameObject;
