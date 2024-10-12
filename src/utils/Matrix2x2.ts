class Matrix2x2 {

    public static readonly identity: Matrix2x2 = new Matrix2x2([
        1, 0, 
        0, 1
    ]);

    public readonly values: number[];
    public readonly width: number = 2;
    public readonly height: number = 2;

    constructor(values: number[]) {
        if(values.length != this.width * this.height) {
            throw new Error("Wrong amount of values supplied.");
        }
        this.values = values;
    }

    clone() {
        return new Matrix2x2([
            this.values[0], this.values[1], 
            this.values[2], this.values[3]
        ]);
    }

    det() {
        return this.getValue(0, 0) * this.getValue(1, 1) 
            - this.getValue(1, 0) * this.getValue(0, 1);
    }

    adj() {
        return new Matrix2x2([
            this.getValue(1, 1), -this.getValue(1, 0), 
            -this.getValue(0, 1), this.getValue(0, 0)
        ]);
    }

    getValue(x: number, y: number): number {
        return this.values[x + y * this.width];
    }

}

export default Matrix2x2;