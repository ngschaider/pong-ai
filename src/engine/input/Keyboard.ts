import MyEvent from "../../utils/MyEvent";
import Component from "../core/Component";
import GameObject from "../core/GameObject";

export enum KeyCode {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    G = "g",
    H = "h",
    I = "i",
    J = "j",
    K = "k",
    L = "l",
    M = "m",
    N = "n",
    O = "o",
    P = "p",
    Q = "q",
    R = "r",
    S = "s",
    T = "t",
    U = "u",
    V = "v",
    W = "w",
    X = "x",
    Y = "y",
    Z = "z",
    One = "1",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Zero = "0",
    F1 = "F1",
    F2 = "F2",
    F3 = "F3",
    F4 = "F4",
    F5 = "F5",
    F6 = "F6",
    F7 = "F7",
    F8 = "F8",
    F9 = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    GermanS = "ß",
    GermanU = "ü",
    GermanA = "ä",
    GermanO = "ö",
    Underline = "_",
    Backspace = "Backspace",
    Degree = "°",
    QuestionMark = "?",
    Squared = "²",
    Cubed = "³",
    ClosingCurlyParentheses = "}",
    OpeningCurlyParantheses = "{",
    OpeningSquareBracket = "[",
    ClosingSquareBrakcet = "]",
    Mu = "µ",
    Euro = "€",
    Quote = "\"",
    Equals = "=",
    Shift = "Shift",
    DoublePoint = ":",
    Semicolon = ";",
    ExclamationMark = "!",
    Backslash = "\\",
    Paragraph = "§",
    Dollar = "$",
    Percent = "%",
    Ampersand = "&",
    OpeningParantheses = "(",
    ClosingParentheses = ")",
    Alt = "Alt",
    Dead = "Dead",
    AltGraph = "AltGraph",
    CapsLock = "CapsLock",
    Tab = "Tab",
    ArrowLeft = "ArrowLeft",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowDown = "ArrowDown",
    NumLock = "NumLock",
    Enter = "Enter",
    Pause = "Pause",
    ScrollLock = "ScrollLock",
    PrintScreen = "PrintScreen",
    ContextMenu = "ContextMenu",
    Control = "Control",
    Escape = "Escape",
    Delete = "Delete",
    End = "End",
    PageDown = "PageDown",
    PageUp = "PageUp",
    Home = "Home",
    Insert = "Insert",
    Comma = "Comma",
    Decimal = ".",
    Minus = "-",
    Plus = "+",
    Asterisk = "*",
    Slash = "/",
    Space = " ",
}

class Key {
    constructor() {
        this.onKeyDown.on(() => {
            this.state = true;
        });

        this.onKeyUp.on(() => {
            this.state = false;
        });
    }

    state: boolean = false;

    onKeyDown: MyEvent = new MyEvent();
    onKeyUp: MyEvent = new MyEvent();
}

class Keyboard extends Component {

    public readonly keys: Map<KeyCode, Key> = new Map();

    constructor(gameObject: GameObject) {
        super(gameObject);

        for(const keyCode of Object.values(KeyCode)) {
            this.keys.set(keyCode, new Key());
        }

        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
    }

    isKeyPressed(keyCode: KeyCode): boolean {
        const key = this.keys.get(keyCode);
        if(!key) throw new Error("Unsupported KeyCode supplied.");
        return key.state;
    }

    private keydown(e: KeyboardEvent) {
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

        const key = this.keys.get(k as KeyCode);
        if(!key) throw new Error("Unsupported key pressed: " + k);

        key.onKeyDown.emit()
        key.state = true;
    }

    private keyup(e: KeyboardEvent) {
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const key = this.keys.get(k as KeyCode);
        if(!key) throw new Error("Unsupported key released: " + k);
        
        key.onKeyUp.emit()
        key.state = false;
    }

}

export default Keyboard;