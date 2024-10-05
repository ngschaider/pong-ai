import Engine from "./engine/Engine";
import PongScene from "./game/PongScene";

const engine = new Engine();

engine.switchScene(PongScene);

engine.start();
