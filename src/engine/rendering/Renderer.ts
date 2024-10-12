import Color from "../../utils/Color";
import Matrix3x3 from "../../utils/Matrix3x3";
import Matrix4x4 from "../../utils/Matrix4x4";
import Component from "../core/Component";
import Graphics from "../graphics/Graphics";

export enum RendererSpace {
    Local,
    World,
    Camera,
    Clip,
    Screen,
}

class Renderer extends Component {

    public fillColor: Color = Color.black;
    public doFill: boolean = true;

    public strokeColor: Color = Color.black;
    public doStroke: boolean = false;

    public lineWidth: number = 0.03;
    public fontSize: number = 0.03;

    public space: RendererSpace = RendererSpace.Local;

    public render(graphics: Graphics) {
        if(this.doFill) {
            graphics.fill(this.fillColor);
        } else {
            graphics.noFill();
        }

        if(this.doStroke) {
            graphics.stroke(this.strokeColor);
        } else {
            graphics.noStroke();
        }

        graphics.fontSize(this.fontSize);

        graphics.lineWidth(this.lineWidth);

        const camera = this.scene.getActiveCamera();
        if(!camera) throw new Error("Renderer requires an active camera in the scene.");

        const localToWorld = this.transform.getLocalToWorldMatrix();
        const worldToCamera = camera.getWorldToCameraMatrix();
        const cameraToClip = camera.getCameraToClipMatrix();

        if(this.space === RendererSpace.Local) {
            // local -> world -> camera -> clip
            const m = cameraToClip.mul(worldToCamera).mul(localToWorld)
            graphics.setTransformationMatrix(m);
        } else if(this.space === RendererSpace.World) {
            // world -> camera -> clip
            const m = cameraToClip.mul(worldToCamera);
            graphics.setTransformationMatrix(m);
        } else if(this.space === RendererSpace.Camera) {
            // camera -> clip
            graphics.setTransformationMatrix(cameraToClip);
        } else if(this.space === RendererSpace.Clip) {
            // do nothing, Graphics already expects clip space coordinates
            graphics.setTransformationMatrix(Matrix4x4.identity);
        } else if(this.space === RendererSpace.Screen) {
            // screen -> clip
            const screenToClip = graphics.getScreenToClipMatrix();
            graphics.setTransformationMatrix(screenToClip);
        } else {
            throw new Error("Unsupported RendererSpace");
        }
        
    }

}

export default Renderer;