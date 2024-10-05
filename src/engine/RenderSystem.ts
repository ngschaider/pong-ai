import Graphics from "../graphics/Graphics";
import Matrix from "../utils/Matrix";
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
            const cameraMatrix = camera.transform.getMatrix();
            
            const factor = this.graphics.size.y / camera.size;
            const scale = Matrix.create3x3(
                factor, 0, 0, 
                0, factor, 0, 
                0, 0, 1
            );

            const matrix = scale.multiply(cameraMatrix.invert()).multiply(rendererMatrix);

            this.graphics.setTransformationMatrix(matrix);
            renderer.render(this.graphics);
        }
    }

}

export default RenderSystem;