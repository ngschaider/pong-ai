import p5 from "p5";

class Player {

    velocity: number = 0;
    position: number = 0;

    height: number = 200;
    width: number = 20;

    update() {
        this.position += this.velocity

        this.position = Math.min(1, this.position)
        this.position = Math.max(-1, this.position)
    }

    draw(p: p5) {
        p.fill(255, 255, 255);
        p.noStroke();
        p.rect(-this.width/2, -this.height/2 + this.position * p.height, this.width, this.height);
    }

}

export default Player;