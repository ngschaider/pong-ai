class StringBuilder {

    private result: string = ""
    private indent: number = 0;

    public AddLine(line: string) {
        if(this.result != "") {
            this.result += "\n";
        }

        for(let i = 0; i < this.indent; i++) {
            this.result += "\t";
        }
        this.result += line;
    }

    public Indent() {
        this.indent++;
    }

    public Unindent() {
        this.indent--;
        this.indent = Math.max(0, this.indent);
    }


    public Build(): string {
        return this.result;
    }

}

export default StringBuilder;