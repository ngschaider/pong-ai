import Component from "./Component";
import Graphics from "../graphics/Graphics";
import Transform from "./Transform";

class GameObject {

    name: string = "Unnamed GameObject";
    tf: Transform;

    constructor() {
        this.tf = this.addComponent(Transform);
    }

    components: Component[] = [];

    addComponent<T extends Component>(type: new () => T): T {
        const instance: T = new type();
        this.components.push(instance);

        return instance
    }

    getComponent<T extends Component>(type: new() => T): T|null{
        const component = this.components.find(component => typeof component == typeof type) ;

        if(component) {
            return component as T;
        } else {
            return null;
        }
    }

    update() {
        for(const child of this.children) {
            child.update();
        }
    }

    draw(g: Graphics) {
        for(const child of this.children) {
            child.tf.beforeDraw(g);
            child.draw(g);
            child.tf.afterDraw(g);
        }
    }


    children: GameObject[] = [];

    addChild(obj: GameObject) {
        if(this.children.includes(obj)) {
            throw new Error("Tried to add already-present child.");
        }

        this.children.push(obj);
    }

    removeChild(obj: GameObject) {
        if(!this.children.includes(obj)) {
            throw new Error("Tried to remove non-present child.");
        }

        this.children = this.children.filter(o => o !== obj);
    }

}

export default GameObject;