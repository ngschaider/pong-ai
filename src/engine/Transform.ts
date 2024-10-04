import Vector2 from "../utils/Vector2";
import Component from "./Component";

class Transform extends Component {

    parent: Transform|null = null;

    position: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.Zero;
    rotation: number = 0;

    public get isRootObject(): boolean {
        return this.parent === null;
    }

    getChildren(): Transform[] {
        return this.scene.gameObjects.map(go => go.transform).filter(tf => tf.parent === this);
    }

}

export default Transform;