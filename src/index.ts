import Engine from "./engine/Engine";
import PhysicsTestScene from "./game/PhysicsTestScene";
import PongScene from "./game/PongScene";

const engine = new Engine();

// engine.switchScene(PongScene);
engine.switchScene(PhysicsTestScene);

engine.start();
