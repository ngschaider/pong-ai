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

    private keydown(e: KeyboardEvent) {
        switch(e.key.toLowerCase()) {
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
            case "1": this.keys.One = true; break;
            case "2": this.keys.Two = true; break;
            case "3": this.keys.Three = true; break;
            case "4": this.keys.Four = true; break;
            case "5": this.keys.Five = true; break;
            case "6": this.keys.Six = true; break;
            case "7": this.keys.Seven = true; break;
            case "8": this.keys.Eight = true; break;
            case "9": this.keys.Nine = true; break;
            case "0": this.keys.Zero = true; break;
            case "F1": this.keys.F1 = true; break;
            case "F2": this.keys.F2 = true; break;
            case "F3": this.keys.F3 = true; break;
            case "F4": this.keys.F4 = true; break;
            case "F5": this.keys.F5 = true; break;
            case "F6": this.keys.F6 = true; break;
            case "F7": this.keys.F7 = true; break;
            case "F8": this.keys.F8 = true; break;
            case "F9": this.keys.F9 = true; break;
            case "F10": this.keys.F10 = true; break;
            case "F11": this.keys.F11 = true; break;
            case "F12": this.keys.F12 = true; break;
            case "Shift": this.keys.Shift = true; break;
            case "Control": this.keys.Control = true; break;
            case "AltGraph": this.keys.AltGraph = true; break;
            case "CapsLock": this.keys.AltGraph = true; break;
            case "Tab": this.keys.AltGraph = true; break;
            case "ArrowLeft": this.keys.ArrowLeft = true; break;
            case "ArrowUp": this.keys.ArrowUp = true; break;
            case "ArrowRight": this.keys.ArrowRight = true; break;
            case "ArrowDown": this.keys.ArrowDown = true; break;
            case "NumLock": this.keys.NumLock = true; break;
            case "Enter": this.keys.Enter = true; break;
            case "Pause": this.keys.Pause = true; break;
            case "ScrollLock": this.keys.ScrollLock = true; break;
            case "Escape": this.keys.Escape = true; break;
            case "Delete": this.keys.Delete = true; break;
            case "End": this.keys.End = true; break;
            case "PageDown": this.keys.PageDown = true; break;
            case "PageUp": this.keys.PageUp = true; break;
            case "Home": this.keys.Home = true; break;
            case "Insert": this.keys.Insert = true; break;
            case ",": this.keys.Comma = true; break;
            case ".": this.keys.Decimal = true; break;
            case "-": this.keys.Minus = true; break;
            case "+": this.keys.Plus = true; break;
            case "*": this.keys.Asterisk = true; break;
        }
    }

    private keyup(e: KeyboardEvent) {
        switch(e.key.toLowerCase()) {
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
            case "1": this.keys.One = false; break;
            case "2": this.keys.Two = false; break;
            case "3": this.keys.Three = false; break;
            case "4": this.keys.Four = false; break;
            case "5": this.keys.Five = false; break;
            case "6": this.keys.Six = false; break;
            case "7": this.keys.Seven = false; break;
            case "8": this.keys.Eight = false; break;
            case "9": this.keys.Nine = false; break;
            case "0": this.keys.Zero = false; break;
            case "F1": this.keys.F1 = false; break;
            case "F2": this.keys.F2 = false; break;
            case "F3": this.keys.F3 = false; break;
            case "F4": this.keys.F4 = false; break;
            case "F5": this.keys.F5 = false; break;
            case "F6": this.keys.F6 = false; break;
            case "F7": this.keys.F7 = false; break;
            case "F8": this.keys.F8 = false; break;
            case "F9": this.keys.F9 = false; break;
            case "F10": this.keys.F10 = false; break;
            case "F11": this.keys.F11 = false; break;
            case "F12": this.keys.F12 = false; break;
            case "Shift": this.keys.Shift = false; break;
            case "Control": this.keys.Control = false; break;
            case "AltGraph": this.keys.AltGraph = false; break;
            case "CapsLock": this.keys.CapsLock = false; break;
            case "Tab": this.keys.Tab = false; break;
            case "ArrowLeft": this.keys.ArrowLeft = false; break;
            case "ArrowUp": this.keys.ArrowUp = false; break;
            case "ArrowRight": this.keys.ArrowRight = false; break;
            case "ArrowDown": this.keys.ArrowDown = false; break;
            case "NumLock": this.keys.NumLock = false; break;
            case "Enter": this.keys.Enter = false; break;
            case "Pause": this.keys.Pause = false; break;
            case "ScrollLock": this.keys.ScrollLock = false; break;
            case "Escape": this.keys.Escape = false; break;
            case "Delete": this.keys.Delete = false; break;
            case "End": this.keys.End = false; break;
            case "PageDown": this.keys.PageDown = false; break;
            case "PageUp": this.keys.PageUp = false; break;
            case "Home": this.keys.Home = false; break;
            case "Insert": this.keys.Insert = false; break;
            case ",": this.keys.Comma = false; break;
            case ".": this.keys.Decimal = false; break;
            case "-": this.keys.Minus = false; break;
            case "+": this.keys.Plus = false; break;
            case "*": this.keys.Asterisk = false; break;
        }
    }

}

export default InputSystem;