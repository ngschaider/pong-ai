import Matrix from "../utils/Matrix";
import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Component from "./Component";

class Transform extends Component {

    parent: Transform|null = null;

    position: Vector2 = Vector2.zero;
    renderOrder: number = 0;
    scale: Vector2 = Vector2.one;
    rotation: number = 0;

    public get isRootObject(): boolean {
        return this.parent === null;
    }

    public getChildren(): Transform[] {
        return this.scene.gameObjects.map(go => go.transform).filter(tf => tf.parent === this);
    }

    public getMatrix(): Matrix3x3 {
        const parent = this.transform.parent?.getMatrix() ?? Matrix3x3.identity;
        const trs = Matrix3x3.TRS(this.position, this.rotation, this.scale);
        
        return parent.multiply(trs);
    }

    public move(delta: Vector2) {
        this.transform.position = this.transform.position.add(delta);
    }

    public moveTo(position: Vector2) {
        this.transform.position = position;
    }

}

export default Transform;