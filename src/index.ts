import Engine from "./engine/Engine";
import PhysicsTestScene from "./game/PhysicsTestScene";

const engine = new Engine();

// engine.switchScene(PongScene);
engine.switchScene(PhysicsTestScene);
// engine.switchScene(SimpleTestScene);

engine.start();
