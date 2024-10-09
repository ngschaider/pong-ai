import MyEvent from "../utils/MyEvent";
import Vector2 from "../utils/Vector2";
import Component from "./Component";
import GameObject from "./GameObject";
import RenderSystem from "./RenderSystem";

class Mouse extends Component {

    buttonLeft: boolean = false;
    buttonMiddle: boolean = false;
    buttonRight: boolean = false;
    button4: boolean = false;
    button5: boolean = false;
    mousePosition: Vector2 = new Vector2(-1, -1);

    onButtonLeftClicked = new MyEvent();
    onButtonMiddleClicked = new MyEvent();
    onButtonRightClicked = new MyEvent();
    onButton4Clicked = new MyEvent();
    onButton5Clicked = new MyEvent();
    onMousePositionChanged = new MyEvent();

    constructor(gameObject: GameObject) {
        super(gameObject);

        window.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));

        window.addEventListener("mousemove", this.mousemove.bind(this));
    }

    private mousemove(e: MouseEvent) {
        const page = new Vector2(e.pageX, e.pageY);
        
        const renderSystem = this.scene.getComponent(RenderSystem)
        
        if(renderSystem) {
            const screen = page.add(renderSystem.elementPosition);
            this.mousePosition = renderSystem.screenToWorld(screen);
        } else {
            this.mousePosition = new Vector2(-1, -1);
        }

        this.onMousePositionChanged.emit();
    }

    private mousedown(e: MouseEvent) {
        switch(e.button) {
            case 0: this.buttonLeft = true; this.onButtonLeftClicked.emit(); break;
            case 1: this.buttonMiddle = true; this.onButtonMiddleClicked.emit(); break;
            case 2: this.buttonRight = true; this.onButtonRightClicked.emit(); break;
            case 3: this.button4 = true; break;
            case 4: this.button5 = true; break;
        }
    }

    private mouseup(e: MouseEvent) {
        switch(e.button) {
            case 0: this.buttonLeft = false; break;
            case 1: this.buttonMiddle = false; break;
            case 2: this.buttonRight = false; break;
            case 3: this.button4 = false; break;
            case 4: this.button5 = false; break;
        }
    }

}

export default Mouse;