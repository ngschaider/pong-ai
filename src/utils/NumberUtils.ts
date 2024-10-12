class NumberUtils {

    public static nearlyEquals(a: number, b: number, threshold: number = 0.0005): boolean {
        return Math.abs(a - b) < threshold;
    }

}

export default NumberUtils;