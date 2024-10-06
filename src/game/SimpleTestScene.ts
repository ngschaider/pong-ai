import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import RectangleRenderer from "../engine/RectangleRenderer";
import Scene from "../engine/Scene";
import SpriteRenderer from "../engine/SpriteRenderer";
import Color from "../graphics/Color";
import Sprite from "../utils/Sprite";
import Vector2 from "../utils/Vector2";
import Vector3 from "../utils/Vector3";
import Background from "./Background";
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