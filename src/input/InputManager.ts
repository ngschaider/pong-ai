import Keys from "./Keys";

class InputManager {

    constructor() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    keydown(e: KeyboardEvent) {
        switch(e.key) {
            case "w": Keys.W = true; break;
            case "a": Keys.A = true; break;
            case "s": Keys.S = true; break;
            case "d": Keys.D = true; break;
        }
    }

    keyup(e: KeyboardEvent) {
        switch(e.key) {
            case "w": Keys.W = false; break;
            case "a": Keys.A = false; break;
            case "s": Keys.S = false; break;
            case "d": Keys.D = false; break;
        }
    }

}

export default InputManager;