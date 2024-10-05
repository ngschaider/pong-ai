import Graphics from "../graphics/Graphics";
import Component from "./Component";
import Renderer from "./Renderer";

class RenderSystem extends Component {

    public graphics?: Graphics;

    public update(): void {
        if(!this.graphics) return;

        const isRenderer = (c: Component|null): c is Renderer => c instanceof Renderer;

        const renderers = this.scene.gameObjects
            .map(go => go.getComponent(Renderer))
            .filter(isRenderer);

        const camera = this.scene.getActiveCamera();
        if(!camera) return;

        for(const renderer of renderers) {
            const rendererMatrix = renderer.transform.getMatrix();

            const matrix = camera.getMatrix().invert().multiply(rendererMatrix);

            this.graphics.setTransformationMatrix(matrix);
            renderer.render(this.graphics);
        }
    }

}

export default RenderSystem;