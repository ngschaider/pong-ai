class StringBuilder {

    private result: string = ""
    private indentationLevel: number = 0;

    public addLine(line: string) {
        if(this.result != "") {
            this.result += "\n";
        }

        for(let i = 0; i < this.indentationLevel; i++) {
            this.result += "\t";
        }
        this.result += line;
    }

    public indent() {
        this.indentationLevel++;
    }

    public unindent() {
        this.indentationLevel--;
        this.indentationLevel = Math.max(0, this.indentationLevel);
    }


    public build(): string {
        return this.result;
    }

}

export default StringBuilder;