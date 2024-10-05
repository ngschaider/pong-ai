import CircleRenderer from "./engine/CircleRenderer";
import Engine from "./engine/Engine";
import GameObject from "./engine/GameObject";
import RectangleRenderer from "./engine/RectangleRenderer";
import RenderSystem from "./engine/RenderSystem";
import Graphics from "./graphics/Graphics";
import Vector2 from "./utils/Vector2";
import Camera from "./engine/Camera";
import Color from "./graphics/Color";
import BackgroundRenderer from "./engine/BackgroundRenderer";
import Vector3 from "./utils/Vector3";

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
    upperBar.transform.position = new Vector3(0, 1);
    upperBar.addComponent(RectangleRenderer);

    const lowerBar = engine.scene.addGameObject(GameObject);
    lowerBar.transform.scale = new Vector2(1000, 1);
    lowerBar.transform.position = new Vector3(0, 19);
    lowerBar.addComponent(RectangleRenderer).fillColor = Color.red;
    
    const background = engine.scene.addGameObject(GameObject);
    background.transform.position = new Vector3(0, 0, -1);
    const bg = background.addComponent(BackgroundRenderer);
    bg.color = Color.gray;
    
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



