import Background from "./Background";
import Camera from "../engine/Camera";
import Engine from "../engine/Engine";
import GameObject from "../engine/GameObject";
import InputSystem from "../engine/InputSystem";
import RenderSystem from "../engine/RenderSystem";
import Scene from "../engine/Scene";
import Color from "../graphics/Color";
import Vector3 from "../utils/Vector3";
import ManualPlayer from "./ManualPlayer";
import StrokedLine from "./StrokedLine";
import CanvasGraphics from "../graphics/CanvasGraphics";
import CircleRenderer from "../engine/CircleRenderer";
import Vector2 from "../utils/Vector2";
import RigidBody from "../engine/RigidBody";
import CircleCollider from "../engine/CircleCollider";
import CollisionSystem from "../engine/CollisionSystem";
import Ball from "./Ball";
import MyCamera from "./MyCamera";
import Origin from "./Origin";
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
        this.addGameObject(Ball);
        this.addGameObject(Origin);
    }

}

export default PongScene;