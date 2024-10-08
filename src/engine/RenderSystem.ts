import CanvasGraphics from "../graphics/CanvasGraphics";
import Graphics from "../graphics/Graphics";
import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Component from "./Component";
import GameObject from "./GameObject";
import Renderer from "./Renderer";

class RenderSystem extends Component {

    public graphics: Graphics;

    constructor(gameObject: GameObject) {
        super(gameObject);

        this.graphics = new CanvasGraphics(this.canvasEl);
    }

    public canvasEl: HTMLCanvasElement = document.getElementById("root") as HTMLCanvasElement;

    public get elementPosition(): Vector2 {
        return new Vector2(this.canvasEl.offsetLeft, this.canvasEl.offsetTop);
    }

    public update(): void {
        if(!this.graphics) return;

        const renderers = this.scene.getAllComponents(Renderer)
            .sort((a, b) => {
                if(a.transform.renderOrder < b.transform.renderOrder) return -1;
                if(a.transform.renderOrder > b.transform.renderOrder) return 1;
                return 0;
            });

        const camera = this.scene.getActiveCamera();
        if(!camera) return;

        const worldToScreen = this.getWorldToScreenMatrix();

        for(const renderer of renderers) {
            const transformMatrix = renderer.transform.getMatrix();

            const matrix = worldToScreen.multiply(transformMatrix);
            this.graphics.setTransformationMatrix(matrix);

            renderer.render(this.graphics);
        }
    }

    public getClipToScreenMatrix(): Matrix3x3 {
        const factor = this.graphics.aspectRatio > 1 ? this.graphics.size.y : this.graphics.size.x;
        return Matrix3x3.scale(new Vector2(factor, factor));
    }

    public clipToScreen(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getClipToScreenMatrix());
    }

    public getScreenToClipMatrix(): Matrix3x3 {
        return this.getClipToScreenMatrix().invert();
    }

    public screenToClip(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getScreenToClipMatrix());
    }

    public getWorldToScreenMatrix(): Matrix3x3 {
        const camera = this.scene.getActiveCamera();
        if(!camera) throw new Error();

        const worldToClip = camera.getWorldToClipMatrix();

        return this.getClipToScreenMatrix().multiply(worldToClip);
    }

    public worldToScreen(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getWorldToScreenMatrix());
    }

    public getScreenToWorldMatrix(): Matrix3x3 {
        return this.getWorldToScreenMatrix().invert();
    }

    public screenToWorld(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getScreenToWorldMatrix());
    }

}

export default RenderSystem;
