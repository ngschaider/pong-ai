import Color from "../graphics/Color";
import Vector3 from "../utils/Vector3";
import GameObject from "../engine/GameObject";
import RectangleRenderer from "../engine/RectangleRenderer";
import Scene from "../engine/Scene";

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


        this.transform.position = new Vector3(camera.transform.position.x, camera.transform.position.y, -10);
        this.transform.position = this.transform.position;
        this.transform.rotation = camera.transform.rotation;
        this.transform.scale = camera.size;
    }
    
}

export default Background;