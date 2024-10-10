import Engine from "../engine/core/Engine";
import Scene from "../engine/core/Scene";
import Vector2 from "../utils/Vector2";
import Background from "./Background";
import Ball from "./Ball";
import ManualPlayer from "./ManualPlayer";
import MyCamera from "./MyCamera";
import Origin from "./Origin";
import StrokedLine from "./StrokedLine";
import Systems from "./Systems";




class PongScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        this.addGameObject(Systems);
        this.addGameObject(MyCamera);
        this.addGameObject(ManualPlayer);
        this.addGameObject(StrokedLine);
        this.addGameObject(Background);
        // this.addGameObject(FpsLogger);
        const b = this.addGameObject(Ball);
        this.addGameObject(Origin);

        b.rigidbody.velocity = new Vector2(-0.02, 0.01);
    }

}

export default PongScene;