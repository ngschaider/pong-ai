import GameObject from "../engine/GameObject";
import TextObject from "../engine/TextObject";
import Component from "../engine/Component";
import Vector2 from "../utils/Vector2";
import RectangleObject from "../engine/RectangleObject";

class TopBar extends GameObject {

    fpsLabel!: TextObject;
    tpsLabel!: TextObject;

    onCreate(): void {
        this.transform.position = new Vector2(0, -450)

        this.fpsLabel = this.engine.createGameObject(TextObject);
        this.fpsLabel.transform.setParent(this.transform);

        this.tpsLabel = this.engine.createGameObject(TextObject);
        this.tpsLabel.transform.setParent(this.transform);

        const rectangle = this.engine.createGameObject(RectangleObject);
        rectangle.transform.setParent(this.transform);
        rectangle.rectangle.size = new Vector2(200, 60);

        this.addComponent(TopBarScript);
    }

}

class TopBarScript extends Component {
    
    update(): void {
        // console.log(this.gameObject.engine.gameObjects)
    }

}

export default TopBar;