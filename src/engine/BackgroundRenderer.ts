import Color from "../graphics/Color";
import Graphics from "../graphics/Graphics";
import Vector2 from "../utils/Vector2";
import Renderer from "./Renderer";

class BackgroundRenderer extends Renderer {

    color?: Color;

    public update(): void {
        super.update();

        const camera = this.scene.getActiveCamera();
        if(!camera) return;

        this.transform.position = camera.transform.position;
        this.transform.rotation = camera.transform.rotation;
        this.transform.scale = new Vector2(camera.size, camera.size);
    }

    public render(graphics: Graphics): void {
        super.render(graphics);

        if(!this.color) return;

        graphics.fill(this.color);
        graphics.noStroke();
        graphics.rectangle(new Vector2(0, 0), new Vector2(graphics.aspectRatio, 1));
    }
    
}

export default BackgroundRenderer;