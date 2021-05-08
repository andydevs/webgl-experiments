/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
import routine from './animation';
import './style/main.scss'

/**
 * Run animation routine
 * 
 * @param {HTMLCanvas} canvas canvas element
 * @param {Generator} routine function coroutine
 */
function animateRoutine(canvas, routine) {
    // Get opengl context from canvas elem
    let gl = canvas.getContext('webgl')

    // Get generator
    let generator = routine(gl)

    // Animation loop
    function anim() {
        if (generator.next()) {
            requestAnimationFrame(anim)
        }
    }
    requestAnimationFrame(anim)
}

// Run animation
let canvas = document.getElementById('webgl-canvas')
animateRoutine(canvas, routine)