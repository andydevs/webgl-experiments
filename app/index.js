/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import { Matrix4, Vector3 } from 'matrixgl';
import './style/main.scss'

const vertexShaderCode = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uTransformMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
        gl_Position = uProjectionMatrix * uTransformMatrix * aVertexPosition;
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
    // Front Face
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Bacl Face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Left Face
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,

    // Right face
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,

    // Bottom Face
    -1.0, -1.0,  1.0,
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0
]
const numVertexDimensions = 3;
const colors = [
    0.0, 0.0, 0.0, 1.0,
    0.5, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    0.5, 0.5, 0.0, 1.0,

    0.0, 1.0, 0.0, 1.0,
    0.5, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    0.5, 0.5, 0.5, 1.0,
    
    0.0, 0.0, 1.0, 1.0,
    0.5, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0,
    
    0.0, 1.0, 1.0, 1.0,
    0.0, 0.5, 0.5, 1.0,
    0.0, 0.0, 0.0, 1.0,
    0.5, 0.0, 0.0, 1.0,
    
    1.0, 0.0, 0.0, 1.0,
    0.5, 0.5, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.5, 1.0, 0.0, 1.0,
    
    1.0, 0.0, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 0.5, 0.5, 1.0,
]
const numColorDimensions = 4
const indeces = [
    0,  1,  2,    0,  2,  3,
    4,  5,  6,    4,  6,  7,
    8,  9,  10,   8,  10, 11,
    12, 13, 14,   12, 14, 15,
    16, 17, 18,   16, 18, 19,
    20, 21, 22,   20, 22, 23
]

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
let projectionMatrix_ = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
let transformMatrix_ = gl.getUniformLocation(shaderProgram, 'uTransformMatrix')

// Create buffers
let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
let colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
let indexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indeces), gl.STATIC_DRAW)

function render(time) {
    // Opengl clear
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Set program
    gl.useProgram(shaderProgram)

    // Matrices
    const transformMatrix = Matrix4.identity()
        .translate(0, 0, -6)
        .rotateAround(new Vector3(1.5, -0.75, 1.5).normalize(), 2*time)
    const projectionMatrix = Matrix4.perspective({
        fovYRadian: Math.PI / 4,
        aspectRatio: gl.canvas.clientWidth / gl.canvas.clientHeight,
        near: 1,
        far: 100
    })

    // Set attribute arrays
    // type: FLOAT, normalize: false, stride: 0, offset: 0
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(vertexPosition, numVertexDimensions, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexPosition)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(vertexColor, numColorDimensions, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexColor)

    // Set uniforms
    gl.uniformMatrix4fv(projectionMatrix_, false, projectionMatrix.values)
    gl.uniformMatrix4fv(transformMatrix_, false, transformMatrix.values)
    
    // Fingers crossed this works
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.drawElements(gl.TRIANGLES, indeces.length, gl.UNSIGNED_SHORT, 0)
}

// Animation loop
let time = 0.0
function animate() {
    render(time)
    
    // Update
    time += 0.01
    requestAnimationFrame(animate)
}
animate()