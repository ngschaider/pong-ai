import Matrix4x4 from "../utils/Matrix4x4";
import Quaternion from "../utils/Quaternion";
import Vector3 from "../utils/Vector3";
import Component from "./core/Component";

class Transform extends Component {

    parent: Transform|null = null;

    position: Vector3 = Vector3.zero;
    renderOrder: number = 0;
    scale: Vector3 = Vector3.one;
    rotation: Quaternion = Quaternion.identity;

    public get isRootObject(): boolean {
        return this.parent === null;
    }

    public getChildren(): Transform[] {
        return this.scene.gameObjects.map(go => go.transform).filter(tf => tf.parent === this);
    }

    public getLocalToWorldMatrix(): Matrix4x4 {
        const parent = this.transform.parent?.getLocalToWorldMatrix() ?? Matrix4x4.identity;
        const trs = Matrix4x4.TRS(this.position, this.rotation, this.scale);
        
        return parent.mul(trs);
    }

    public localToWorld(vec: Vector3): Vector3 {
        return vec.applyMatrix(this.getLocalToWorldMatrix());
    }

    public move(delta: Vector3) {
        this.transform.position = this.transform.position.add(delta);
    }

    public moveTo(position: Vector3) {
        this.transform.position = position;
    }

}

export default Transform;