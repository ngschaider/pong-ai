import Component from "./Component";
import Renderer from "./Renderer";

class RenderSystem extends Component {

    public Graphics graphics;

    public update(): void {
        const getRenderer = (c: Component): c is Renderer => c instanceof Renderer;

        const renderers = this.scene.gameObjects
            .map(go => go.getComponent(Renderer))
            .filter(isRenderer);

        for(const renderer of renderers) {
            renderer.render();
        }
    }

}

export default RenderSystem;