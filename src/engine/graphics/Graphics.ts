import Color from "../../utils/Color";
import Matrix3x3 from "../../utils/Matrix3x3";
import Sprite from "../../utils/Sprite";
import Vector2 from "../../utils/Vector2";

interface Graphics {
    get size(): Vector2;
    get aspectRatio(): number;
    setTransformationMatrix(matrix: Matrix3x3): void;
    fill(color: Color): void;
    stroke(color: Color): void;
    lineWidth(lineWidth: number): void;
    noFill(): void;
    noStroke(): void;
    circle(position: Vector2, diameter: number): void;
    rectangle(position: Vector2, size: Vector2): void;
    line(start: Vector2, end: Vector2): void;
    image(position: Vector2, sprite: Sprite): void;
    fontSize(size: number): void;
    text(position: Vector2, text: string): void;

    getScreenToClipMatrix(): Matrix3x3;
    screenToClip(vec: Vector2): Vector2;
    getClipToScreenMatrix(): Matrix3x3;
    clipToScreen(vec: Vector2): Vector2;
}

export default Graphics;