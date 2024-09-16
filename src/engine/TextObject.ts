import GameObject from "./GameObject";
import Text from "./Text";

class TextObject extends GameObject {

    text!: Text;

    onCreate(): void {
        this.text = this.addComponent(Text);
    }
    
}

export default TextObject;