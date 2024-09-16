import Component from "./Component";
import Graphics from "../graphics/Graphics";
import Transform from "./Transform";
import Engine from "./Engine";

type ComponentConstructor<T> = new (obj: GameObject) => T

class GameObject {

    engine: Engine;
    name: string = "Unnamed GameObject";
    transform: Transform;

    onCreate() {
        
    }

    constructor(engine: Engine) {
        this.engine = engine;

        // every component must have a transform
        this.transform = this.addComponent(Transform);
    }

    components: Component[] = [];

    addComponent<T extends Component>(componentType: ComponentConstructor<T>): T {
        const component: T = new componentType(this);
        component.onCreate();
        this.components.push(component);

        return component
    }

    getComponent<T extends Component>(type: ComponentConstructor<T>): T|null{
        const component = this.components.find(component => typeof component == typeof type) ;

        if(component) {
            return component as T;
        } else {
            return null;
        }
    }

    update() {
        for(const component of this.components) {
            component.beforeUpdate();
        }
        for(const component of this.components) {
            component.update();
        }
        for(const component of this.components) {
            component.afterUpdate();
        }
    }

    draw(g: Graphics) {
        for(const component of this.components) {
            component.beforeDraw(g);
        }
        for(const component of this.components) {
            component.draw(g);
        }
        for(const component of this.components) {
            component.afterDraw(g);
        }
    }

}

export default GameObject;