import Ball from "./game/Ball";
import GameObject from "./engine/GameObject";
import StringBuilder from "./utils/StringBuilder";
import Engine from "./engine/Engine";
import ManualPlayer from "./game/ManualPlayer";
import Player from "./game/Player";

class Game {

    engine: Engine = new Engine();

    constructor() {
        const player1 = new ManualPlayer(-450);
        this.engine.addChild(player1);
        
        // const player2 = new Player(0.45);
        // this.engine.addChild(player2);

        const ball = new Ball();
        this.engine.addChild(ball);
        
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
        
            console.log(this.treeAsString());
        };
        setInterval(tick, 10/1000);
        
    }

    treeAsString(): string {
        const helper = (objOrEngine: GameObject|Engine) => {
            stringBuilder.AddLine(objOrEngine.name);
            stringBuilder.Indent();
            for(const child of objOrEngine.children) {
                helper(child);
            }
            stringBuilder.Unindent();
        }
        
        const stringBuilder = new StringBuilder();
        helper(this.engine);
    
        return stringBuilder.Build();
    }

}

export default Game;