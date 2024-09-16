import GameObject from "./GameObject";
import Rectangle from "./Rectangle";

class RectangleObject extends GameObject {

    rectangle!: Rectangle;

    onCreate(): void {
        this.rectangle = this.addComponent(Rectangle);
    }
    
}

export default RectangleObject;