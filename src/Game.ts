import Ball from "./game/Ball";
import GameObject from "./engine/GameObject";
import StringBuilder from "./utils/StringBuilder";
import Engine from "./engine/Engine";
import ManualPlayer from "./game/ManualPlayer";
import Player from "./game/Player";
import Vector2 from "./utils/Vector2";

class Game {

    engine: Engine = new Engine();

    constructor() {
        const player1 = this.engine.createGameObject(ManualPlayer);
        player1.transform.position = new Vector2(-450, 0);

        const player2 = this.engine.createGameObject(Player);
        player2.transform.position = new Vector2(450, 0);

        this.engine.createGameObject(Ball);
                
        // const pong = new Pong(player1, player2, ball);
        // engine.addChild(pong);
    }

    start() {
        const draw = () => {
            this.engine.draw();
        
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
        
        const tick = () => {
            this.engine.update();
        };
        setInterval(tick, 10/1000);
    }

}

export default Game;