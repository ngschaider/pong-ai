import Color from "./Color";

class RandomHelper {

    public static intRange(min: number, max: number): number {
        return Math.floor(this.floatRange(min, max));
    }

    public static floatRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static color(): Color {
        return new Color(this.floatRange(0, 255), this.floatRange(0, 255), this.floatRange(0, 255));
    }

    public static boolean(): boolean {
        return Math.random() >= 0.5 ? true : false;
    }

}

export default RandomHelper;