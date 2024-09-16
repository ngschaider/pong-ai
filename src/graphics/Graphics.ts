import { Matrix3x3 } from "../engine/Matrix2x2";
import Vector2 from "../utils/Vector2";
import CanvasSettings from "./CanvasSettings";
import Color from "./Color";
import RectangleMode from "./RectangleMode";

class Graphics {

    private el: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private savedSettings: CanvasSettings[] = []
    private settings: CanvasSettings = new CanvasSettings();

    constructor() {
        this.el = document.getElementById("root") as HTMLCanvasElement;
        this.ctx = this.el.getContext("2d") as CanvasRenderingContext2D;

        this.ctx.font = "18px Consolas";
        this.fill(Color.White);
        this.stroke(Color.White);

        window.addEventListener("resize", this.resize);
        this.resize();
    }

    private resize() {
        this.el.width = window.innerWidth
        this.el.height = window.innerHeight - 4;
    }

    get size(): Vector2 {
        return new Vector2(this.el.width, this.el.height);
    }

    public save() {
        this.savedSettings.push(this.settings);
        this.settings = this.settings.clone();
    }
    public restore() {
        const lastSaved = this.savedSettings.pop();
        if(lastSaved === undefined) {
            throw new Error("More restore() calls than save() calls encountered.");
        }

        this.settings = lastSaved;
    }

    public setTransformationMatrix(matrix: Matrix3x3) {
        this.ctx.setTransform({
            a: matrix.values[0],
            c: matrix.values[1],
            e: matrix.values[2],
            b: matrix.values[3],
            d: matrix.values[4],
            f: matrix.values[5],
        });
    }

    public fill(color: Color) {
        this.settings.doFill = true;
        this.ctx.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")"
    }
    public stroke(color: Color) {
        this.settings.doStroke = true;
        this.ctx.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")"
    }

    public noFill() {
        this.settings.doFill = false;
    }
    public noStroke() {
        this.settings.doStroke = false;
    }

    public circle(position: Vector2, diameter: number) {
        this.ctx.beginPath();

        this.ctx.ellipse(position.x, position.x, diameter/2, diameter/2, 0, 0, 2*Math.PI);

        if(this.settings.doFill) {
            this.ctx.fill();
        }
        if(this.settings.doStroke) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
    }

    public rectangle(position: Vector2, size: Vector2) {
        this.ctx.beginPath();

        this.ctx.rect(position.x - size.x/2, position.y - size.y/2, size.x, size.y);
        
        if(this.settings.doFill) {
            this.ctx.fill();
        }
        if(this.settings.doStroke) {
            this.ctx.stroke();
        }
        
        this.ctx.closePath();
    }

    public text(position: Vector2, text: string) {
        this.ctx.fillText(text, position.x, position.y);
    }

}

export default Graphics;