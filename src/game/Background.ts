import Color from "../utils/Color";
import Scene from "../engine/core/Scene";
import Vector2 from "../utils/Vector2";
import GameObject from "../engine/core/GameObject";
import RectangleRenderer from "../engine/rendering/RectangleRenderer";

class Background extends GameObject {

    constructor(scene: Scene) {
        super(scene);

        this.name = "Background";

        const r = this.addComponent(RectangleRenderer);
        r.fillColor = Color.black;
    }

    public update(): void {
        super.update();

        const camera = this.scene.getActiveCamera();
        if(!camera) return;


        this.transform.position = new Vector2(camera.transform.position.x, camera.transform.position.y);
        this.transform.renderOrder = -10;
        this.transform.position = this.transform.position;
        this.transform.rotation = camera.transform.rotation;
        this.transform.scale = camera.size;
    }
    
}

export default Background;