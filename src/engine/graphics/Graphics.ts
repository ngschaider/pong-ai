import Color from "../../utils/Color";
import Matrix3x3 from "../../utils/Matrix3x3";
import Matrix4x4 from "../../utils/Matrix4x4";
import Sprite from "../../utils/Sprite";
import Vector2 from "../../utils/Vector2";
import Vector3 from "../../utils/Vector3";

interface Graphics {
    get size(): Vector2;
    get aspectRatio(): number;
    setTransformationMatrix(matrix: Matrix4x4): void;
    fill(color: Color): void;
    stroke(color: Color): void;
    lineWidth(lineWidth: number): void;
    noFill(): void;
    noStroke(): void;
    circle(position: Vector3, diameter: number): void;
    rectangle(position: Vector3, size: Vector2): void;
    line(start: Vector3, end: Vector3): void;
    image(position: Vector3, sprite: Sprite): void;
    fontSize(size: number): void;
    text(position: Vector3, text: string): void;
    clear(): void;

    getScreenToClipMatrix(): Matrix4x4;
    screenToClip(vec: Vector2): Vector2;
    getClipToScreenMatrix(): Matrix4x4;
    clipToScreen(vec: Vector2): Vector2;
}

export default Graphics;