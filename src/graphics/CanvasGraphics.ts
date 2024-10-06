import Matrix from "../utils/Matrix";
import Matrix3x3 from "../utils/Matrix3x3";
import Sprite from "../utils/Sprite";
import Vector2 from "../utils/Vector2";
import Color from "./Color";

class CanvasGraphics {

    private el: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private doStroke = false;
    private doFill = false;

    constructor(el: HTMLCanvasElement) {
        this.el = el;
        this.ctx = this.el.getContext("2d") as CanvasRenderingContext2D;

        this.ctx.font = "18px Consolas";
        this.fill(Color.white);
        this.stroke(Color.white);

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    private resize(): void {
        this.el.width = window.innerWidth
        this.el.height = window.innerHeight - 4;
    }

    get size(): Vector2 {
        return new Vector2(this.el.width, this.el.height);
    }

    get aspectRatio(): number {
        return this.size.x / this.size.y;
    }

    public setTransformationMatrix(matrix: Matrix): void {
        if(matrix.width !== 3 || matrix.height !== 3) {
            throw new Error("Transformation matrix must be of dimension 3x3.");
        }

        // in canvas, down is y-positive. but we want y-positive to point up, so we scale-y by -1 
        // to flip the screen and translate-y by the height to move it down into the viewport again
        // const flipY = Matrix3x3.scale(new Vector2(1, -1));
        // const moveDown = Matrix3x3.translate(new Vector2(0, -this.size.y));
        
        // matrix = flipY.multiply(moveDown).multiply(matrix);

        this.ctx.setTransform({
            a: matrix.values[0],
            c: matrix.values[1],
            e: matrix.values[2],
            b: matrix.values[3],
            d: matrix.values[4],
            f: matrix.values[5],
        });
    }

    public fill(color: Color): void {
        this.doFill = true;
        this.ctx.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")"
    }

    public stroke(color: Color): void {
        this.doStroke = true;
        this.ctx.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")"
    }

    public lineWidth(lineWidth: number) {
        this.ctx.lineWidth = lineWidth;
    }

    public noFill(): void {
        this.doFill = false;
    }

    public noStroke(): void {
        this.doStroke = false;
    }

    public circle(position: Vector2, diameter: number): void {
        this.ctx.beginPath();

        this.ctx.ellipse(position.x, position.x, diameter/2, diameter/2, 0, 0, 2*Math.PI);

        if(this.doFill) {
            this.ctx.fill();
        }
        if(this.doStroke) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
    }

    public rectangle(position: Vector2, size: Vector2): void {
        this.ctx.beginPath();

        this.ctx.rect(position.x, position.y, size.x, size.y);
        
        if(this.doFill) {
            this.ctx.fill();
        }
        if(this.doStroke) {
            this.ctx.stroke();
        }
        
        this.ctx.closePath();
    }

    public line(start: Vector2, end: Vector2): void {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public image(position: Vector2, sprite: Sprite): void {
        this.ctx.drawImage(sprite.bitmap, position.x, position.y);
    }

    public text(position: Vector2, text: string): void {
        this.ctx.fillText(text, position.x, position.y);
    }

}

export default CanvasGraphics;