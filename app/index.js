/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import { mat4, vec3 } from "gl-matrix";
import './style/main.scss'

const vertexShaderCode = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec4 aVertexColor;

    uniform mat4 uNormalMatrix;
    uniform mat4 uTransformMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec4 vColor;
    varying highp vec3 vLighting;

    void main() {
        gl_Position = uProjectionMatrix * uTransformMatrix * aVertexPosition;
        vColor = aVertexColor;

        // Ambient light
        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);

        // Directional light
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        // Get directional light amount
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
        highp float directionalValue = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        highp vec3 directionalLight = directionalLightColor * directionalValue;

        // Total light amount
        vLighting = ambientLight + directionalLight;
    }
`

const fragmentShaderCode = `
    varying lowp vec3 vLighting;

    void main() {
        lowp vec3 defaultColor = vec3(0.0, 0.67, 1.0);
        gl_FragColor = vec4(defaultColor * vLighting, 1.0);
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
const normals = [
    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    // Left
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,

    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    // Top
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0
]
const numNormalDimensions = 3
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
let vertexPosition_ = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
let vertexNormal_ = gl.getAttribLocation(shaderProgram, 'aVertexNormal')
let projectionMatrix_ = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
let transformMatrix_ = gl.getUniformLocation(shaderProgram, 'uTransformMatrix')
let normalMatrix_ = gl.getUniformLocation(shaderProgram, 'uNormalMatrix')

// Create buffers
let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
let normalBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)
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

    // Transform matrix
    const transformMatrix = mat4.create()
    mat4.translate(transformMatrix, transformMatrix, [0, 0, -6])
    mat4.rotate(transformMatrix, transformMatrix, 2*time, [1.5, -0.75, 1.5])

    // Projection matrix
    const projectionMatrix = mat4.create()
    mat4.perspective(projectionMatrix, Math.PI / 4, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 100)

    // Normal matrix
    const normalMatrix = mat4.create()
    mat4.invert(normalMatrix, transformMatrix)
    mat4.transpose(normalMatrix, normalMatrix)

    // Set position attribute
    // type: FLOAT, normalize: false, stride: 0, offset: 0
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(vertexPosition_, numVertexDimensions, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexPosition_)

    // Set normal attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    gl.vertexAttribPointer(vertexNormal_, numNormalDimensions, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexNormal_)

    // Set uniforms
    gl.uniformMatrix4fv(projectionMatrix_, false, projectionMatrix)
    gl.uniformMatrix4fv(transformMatrix_, false, transformMatrix)
    gl.uniformMatrix4fv(normalMatrix_, false, normalMatrix)
    
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