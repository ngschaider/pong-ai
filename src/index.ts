import p5 from "p5";
import Keys from "./Keys";
import ManualPlayer from "./ManualPlayer";
import Player from "./Player";
import Pong from "./Pong";


const pong = new Pong();
pong.player1 = new ManualPlayer();
pong.player2 = new Player();

let p = new p5((p: p5) => {
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight - 4);
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight - 4);
        p.stroke(220);
        p.fill(220);
        p.textAlign("left", "top");
        p.textSize(18);
        p.textFont("Consolas");
    };
    
    p.draw = () => {
        p.background(52);

        pong.draw(p);
    }

    p.keyPressed = () => {
        switch(p.key) {
            case "w": Keys.W = true; break;
            case "a": Keys.A = true; break;
            case "s": Keys.S = true; break;
            case "d": Keys.D = true; break;
        }
    }

    p.keyReleased = () => {
        switch(p.key) {
            case "w": Keys.W = false; break;
            case "a": Keys.A = false; break;
            case "s": Keys.S = false; break;
            case "d": Keys.D = false; break;
        }
    }
});

const tick = () => {
    pong.update();
};
setInterval(tick, 60/1000);