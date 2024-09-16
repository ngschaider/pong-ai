import Engine from "./engine/Engine";
import GameObject from "./engine/GameObject";
import RectangleObject from "./engine/RectangleObject";
import Ball from "./game/Ball";
import ManualPlayer from "./game/ManualPlayer";
import Player from "./game/Player";
import Pong from "./game/Pong";
import TopBar from "./game/TopBar";
import Vector2 from "./utils/Vector2";

const engine = new Engine();

engine.createGameObject(TopBar);

const root = engine.createGameObject(GameObject);
root.transform.position = new Vector2(window.innerWidth/2, window.innerHeight/2);

// const rect = engine.createGameObject(RectangleObject);
// rect.transform.position = new Vector2(500, 500);
// rect.transform.scale = new Vector2(2, 2);

const player1 = engine.createGameObject(Player, root.transform);
player1.transform.position = new Vector2(-450, 0);
player1.name = "Player 1";
player1.addComponent(ManualPlayer);
        
// const player2 = engine.createGameObject(Player);
// player2.transform.position = new Vector2(450, 0);

// engine.createGameObject(Ball);

// const test = engine.createGameObject(RectangleObject);
// test.transform.position = new Vector2(200, 100);
// console.log(test.transform.getTransformationMatrix());
        
// const pong = new Pong(player1, player2, ball);
// engine.addChild(pong);

engine.start();