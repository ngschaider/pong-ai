import Graphics from "../graphics/Graphics";
import GameObject from "./GameObject";

class Component {

    gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }

    onCreate() {
        
    }

    beforeDraw(g: Graphics) {

    }

    draw(g: Graphics) {

    }

    afterDraw(g: Graphics) {

    }

    beforeUpdate() {

    }

    update() {

    }

    afterUpdate(){

    }

}

export default Component;