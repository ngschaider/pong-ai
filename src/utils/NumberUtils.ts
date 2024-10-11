class NumberUtils {

    public static nearlyEquals(a: number, b: number, threshold: number): boolean {
        return Math.abs(a - b) < threshold;
    }

}

export default NumberUtils;