class NumberUtils {

    public static nearlyEquals(a: number, b: number): boolean {
        return Math.abs(a - b) < 0.0005;
    }

}

export default NumberUtils;