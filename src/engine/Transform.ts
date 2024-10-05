import Matrix from "../utils/Matrix";
import Vector2 from "../utils/Vector2";
import Component from "./Component";

class Transform extends Component {

    parent: Transform|null = null;

    position: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotation: number = 0;

    public get isRootObject(): boolean {
        return this.parent === null;
    }

    getChildren(): Transform[] {
        return this.scene.gameObjects.map(go => go.transform).filter(tf => tf.parent === this);
    }

    getMatrix(): Matrix {
        const parent = this.transform.parent?.getMatrix() || Matrix.createIdentity(3, 3);

        return parent
            .multiply(this.translationMatrix)
            .multiply(this.scaleMatrix)
            .multiply(this.rotationMatrix);
    }

    get scaleMatrix() {
        return Matrix.create3x3(
            this.scale.x, 0, 0, 
            0, this.scale.y, 0,
            0, 0, 1
        );
    }

    get translationMatrix() {
        return Matrix.create3x3(
            1, 0, this.position.x,
            0, 1, this.position.y,
            0, 0, 1
        );
    }

    get rotationMatrix() {
        return Matrix.create3x3(
            Math.cos(this.rotation/180*Math.PI), -Math.sin(this.rotation/180*Math.PI), 0, 
            Math.sin(this.rotation/180*Math.PI), Math.cos(this.rotation/180*Math.PI), 0, 
            0, 0, 1
        );
    }

}

export default Transform;