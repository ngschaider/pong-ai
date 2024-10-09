import Debug from "./engine/Debug";
import Engine from "./engine/Engine";
import PhysicsTestScene from "./game/PhysicsTestScene";

const engine = new Engine();

// engine.switchScene(PongScene);
engine.switchScene(PhysicsTestScene);
// engine.switchScene(SimpleTestScene);

export const debug = new Debug(engine);

engine.start();
