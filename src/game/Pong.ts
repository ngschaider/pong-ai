import Player from "./Player"
import Ball from "./Ball"
import Vector2 from "../utils/Vector2"
import GameObject from "../engine/GameObject"

class Pong extends GameObject {

    player1: Player
    player2: Player
    ball: Ball;

    static maxBallStartSpeed = new Vector2(0.01, 0.01);

    constructor(player1: Player, player2: Player, ball: Ball) {
        super();

        this.name = "Pong";

        this.player1 = player1;
        this.player2 = player2;
        this.ball = ball;
    }
    
    start() {
        this.ball.tf.position = Vector2.Zero;
        this.ball.rb.velocity = Vector2.Random.scalarMul(Pong.maxBallStartSpeed);
        this.player1.rb.position.y = 0;
        this.player2.rb.position.y = 0;
    }

    stop() {
        this.ball.rb.velocity = Vector2.Zero;
        this.ball.tf.position = Vector2.Zero;
        this.player1.rb.position.y = 0;
        this.player2.rb.position.y = 0;
    }
}

export default Pong;