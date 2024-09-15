class Color {

    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);
    static Red = new Color(255, 0, 0);
    static Green = new Color(0, 255, 0);
    static Blue = new Color(0, 0, 255);
    static Gray = new Color(52, 52, 52);

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