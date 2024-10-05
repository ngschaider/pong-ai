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
import Color from "./graphics/Color";

const main = async() => {
    const engine = new Engine();

    const go1 = engine.scene.addGameObject(GameObject);
    go1.name = "GameObject 1";
    
    const go2 = engine.scene.addGameObject(GameObject);
    go2.name = "Circle";
    // go2.transform.rotation = 10;
    const c = go2.addComponent(CircleRenderer);
    c.fillColor = Color.red;
    
    const go2Child = engine.scene.addGameObject(GameObject);
    go2Child.name = "GameObject 2 Child";
    go2Child.transform.parent = go2.transform;

    const upperBar = engine.scene.addGameObject(GameObject);
    upperBar.transform.scale = new Vector2(1000, 1);
    upperBar.transform.position = new Vector2(0, 0.5);
    upperBar.addComponent(RectangleRenderer);

    const lowerBar = engine.scene.addGameObject(GameObject);
    lowerBar.transform.scale = new Vector2(1000, 1);
    lowerBar.transform.position = new Vector2(0, 19.5);
    lowerBar.addComponent(RectangleRenderer).fillColor = Color.red;
    
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



