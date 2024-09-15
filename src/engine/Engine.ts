import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import InputManager from "../input/InputManager";
import GameObject from "./GameObject";

class Engine {

    graphics: Graphics = new Graphics();

    children: GameObject[] = [];

    inputManager = new InputManager();

    name: string = "Engine";
    
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

    update() {
        for(const child of this.children) {
            child.update();
        }
    }

    draw() {
        this.graphics.background(Color.Gray);

        for(const child of this.children) {
            child.tf.beforeDraw(this.graphics);
            child.draw(this.graphics);
            child.tf.afterDraw(this.graphics);
        }
    }

}

export default Engine;