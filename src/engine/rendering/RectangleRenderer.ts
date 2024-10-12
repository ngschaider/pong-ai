import Graphics from "../graphics/Graphics";
import Vector2 from "../../utils/Vector2";
import AnchorPoint from "../AnchorPoint";
import Rect from "../Rect";
import Renderer from "./Renderer";

class RectangleRenderer extends Renderer {

    public anchorPoint: AnchorPoint = AnchorPoint.CenterCenter;

    public render(graphics: Graphics): void {
        super.render(graphics);

        const rect = new Rect(Vector2.zero, this.anchorPoint, Vector2.one);

        graphics.rectangle(rect.bottomLeft.toVector3(0), rect.size);


        const c = this.scene.getActiveCamera();
        if(!c) throw new Error("Renderer requires an active camera in the scene.");


        // const local = rect.bottomLeft.toVector3(0);
        // const world = this.transform.localToWorld(local);
        // const camera = c.worldToCamera(world);
        // const clip = c.cameraToClip(camera);

        // console.log(clip);
    }

}

export default RectangleRenderer;