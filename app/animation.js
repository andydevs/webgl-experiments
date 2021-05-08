/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import { mat4 } from "gl-matrix"
import * as cube from './cubemodel'
import vertexShaderCode from './cube.vs'
import fragmentShaderCode from './cube.fs'

/**
 * Animation roitine
 * 
 * @param {WebGLContext} gl webgl context
 */
export default function *routine(gl) {
    // Initialize
    let time = 0.0

    // Compile vertex shader
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderCode)
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the vertex shader!')
        console.error(gl.getShaderInfoLog(vertexShader))
        gl.deleteShader(vertexShader);
    }

    // Compile fragment shader
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderCode)
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the fragment shader!')
        console.error(gl.getShaderInfoLog(fragmentShader))
        gl.deleteShader(fragmentShader);
    }

    // Create shader program
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram)
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('An error occurred linking the shader program!')
        console.error(gl.getProgramInfoLog(shaderProgram))
    }

    // Get shader parameters
    let vertexPosition_ = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
    let vertexNormal_ = gl.getAttribLocation(shaderProgram, 'aVertexNormal')
    let projectionMatrix_ = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
    let transformMatrix_ = gl.getUniformLocation(shaderProgram, 'uTransformMatrix')
    let normalMatrix_ = gl.getUniformLocation(shaderProgram, 'uNormalMatrix')

    // Create buffers
    let positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW)
    let normalBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.normals), gl.STATIC_DRAW)
    let indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indeces), gl.STATIC_DRAW)

    /**
     * Render step
     * 
     * @param {float} time current time
     */
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
        mat4.rotate(transformMatrix, transformMatrix, time, [0.0, 0.0, 1.0])
        mat4.rotate(transformMatrix, transformMatrix, 0.7*time, [0.0, 1.0, 0.0])

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
        gl.vertexAttribPointer(vertexPosition_, cube.numVertexDimensions, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(vertexPosition_)

        // Set normal attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
        gl.vertexAttribPointer(vertexNormal_, cube.numNormalDimensions, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(vertexNormal_)

        // Set uniforms
        gl.uniformMatrix4fv(projectionMatrix_, false, projectionMatrix)
        gl.uniformMatrix4fv(transformMatrix_, false, transformMatrix)
        gl.uniformMatrix4fv(normalMatrix_, false, normalMatrix)
        
        // Fingers crossed this works
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.drawElements(gl.TRIANGLES, cube.indeces.length, gl.UNSIGNED_SHORT, 0)
    }

    // Animation loop
    // Render and update
    while (true) {
        render(time)
        time += 0.01
        yield
    }
}