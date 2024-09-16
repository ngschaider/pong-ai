import Player from "./Player"
import Ball from "./Ball"
import Vector2 from "../utils/Vector2"
import GameObject from "../engine/GameObject"

class Pong extends GameObject {

    public player1?: Player
    public player2?: Player
    public ball?: Ball;

    private static maxBallStartSpeed = new Vector2(0.01, 0.01);

    onCreate(): void {
        this.name = "Pong";
    }
    
    private reset() {
        if(this.ball) {
            this.ball.rb.velocity = Vector2.Zero;
            this.ball.transform.position = Vector2.Zero;
        }
        
        if(this.player1) {
            this.player1.transform.position = new Vector2(this.player1.transform.position.x, 0);
        }
        if(this.player2) {
            this.player2.transform.position = new Vector2(this.player2.transform.position.x, 0);
        }
    }

    start() {
        this.reset();

        if(this.ball) {
            this.ball.rb.velocity = Vector2.Random.scalarMul(Pong.maxBallStartSpeed);
        }
    }

    stop() {
        this.reset();
    }
}

export default Pong;