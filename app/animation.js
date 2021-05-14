/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import { mat4 } from "gl-matrix"
import loadShader from './blue.shader'
import mesh from './mesh.obj'

// Number of components for each
const VERT_NUM_COMPONENTS = 3
const NORM_NUM_COMPONENTS = 3

/**
 * Animation roitine
 * 
 * @param {WebGLContext} gl webgl context
 */
export default function *routine(gl) {
    console.log(mesh)

    // Get shader
    let shader = loadShader(gl)

    // Create buffers
    let positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW)
    let normalBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals), gl.STATIC_DRAW)
    let indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW)

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

        // Transform matrix
        const transformMatrix = mat4.create()
        mat4.translate(transformMatrix, transformMatrix, [0, 0, -6])
        mat4.rotate(transformMatrix, transformMatrix, time, [0.0, 0.0, 1.0])
        mat4.rotate(transformMatrix, transformMatrix, 0.7*time, [0.0, 1.0, 0.0])
        mat4.rotate(transformMatrix, transformMatrix, 0.3*time, [1.0, 0.0, 0.0])

        // Projection matrix
        const projectionMatrix = mat4.create()
        mat4.perspective(projectionMatrix, 
            Math.PI / 4, 
            gl.canvas.clientWidth / gl.canvas.clientHeight, 
            1, 100)

        // Normal matrix
        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, transformMatrix)
        mat4.transpose(normalMatrix, normalMatrix)

        // Set program
        gl.useProgram(shader.program)

        // Set position attribute
        // type: FLOAT, normalize: false, stride: 0, offset: 0
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.vertexAttribPointer(shader.aVertexPosition, VERT_NUM_COMPONENTS, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(shader.aVertexPosition)

        // Set normal attribute
        // type: FLOAT, normalize: false, stride: 0, offset: 0
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
        gl.vertexAttribPointer(shader.aVertexNormal, NORM_NUM_COMPONENTS, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(shader.aVertexNormal)

        // Set uniforms
        gl.uniformMatrix4fv(shader.uProjectionMatrix, false, projectionMatrix)
        gl.uniformMatrix4fv(shader.uTransformMatrix, false, transformMatrix)
        gl.uniformMatrix4fv(shader.uNormalMatrix, false, normalMatrix)
        
        // Fingers crossed this works
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0)
    }

    // Animation loop
    // Render and update time
    let time = 0.0
    while (true) {
        render(time)
        time += 0.01
        yield
    }
}