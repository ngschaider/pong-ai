import Engine from "../engine/core/Engine";
import Scene from "../engine/core/Scene";
import Vector3 from "../utils/Vector3";
import Background from "./Background";
import Ball from "./Ball";
import ManualPlayer from "./ManualPlayer";
import MyCamera from "./MyCamera";
import Origin from "./Origin";
import StrokedLine2D from "./StrokedLine2D";
import Systems from "./Systems";




class PongScene extends Scene {

    constructor(engine: Engine) {
        super(engine);

        this.addGameObject(Systems);
        this.addGameObject(MyCamera);
        this.addGameObject(ManualPlayer);
        this.addGameObject(StrokedLine2D);
        this.addGameObject(Background);
        // this.addGameObject(FpsLogger);
        const b = this.addGameObject(Ball);
        this.addGameObject(Origin);

        b.rigidbody.velocity = new Vector3(-0.02, 0.01, 0);
    }

}

export default PongScene;