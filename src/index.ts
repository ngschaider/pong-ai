import CircleRenderer from "./engine/CircleRenderer";
import Engine from "./engine/Engine";
import GameObject from "./engine/GameObject";
import RectangleRenderer, { AnchorPoint } from "./engine/RectangleRenderer";
import RenderSystem from "./engine/RenderSystem";
import HierarchyLogger from "./game/HierarchyLogger";
import Graphics from "./graphics/Graphics";
import SpriteRenderer from "./engine/SpriteRenderer";
import Sprite from "./utils/Sprite";
import Vector2 from "./utils/Vector2";
import Camera from "./engine/Camera";

const main = async() => {
    const engine = new Engine();

    const go1 = engine.scene.addGameObject(GameObject);
    go1.name = "GameObject 1";
    
    const go2 = engine.scene.addGameObject(GameObject);
    go2.name = "Circle";
    // go2.transform.rotation = 10;
    go2.addComponent(CircleRenderer);
    
    const go2Child = engine.scene.addGameObject(GameObject);
    go2Child.name = "GameObject 2 Child";
    go2Child.transform.parent = go2.transform;

    
    const go3 = engine.scene.addGameObject(GameObject);
    go3.transform.parent = go2.transform;
    go3.name = "Rectangle";
    
    const r = go3.addComponent(RectangleRenderer);
    r.anchorPoint = AnchorPoint.TopLeft;

    go3.transform.position = new Vector2(11, 11);
    go3.transform.scale = new Vector2(19, 19);
    go3.transform.rotation = 0;
    
    // engine.scene.addGameObject(HierarchyLogger);
    
    const renderSystemObj = engine.scene.addGameObject(GameObject);
    const renderSystem = renderSystemObj.addComponent(RenderSystem);
    renderSystem.graphics = new Graphics();

    const camera = engine.scene.addGameObject(GameObject);
    const cam = camera.addComponent(Camera);
    cam.size = 20;
    
    // const background = engine.scene.addGameObject(GameObject);
    // const spriteRenderer = background.addComponent(SpriteRenderer);
    // spriteRenderer.sprite = await Sprite.fromUrl("https://t4.ftcdn.net/jpg/02/40/93/69/360_F_240936998_2wBjelIOKw1vGKkfOpCjiA25waBAiLeb.jpg");
    // background.transform.position = new Vector2(400, 400);

    engine.start();
}
main();



