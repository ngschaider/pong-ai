import CanvasGraphics from "../graphics/CanvasGraphics";
import Graphics from "../graphics/Graphics";
import Matrix3x3 from "../../utils/Matrix3x3";
import Vector2 from "../../utils/Vector2";
import Component from "../core/Component";
import GameObject from "../core/GameObject";
import Renderer, { RendererSpace } from "./Renderer";
import WebGlGraphics from "../graphics/WebGlGraphics";

class RenderSystem extends Component {

    public graphics: Graphics;

    constructor(gameObject: GameObject) {
        super(gameObject);

        this.graphics = new WebGlGraphics(this.canvasEl);
    }

    public canvasEl: HTMLCanvasElement = document.getElementById("root") as HTMLCanvasElement;

    public get elementPosition(): Vector2 {
        return new Vector2(this.canvasEl.offsetLeft, this.canvasEl.offsetTop);
    }

    public update(): void {
        if(!this.graphics) return;

        const renderers = this.scene.getAllComponents(Renderer).sort((a, b) => {
            if(a.transform.renderOrder < b.transform.renderOrder) return -1;
            if(a.transform.renderOrder > b.transform.renderOrder) return 1;
            return 0;
        });

        for(const renderer of renderers) {
            renderer.render(this.graphics);
        }

        // const camera = this.scene.getActiveCamera();
        // if(!camera) return;

        // const worldToScreen = this.getWorldToScreenMatrix();
        // const clipToScreen = this.getClipToScreenMatrix();

        // for(const renderer of renderers) {
        //     if(renderer.space === RendererSpace.World) {
        //         const transformMatrix = renderer.transform.getLocalToWorldMatrix()
        //         const matrix = transformMatrix.multiply(worldToScreen);
        //         this.graphics.setTransformationMatrix(matrix);
        //     } else if(renderer.space === RendererSpace.Local) {
        //         const localToWorld = renderer.transform.getLocalToWorldMatrix();
        //         const localToScreen = worldToScreen.multiply(localToWorld);
        //         this.graphics.setTransformationMatrix(localToScreen);
        //     } else if(renderer.space === RendererSpace.Clip) {
        //         const transformMatrix = renderer.transform.getLocalToWorldMatrix()
        //         this.graphics.setTransformationMatrix(transformMatrix.multiply(clipToScreen));
        //     } else {
        //         throw new Error("Encountered unsupported RendererSpace")
        //     }

        //     renderer.render(this.graphics);
        // }
    }

    // public getClipToScreenMatrix(): Matrix3x3 {
    //     const factor = this.graphics.aspectRatio > 1 ? this.graphics.size.y : this.graphics.size.x;
    //     return Matrix3x3.scale(new Vector2(factor, factor));
    // }

    // public clipToScreen(vec: Vector2): Vector2 {
    //     return vec.applyMatrix(this.getClipToScreenMatrix());
    // }

    // public getScreenToClipMatrix(): Matrix3x3 {
    //     return this.getClipToScreenMatrix().invert();
    // }

    // public screenToClip(vec: Vector2): Vector2 {
    //     return vec.applyMatrix(this.getScreenToClipMatrix());
    // }

    // public getWorldToScreenMatrix(): Matrix3x3 {
    //     const camera = this.scene.getActiveCamera();
    //     if(!camera) throw new Error();

    //     const worldToClip = camera.getWorldToCameraMatrix();

    //     return this.getClipToScreenMatrix().multiply(worldToClip);
    // }

    // public worldToScreen(vec: Vector2): Vector2 {
    //     return vec.applyMatrix(this.getWorldToScreenMatrix());
    // }

    // public getScreenToWorldMatrix(): Matrix3x3 {
    //     return this.getWorldToScreenMatrix().invert();
    // }

    // public screenToWorld(vec: Vector2): Vector2 {
    //     return vec.applyMatrix(this.getScreenToWorldMatrix());
    // }

}

export default RenderSystem;
