import Color from "../../utils/Color";
import Matrix3x3 from "../../utils/Matrix3x3";
import Matrix4x4 from "../../utils/Matrix4x4";
import Sprite from "../../utils/Sprite";
import Vector2 from "../../utils/Vector2";
import Vector3 from "../../utils/Vector3";
import Graphics from "./Graphics";

const VERTEX_SHADER = `
    attribute vec4 a_position;

    uniform mat4 u_matrix;

    void main() {
        gl_Position = u_matrix * a_position;
    }
`;

const FRAGMENT_SHADER = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
        gl_FragColor = u_color;
    }
`;

const createShader = (gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader => {
    const shader = gl.createShader(type);
    if(!shader) throw new Error("Could not create WebGL shader.");

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const msg = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error("Could not compile WebGL shader: " + msg);
    }

    return shader;
}

const createProgram = (gl: WebGLRenderingContext): WebGLProgram => {
    const program = gl.createProgram();
    if(!program) throw new Error("Could not create WebGL program.");

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    gl.attachShader(program, vertexShader);

    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const msg = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error("Could not link WebGL program: " + msg);
    }

    return program;
}

class WebGlGraphics implements Graphics {    

    private el: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private doStroke = false;
    private doFill = true;
    private fillColor: Color = Color.gray;
    private strokeColor: Color = Color.red;
    private _lineWidth: number = 0.1;

    // private program: WebGLProgram;
    private positionBuffer: WebGLBuffer;
    private positionLoc: number;
    private colorLoc: WebGLUniformLocation;
    private matrixLoc: WebGLUniformLocation;

    constructor(el: HTMLCanvasElement) {
        this.el = el;
        this.gl = this.el.getContext("webgl") as WebGLRenderingContext;

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();


        const program = createProgram(this.gl);
        this.positionBuffer = this.gl.createBuffer()!;
        this.positionLoc = this.gl.getAttribLocation(program, "a_position");
        this.colorLoc = this.gl.getUniformLocation(program, "u_color")!;
        this.matrixLoc = this.gl.getUniformLocation(program, "u_matrix")!;

        this.gl.useProgram(program);
        this.setTransformationMatrix(Matrix4x4.identity);

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    private draw(vertices: Vector3[], primitive: GLenum) {
        const positionBytes = new Float32Array(vertices.map(v => [v.x, v.y, v.z]).flat());
        this.gl.enableVertexAttribArray(this.positionLoc);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positionBytes, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.positionLoc, 3, this.gl.FLOAT, false, 0, 0);

        if(primitive === this.gl.LINES || primitive === this.gl.LINE_STRIP || primitive === this.gl.LINE_LOOP) {
            this.gl.uniform4fv(this.colorLoc, [...this.strokeColor.toNormalizedArray(), 1]);
        } else {
            this.gl.uniform4fv(this.colorLoc, [...this.fillColor.toNormalizedArray(), 1]);
        }

        this.gl.lineWidth(this._lineWidth);

        this.gl.drawArrays(primitive, 0, vertices.length);
    }

    private resize(): void {
        this.gl.canvas.width = this.el.clientWidth;
        this.gl.canvas.height = this.el.clientHeight;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    get size(): Vector2 {
        return new Vector2(this.gl.canvas.width, this.gl.canvas.height);
    }

    get aspectRatio(): number {
        return this.size.x / this.size.y;
    }

    setTransformationMatrix(matrix: Matrix4x4): void {
        const arr = matrix.getColumnMajorArray();
        this.gl.uniformMatrix4fv(this.matrixLoc, false, arr);
    }

    fill(color: Color): void {
        this.fillColor = color;
        this.doFill = true;
    }

    stroke(color: Color): void {
        this.strokeColor = color;
        this.doStroke = true;
    }

    lineWidth(lineWidth: number): void {
        this._lineWidth = lineWidth;
    }

    noFill(): void {
        this.doFill = false;
    }

    noStroke(): void {
        this.doStroke = false;
    }

    circle(position: Vector3, diameter: number): void {
    }

    rectangle(position: Vector3, size: Vector2): void {
        if(this.doFill) {
            this.fillRectangle(position, size);
        }
        if(this.doStroke) {
            console.log(this.doStroke);
            this.strokeRectangle(position, size);
        }
    }

    private strokeRectangle(position: Vector3, size: Vector2): void {
        this.draw([
            position,
            position.add(new Vector3(size.x, 0, 0)),
            position.add(new Vector3(size.x, 0, 0)),
            position.add(new Vector3(size.x, size.y, 0)),
            position.add(new Vector3(size.x, size.y, 0)),
            position.add(new Vector3(0, size.y, 0)),
            position.add(new Vector3(0, size.y, 0)),
            position,
        ], this.gl.LINES);
    }

    private fillRectangle(position: Vector3, size: Vector2): void {
        this.draw([
            position,
            position.add(new Vector3(size.x, 0, 0)),
            position.add(new Vector3(0, size.y, 0)),
            position.add(new Vector3(size.x, size.y, 0)),
        ], this.gl.TRIANGLE_STRIP);
    }

    line(start: Vector3, end: Vector3): void {
        this.draw([start, end], this.gl.LINES);
    }

    image(position: Vector3, sprite: Sprite): void {
    }

    fontSize(size: number): void {
    }

    text(position: Vector2, text: string): void {
    }

    getScreenToClipMatrix(): Matrix4x4 {
        return Matrix4x4.identity;
    }

    screenToClip(vec: Vector3): Vector3 {
        return Vector3.zero;
    }

    getClipToScreenMatrix(): Matrix4x4 {
        return Matrix4x4.identity;
    }

    clipToScreen(vec: Vector3): Vector3 {
        return Vector3.zero;
    }

}

export default WebGlGraphics;