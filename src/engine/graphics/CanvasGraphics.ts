import Color from "../../utils/Color";
import Matrix3x3 from "../../utils/Matrix3x3";
import Matrix4x4 from "../../utils/Matrix4x4";
import Sprite from "../../utils/Sprite";
import Vector2 from "../../utils/Vector2";
import Vector3 from "../../utils/Vector3";
import Graphics from "./Graphics";

class CanvasGraphics implements Graphics {

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

    getScreenToClipMatrix(): Matrix4x4 {
        return this.getClipToScreenMatrix().invert();
    }

    screenToClip(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getScreenToClipMatrix());
    }

    getClipToScreenMatrix(): Matrix4x4 {
        return Matrix4x4.scale(new Vector3(this.size.x, this.size.y, 1));
    }

    clipToScreen(vec: Vector2): Vector2 {
        return vec.applyMatrix(this.getClipToScreenMatrix());
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

    public setTransformationMatrix(matrix: Matrix4x4): void {
        // the canvas API does not transform from clip space to screen space automatically,
        // this is why we apply the transform here
        matrix = this.getClipToScreenMatrix().mul(matrix);

        this.ctx.setTransform({
            a: matrix.values[0],
            c: matrix.values[1],
            e: matrix.values[2],
            b: matrix.values[4],
            d: matrix.values[5],
            f: matrix.values[6],
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

    public circle(position: Vector3, diameter: number): void {
        this.ctx.beginPath();

        this.ctx.ellipse(position.x, position.y, diameter/2, diameter/2, 0, 0, 2*Math.PI);

        this.ctx.save();
        if(this.doFill) {
            this.ctx.fill();
        }
        if(this.doStroke) {
            this.ctx.clip();
            this.ctx.lineWidth *= 2;
            this.ctx.stroke();
        }
        this.ctx.restore();

        this.ctx.closePath();
    }

    public rectangle(position: Vector3, size: Vector2): void {
        this.ctx.beginPath();

        this.ctx.rect(position.x, position.y, size.x, size.y);
        
        this.ctx.save();
        if(this.doFill) {
            this.ctx.fill();
        }
        if(this.doStroke) {
            this.ctx.clip();
            this.ctx.lineWidth *= 2;
            this.ctx.stroke();
        }
        this.ctx.restore();
        
        this.ctx.closePath();
    }

    public line(start: Vector3, end: Vector3): void {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public image(position: Vector3, sprite: Sprite): void {
        this.ctx.drawImage(sprite.bitmap, position.x, position.y);
    }

    public fontSize(size: number) {
        this.ctx.font = size + "px Arial";
    }

    public text(position: Vector3, text: string): void {
        this.ctx.fillText(text, position.x, position.y);
    }

    clear() {
        
    }

}

export default CanvasGraphics;