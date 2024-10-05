import Matrix from "../utils/Matrix";
import Sprite from "../utils/Sprite";
import Vector2 from "../utils/Vector2";
import Color from "./Color";

interface Graphics {
    get size(): Vector2;
    get aspectRatio(): number;
    setTransformationMatrix(matrix: Matrix): void;
    fill(color: Color): void;
    stroke(color: Color): void;
    lineWidth(lineWidth: number): void;
    noFill(): void;
    noStroke(): void;
    circle(position: Vector2, diameter: number): void;
    rectangle(position: Vector2, size: Vector2): void;
    line(start: Vector2, end: Vector2): void;
    image(sprite: Sprite): void;
    text(position: Vector2, text: string): void;
}

export default Graphics;