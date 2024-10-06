import Graphics from "../graphics/Graphics";
import Matrix from "../utils/Matrix";
import Matrix3x3 from "../utils/Matrix3x3";
import Vector2 from "../utils/Vector2";
import Component from "./Component";
import RectangleRenderer from "./RectangleRenderer";
import Renderer from "./Renderer";

class RenderSystem extends Component {

    public graphics?: Graphics;

    public update(): void {
        if(!this.graphics) return;

        const isRenderer = (c: Component|null): c is Renderer => c instanceof Renderer;

        const renderers = this.scene.gameObjects
            .map(go => go.getComponent(Renderer))
            .filter(isRenderer)
            .sort((a, b) => {
                if(a.transform.position.z < b.transform.position.z) return -1;
                if(a.transform.position.z > b.transform.position.z) return 1;
                return 0;
            });

        const camera = this.scene.getActiveCamera();
        if(!camera) return;

        for(const renderer of renderers) {
            const rendererMatrix = renderer.transform.getMatrix();
            const worldToScreen = camera.getWorldToScreenMatrix();

            const factor = this.graphics.aspectRatio > 1 ? this.graphics.size.y : this.graphics.size.x;
            const scaleUp = Matrix3x3.scale(new Vector2(factor, factor));
            
            const matrix = scaleUp.multiply(worldToScreen).multiply(rendererMatrix);

            this.graphics.setTransformationMatrix(matrix);
            renderer.render(this.graphics);
        }
    }

}

export default RenderSystem;