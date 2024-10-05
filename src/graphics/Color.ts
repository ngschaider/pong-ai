class Color {

    static white = new Color(255, 255, 255);
    static black = new Color(0, 0, 0);
    static red = new Color(255, 0, 0);
    static green = new Color(0, 255, 0);
    static blue = new Color(0, 0, 255);
    static gray = new Color(52, 52, 52);

    r: number;
    g: number;
    b: number;

    constructor(r: number, g?: number, b?: number) {
        if(g !== undefined && b == undefined) {
            throw new Error("This function has to be called either with one parameter or three parameters");
        }

        this.r = r;
        this.g = g ?? r;
        this.b = b ?? r;
    }

}

export default Color