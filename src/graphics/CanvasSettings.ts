import RectangleMode from "./RectangleMode";

class CanvasSettings {

    doStroke: boolean = true;
    doFill: boolean = true;
    rectangleMode: RectangleMode = RectangleMode.CORNER
    
    clone(): CanvasSettings {
        const instance = new CanvasSettings();
        instance.doStroke = this.doStroke;
        instance.doFill = this.doFill;
        instance.rectangleMode = this.rectangleMode;
        return instance
    }

}

export default CanvasSettings;