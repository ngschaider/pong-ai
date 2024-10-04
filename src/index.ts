import Engine from "./engine/Engine";
import GameObject from "./engine/GameObject";
import Scene from "./engine/Scene";
import HierarchyLogger from "./game/HierarchyLogger";

const engine = new Engine();

const go1 = engine.scene.addGameObject(GameObject);
go1.name = "GameObject 1";

const go2 = engine.scene.addGameObject(GameObject);
go2.name = "GameObject 2";

const go2Child = engine.scene.addGameObject(GameObject);
go2Child.name = "GameObject 2 Child";
go2Child.transform.parent = go2.transform;

const go3 = engine.scene.addGameObject(GameObject);
go3.name = "GameObject 3";

engine.scene.addGameObject(HierarchyLogger);

engine.start();