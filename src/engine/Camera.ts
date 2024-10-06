import Matrix from "../utils/Matrix";
import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Component from "./Component";
import GameObject from "./GameObject";
import Rect from "./Rect";

class Camera extends Component {

    public size: Vector2 = new Vector2(20, 20);

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

    public getWorldToScreenMatrix(): Matrix3x3 {
        const transformMatrix = this.transform.getMatrix();
        const translate = Matrix3x3.translate(this.size.scalarDiv(2));
        const scaleDown = Matrix3x3.scale(Vector2.one.scalarDiv(this.size));

        // return scaleDown.multiply(translate).multiply(transformMatrix);
        // return transformMatrix.multiply(scaleDown.multiply(translate));
        return transformMatrix.multiply(scaleDown).multiply(translate);
    }


}

export default Camera;