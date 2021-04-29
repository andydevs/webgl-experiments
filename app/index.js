/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import './style/main.scss'

const vertexShaderCode = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    varying lowp vec4 vColor;

    void main() {
        gl_Position = aVertexPosition;
        vColor = aVertexColor;
    }
`

const fragmentShaderCode = `
    varying lowp vec4 vColor;

    void main() {
        gl_FragColor = vColor;
    }
`

// Model vertices!
const vertices = [
    -0.5, -0.5,
     0.0,  0.5,
     0.5, -0.5
]
const numVertexDimensions = 2;
const colors = [
    0.0,  0.67, 1.0, 1.0,
    0.0,  0.0,  0.0, 1.0,
    0.67, 0.0,  1.0, 1.0
]
const numColorDimensions = 4

// Get opengl context
let canvas = document.getElementById('webgl-canvas')
let gl = canvas.getContext('webgl')

// Set up vertex shader
let vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderCode)
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the vertex shader!');
    console.error(gl.getShaderInfoLog(vertexShader))
    gl.deleteShader(vertexShader);
}

// Set up fragment shader
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderCode)
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the fragment shader!');
    console.error(gl.getShaderInfoLog(fragmentShader))
    gl.deleteShader(fragmentShader);
}

// Create shader program
let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram)
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('An error occurred linking the shader program!');
    console.error(gl.getProgramInfoLog(shaderProgram))
}

// Get shader arguments
let vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
let vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor')

// Create buffers
let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
let colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

// Clear
function draw() {
    // Opengl clear
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Add vertex attribute array
    let type = gl.FLOAT
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(vertexPosition, numVertexDimensions, type, normalize, stride, offset)
    gl.enableVertexAttribArray(vertexPosition)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(vertexColor, numColorDimensions, type, normalize, stride, offset)
    gl.enableVertexAttribArray(vertexColor)

    // Fingers crossed this works
    gl.useProgram(shaderProgram)
    let numPositions = vertices.length / numVertexDimensions
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, numPositions)
}
draw()