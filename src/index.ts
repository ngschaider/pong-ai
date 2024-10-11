import Engine from "./engine/core/Engine";
import Debug from "./engine/Debug";
import WebGlGraphics from "./engine/graphics/WebGlGraphics";
import PhysicsTestScene from "./game/PhysicsTestScene";
import Color from "./utils/Color";
import Matrix3x3 from "./utils/Matrix3x3";
import Matrix4x4 from "./utils/Matrix4x4";
import Vector2 from "./utils/Vector2";

// const engine = new Engine();

// // engine.switchScene(PongScene);
// engine.switchScene(PhysicsTestScene);
// // engine.switchScene(SimpleTestScene);

// export const debug = new Debug(engine);

// engine.start();


const g = new WebGlGraphics(document.getElementById("root") as HTMLCanvasElement);

// g.fill(Color.red);
// g.stroke(Color.blue);
// g.rectangle(new Vector2(-0.5, -0.5), new Vector2(1, 1));

// g.setTransformationMatrix(Matrix3x3.rotate(0.1))
// g.fill(Color.black);
// g.stroke(Color.blue);
// g.line(new Vector2(-0.5, -0.5), new Vector2(0.5, 0.5));

// const createShader = (gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader => {
//     const shader = gl.createShader(type);
//     if(!shader) throw new Error("Could not create WebGL shader.");

//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);

//     if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         gl.deleteShader(shader);
//         const msg = gl.getShaderInfoLog(shader);
//         throw new Error("Could not compile WebGL shader: " + msg);
//     }

//     return shader;
// }

// const createProgram = (gl: WebGLRenderingContext): WebGLProgram => {
//     const program = gl.createProgram();
//     if(!program) throw new Error("Could not create WebGL program.");

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
//     gl.attachShader(program, vertexShader);

//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
//     gl.attachShader(program, fragmentShader);

//     gl.linkProgram(program);
//     if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//         gl.deleteProgram(program);
//         const msg = gl.getProgramInfoLog(program);
//         throw new Error("Could not link WebGL program: " + msg);
//     }

//     return program;
// }

// const el = document.getElementById("root") as HTMLCanvasElement;
// const gl = el.getContext("webgl")!;

// const count = 6;
// const positionBytes = new Float32Array([
//     0, 0,
//     1, 0,
//     0, 1,
//     0, 1,
//     1, 0,
//     1, 1,
// ]);


// const VERTEX_SHADER = `
//     attribute vec4 a_position;

//     uniform mat4 u_matrix;

//     void main() {
//         gl_Position = a_position;
//     }
// `;

// const FRAGMENT_SHADER = `
//     precision mediump float;

//     uniform vec4 u_color;

//     void main() {
//         gl_FragColor = u_color;
//     }
// `;

// const program = createProgram(gl);
// const positionBuffer = gl.createBuffer()!;
// // const colorBuffer = gl.createBuffer()!;
// const positionLoc = gl.getAttribLocation(program, "a_position");
// const colorLoc = gl.getUniformLocation(program, "u_color")!;
// // const matrixLoc = gl.getUniformLocation(program, "u_matrix")!;

// gl.useProgram(program);

// gl.clearColor(0, 0, 0, 0);
// gl.clear(gl.COLOR_BUFFER_BIT);


// gl.enableVertexAttribArray(positionLoc);
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, positionBytes, gl.STATIC_DRAW);
// gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

// gl.uniform4fv(colorLoc, [Math.random(), Math.random(), Math.random(), 1]);
// // gl.uniformMatrix4fv(matrixLoc, false, Matrix4x4.identity.getColumnMajorArray())

// gl.drawArrays(gl.TRIANGLES, 0, count);