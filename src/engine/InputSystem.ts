import Component from "./Component";
import GameObject from "./GameObject";
import Keys from "./Keys";

class InputSystem extends Component {

    keys: Keys = new Keys();

    constructor(gameObject: GameObject) {
        super(gameObject);

        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
    }

    keydown(e: KeyboardEvent) {
        switch(e.key) {
            case "a": this.keys.A = true; break;
            case "b": this.keys.B = true; break;
            case "c": this.keys.C = true; break;
            case "d": this.keys.D = true; break;
            case "e": this.keys.E = true; break;
            case "f": this.keys.F = true; break;
            case "g": this.keys.G = true; break;
            case "h": this.keys.H = true; break;
            case "i": this.keys.I = true; break;
            case "j": this.keys.J = true; break;
            case "k": this.keys.K = true; break;
            case "l": this.keys.L = true; break;
            case "m": this.keys.M = true; break;
            case "n": this.keys.N = true; break;
            case "o": this.keys.O = true; break;
            case "p": this.keys.P = true; break;
            case "q": this.keys.Q = true; break;
            case "r": this.keys.R = true; break;
            case "s": this.keys.S = true; break;
            case "t": this.keys.T = true; break;
            case "u": this.keys.U = true; break;
            case "v": this.keys.V = true; break;
            case "w": this.keys.W = true; break;
            case "x": this.keys.X = true; break;
            case "y": this.keys.Y = true; break;
            case "z": this.keys.Z = true; break;
        }
    }

    keyup(e: KeyboardEvent) {
        switch(e.key) {
            case "a": this.keys.A = false; break;
            case "b": this.keys.B = false; break;
            case "c": this.keys.C = false; break;
            case "d": this.keys.D = false; break;
            case "e": this.keys.E = false; break;
            case "f": this.keys.F = false; break;
            case "g": this.keys.G = false; break;
            case "h": this.keys.H = false; break;
            case "i": this.keys.I = false; break;
            case "j": this.keys.J = false; break;
            case "k": this.keys.K = false; break;
            case "l": this.keys.L = false; break;
            case "m": this.keys.M = false; break;
            case "n": this.keys.N = false; break;
            case "o": this.keys.O = false; break;
            case "p": this.keys.P = false; break;
            case "q": this.keys.Q = false; break;
            case "r": this.keys.R = false; break;
            case "s": this.keys.S = false; break;
            case "t": this.keys.T = false; break;
            case "u": this.keys.U = false; break;
            case "v": this.keys.V = false; break;
            case "w": this.keys.W = false; break;
            case "x": this.keys.X = false; break;
            case "y": this.keys.Y = false; break;
            case "z": this.keys.Z = false; break;
        }
    }

}

export default InputSystem;