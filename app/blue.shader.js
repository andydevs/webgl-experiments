/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import vertexShaderCode from './blue.vs'
import fragmentShaderCode from './blue.fs'

/**
 * Load shader program into gl and 
 * return attribute
 * 
 * @param {WebGLContext} gl web gl draw context
 */
export default function loadShader(gl) {
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
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('An error occurred linking the shader program!')
        console.error(gl.getProgramInfoLog(program))
    }

    // Get shader parameters
    let aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
    let aVertexNormal = gl.getAttribLocation(program, 'aVertexNormal')
    let uTransformMatrix = gl.getUniformLocation(program, 'uTransformMatrix')
    let uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
    let uNormalMatrix = gl.getUniformLocation(program, 'uNormalMatrix')

    // Return shader objects
    return {
        program,
        aVertexPosition,
        aVertexNormal,
        uTransformMatrix,
        uProjectionMatrix,
        uNormalMatrix
    }
}