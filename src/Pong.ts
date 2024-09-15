import p5 from "p5"
import Player from "./Player"

class Pong {

    player1?: Player
    player2?: Player

    constructor() {

    }

    update() {
        this.player1?.update()
        this.player2?.update()
    }

    draw(p: p5) {
        p.push()
        p.translate(20, p.height / 2)
        this.player1?.draw(p)
        p.pop()
        
        p.push()
        p.translate(p.width - 20, p.height / 2)
        this.player2?.draw(p)
        p.pop()
    }
}

export default Pong;