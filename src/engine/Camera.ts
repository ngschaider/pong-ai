import Matrix from "../utils/Matrix";
import Component from "./Component";
import GameObject from "./GameObject";

class Camera extends Component {

    public size: number = 10;

    private _isActive: boolean;
    public get isActive() {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        if(value) {
            this.scene.getActiveCamera()?.deactivate();
            this._isActive = true;
        } else {
            this._isActive = false;
        }
    }

    public deactivate() {
        this.isActive = false;
    }

    constructor(gameObject: GameObject) {
        super(gameObject);

        // activate this camera if there is no active camera in the scene yet
        this._isActive = this.scene.getActiveCamera() == null;
    }

    getMatrix(): Matrix {
        const transformMatrix = this.transform.getMatrix();

        const scale = Matrix.create3x3(
            1/this.size, 0, 0,
            0, 1/this.size, 0,
            0, 0, 1
        );

        return transformMatrix
            .multiply(this.transform.translationMatrix)
            .multiply(scale)
            .multiply(this.transform.rotationMatrix);
    }


}

export default Camera;