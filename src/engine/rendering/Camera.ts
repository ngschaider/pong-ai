import { vec2 } from "gl-matrix";
import Matrix3x3 from "../../utils/Matrix3x3";
import Vector2 from "../../utils/Vector2";
import Component from "../core/Component";
import GameObject from "../core/GameObject";
import RenderSystem from "./RenderSystem";
import Vector3 from "../../utils/Vector3";

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

    public getWorldToCameraMatrix(): Matrix3x3 {
        const transformMatrix = this.transform.getLocalToWorldMatrix();
        const translate = Matrix3x3.translate(this.size.div(2));

        return transformMatrix.multiply(translate);
    }

    public worldToCamera(vec: Vector3): Vector3 {
        return vec.applyMatrix(this.getWorldToCameraMatrix());
    }

    public getCameraToWorldMatrix(): Matrix3x3 {
        return this.getWorldToCameraMatrix().invert();
    }

    public cameraToWorld(vec: Vector3): Vector3 {
        return vec.applyMatrix(this.getCameraToWorldMatrix());
    }

    public getCameraToClipMatrix() {
        const renderSystem = this.scene.getComponent(RenderSystem);
        if(!renderSystem) throw new Error("Missing camera");

        // scales from camera (e.g. 20x20) to clip matrix (-1, 1)
        const scaleDown = Matrix3x3.scale(Vector2.one.div(this.size)); 

        const factorX = renderSystem.graphics.aspectRatio > 1 ? renderSystem.graphics.aspectRatio : 1;
        const factorY = renderSystem.graphics.aspectRatio < 1 ? renderSystem.graphics.aspectRatio : 1;

        // make the scene distorted in the clip matrix as it later gets stretched to display (from -1,1 to 1920,1080)
        const distort = Matrix3x3.scale(new Vector2(1/factorX, 1/factorY));

        return scaleDown.multiply(distort);
    }

    public cameraToClip(vec: Vector3) {
        return vec.applyMatrix(this.getCameraToClipMatrix());
    }

    public getClipToCameraMatrix() {
        return this.getCameraToClipMatrix().invert();
    }

    public clipToCamera(vec: Vector3) {
        return vec.applyMatrix(this.getClipToCameraMatrix());
    }

}

export default Camera;