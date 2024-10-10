import Engine from "../engine/core/Engine";
import GameObject from "../engine/core/GameObject";
import Scene from "../engine/core/Scene";
import RectangleRenderer from "../engine/rendering/RectangleRenderer";
import Color from "../utils/Color";
import MyCamera from "./MyCamera";
import Origin from "./Origin";
import Systems from "./Systems";

class SimpleTestScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        // const go = this.addGameObject(GameObject);
        // const sr = go.addComponent(SpriteRenderer);

        // Sprite.fromUrl("https://placehold.co/600x400/png").then(sprite => {
        //     sr.sprite = sprite;
        // });
        // go.transform.scale = new Vector2(0.01, 0.01);


        const go = this.addGameObject(GameObject);
        const rr = go.addComponent(RectangleRenderer);
        rr.fillColor = Color.red;

        this.addGameObject(Systems);
        this.addGameObject(MyCamera);

        this.addGameObject(Origin);
    }
    

}

export default SimpleTestScene;