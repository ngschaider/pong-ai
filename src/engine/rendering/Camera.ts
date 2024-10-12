import { vec2 } from "gl-matrix";
import Matrix3x3 from "../../utils/Matrix3x3";
import Vector2 from "../../utils/Vector2";
import Component from "../core/Component";
import GameObject from "../core/GameObject";
import RenderSystem from "./RenderSystem";
import Vector3 from "../../utils/Vector3";
import Matrix4x4 from "../../utils/Matrix4x4";

class Camera extends Component {

    public size: Vector2 = new Vector2(20, 20);

    public readonly nearClip = 0.1;
    public readonly farClip = 10;

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

    public getWorldToCameraMatrix(): Matrix4x4 {
        return this.transform.getLocalToWorldMatrix().invert();
    }

    public worldToCamera(vec: Vector3): Vector3 {
        return vec.applyMatrix(this.getWorldToCameraMatrix());
    }

    public getCameraToWorldMatrix(): Matrix4x4 {
        return this.getWorldToCameraMatrix().invert();
    }

    public cameraToWorld(vec: Vector3): Vector3 {
        return vec.applyMatrix(this.getCameraToWorldMatrix());
    }

    /**
     * normally this would be a non-square matrix as we take a vec3 and output a vec2 but 
     * we just output a square matrix and suppose the user ignores the third component
     */
    public getCameraToClipMatrix(): Matrix4x4 {
        const renderSystem = this.scene.getComponent(RenderSystem);
        if(!renderSystem) throw new Error("Missing camera");

        // scales from camera (e.g. 20x20) to clip matrix (-1, 1)
        const scaleDown = Matrix4x4.scale(new Vector3(1/this.size.x, 1/this.size.y, 1)); 
        
        const factorX = renderSystem.graphics.aspectRatio > 1 ? renderSystem.graphics.aspectRatio : 1;
        const factorY = renderSystem.graphics.aspectRatio < 1 ? renderSystem.graphics.aspectRatio : 1;

        // make the scene distorted in the clip matrix as it later gets stretched to display (from -1,1 to 1920,1080)
        const distort = Matrix4x4.scale(new Vector3(1/factorX, 1/factorY, 1));

        return scaleDown.mul(distort);
    }

    public cameraToClip(vec: Vector3) {
        return vec.applyMatrix(this.getCameraToClipMatrix());
    }

    public getClipToCameraMatrix() {
        return this.getCameraToClipMatrix().invert();
    }

    public clipToCamera(vec: Vector2, z: number = 0) {
        return vec.toVector3(z).applyMatrix(this.getClipToCameraMatrix());
    }

}

export default Camera;