import Matrix from "../utils/Matrix";
import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Component from "./Component";

class Transform extends Component {

    parent: Transform|null = null;

    position: Vector3 = Vector3.zero;
    scale: Vector2 = Vector2.one;
    rotation: number = 0;

    public get isRootObject(): boolean {
        return this.parent === null;
    }

    getChildren(): Transform[] {
        return this.scene.gameObjects.map(go => go.transform).filter(tf => tf.parent === this);
    }

    getMatrix(): Matrix3x3 {
        const parent = this.transform.parent?.getMatrix() ?? Matrix3x3.identity;
        const trs = Matrix3x3.TRS(this.position.xy, this.rotation, this.scale);
        
        return parent.multiply(trs);
    }

}

export default Transform;