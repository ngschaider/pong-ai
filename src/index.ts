import Engine from "./engine/Engine";
import PhysicsTestScene from "./game/PhysicsTestScene";
import PongScene from "./game/PongScene";
import SimpleTestScene from "./game/SimpleTestScene";

const engine = new Engine();

// engine.switchScene(PongScene);
// engine.switchScene(PhysicsTestScene);
engine.switchScene(SimpleTestScene);

engine.start();
