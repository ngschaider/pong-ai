import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Component from "./core/Component";

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

    public getLocalToWorldMatrix(): Matrix3x3 {
        const parent = this.transform.parent?.getLocalToWorldMatrix() ?? Matrix3x3.identity;
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