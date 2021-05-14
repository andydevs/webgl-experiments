/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/animation.js":
/*!**************************!*\
  !*** ./app/animation.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ routine
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/mat4.js");
/* harmony import */ var _blue_shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blue.shader */ "./app/blue.shader.js");
/* harmony import */ var _mesh_obj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mesh.obj */ "./app/mesh.obj");
/* provided dependency */ var regeneratorRuntime = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
var _marked = /*#__PURE__*/regeneratorRuntime.mark(routine);

/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */


 // Number of components for each

var VERT_NUM_COMPONENTS = 3;
var NORM_NUM_COMPONENTS = 3;
/**
 * Animation roitine
 * 
 * @param {WebGLContext} gl webgl context
 */

function routine(gl) {
  var shader, positionBuffer, normalBuffer, indexBuffer, render, time;
  return regeneratorRuntime.wrap(function routine$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          render = function _render(time) {
            // Opengl clear
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clearDepth(1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT); // Transform matrix

            var transformMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.translate(transformMatrix, transformMatrix, [0, 0, -50]);
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.rotate(transformMatrix, transformMatrix, 0.75, [1.0, 0.0, 0.0]);
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.rotate(transformMatrix, transformMatrix, 0.7 * time, [0.0, 1.0, 0.0]);
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.rotate(transformMatrix, transformMatrix, -Math.PI / 2, [1.0, 0.0, 0.0]); // Projection matrix

            var projectionMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.perspective(projectionMatrix, Math.PI / 4, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 100); // Normal matrix

            var normalMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.invert(normalMatrix, transformMatrix);
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.transpose(normalMatrix, normalMatrix); // Set program

            gl.useProgram(shader.program); // Set position attribute
            // type: FLOAT, normalize: false, stride: 0, offset: 0

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(shader.aVertexPosition, VERT_NUM_COMPONENTS, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(shader.aVertexPosition); // Set normal attribute
            // type: FLOAT, normalize: false, stride: 0, offset: 0

            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.vertexAttribPointer(shader.aVertexNormal, NORM_NUM_COMPONENTS, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(shader.aVertexNormal); // Set uniforms

            gl.uniformMatrix4fv(shader.uProjectionMatrix, false, projectionMatrix);
            gl.uniformMatrix4fv(shader.uTransformMatrix, false, transformMatrix);
            gl.uniformMatrix4fv(shader.uNormalMatrix, false, normalMatrix); // Fingers crossed this works

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.drawElements(gl.TRIANGLES, _mesh_obj__WEBPACK_IMPORTED_MODULE_1__.default.indices.length, gl.UNSIGNED_SHORT, 0);
          };

          console.log(_mesh_obj__WEBPACK_IMPORTED_MODULE_1__.default); // Get shader

          shader = (0,_blue_shader__WEBPACK_IMPORTED_MODULE_0__.default)(gl); // Create buffers

          positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_mesh_obj__WEBPACK_IMPORTED_MODULE_1__.default.vertices), gl.STATIC_DRAW);
          normalBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_mesh_obj__WEBPACK_IMPORTED_MODULE_1__.default.vertexNormals), gl.STATIC_DRAW);
          indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(_mesh_obj__WEBPACK_IMPORTED_MODULE_1__.default.indices), gl.STATIC_DRAW);
          /**
           * Render step
           * 
           * @param {float} time current time
           */

          // Animation loop
          // Render and update time
          time = 0.0;

        case 13:
          if (false) {}

          render(time);
          time += 0.01;
          _context.next = 18;
          return;

        case 18:
          _context.next = 13;
          break;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

/***/ }),

/***/ "./app/blue.shader.js":
/*!****************************!*\
  !*** ./app/blue.shader.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ loadShader
/* harmony export */ });
/* harmony import */ var _blue_vs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blue.vs */ "./app/blue.vs");
/* harmony import */ var _blue_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blue.fs */ "./app/blue.fs");
/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
;

/**
 * Load shader program into gl and 
 * return attribute
 * 
 * @param {WebGLContext} gl web gl draw context
 */

function loadShader(gl) {
  // Compile vertex shader
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, _blue_vs__WEBPACK_IMPORTED_MODULE_0__.default);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the vertex shader!');
    console.error(gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
  } // Compile fragment shader


  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, _blue_fs__WEBPACK_IMPORTED_MODULE_1__.default);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the fragment shader!');
    console.error(gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
  } // Create shader program


  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('An error occurred linking the shader program!');
    console.error(gl.getProgramInfoLog(program));
  } // Get shader parameters


  var aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  var aVertexNormal = gl.getAttribLocation(program, 'aVertexNormal');
  var uTransformMatrix = gl.getUniformLocation(program, 'uTransformMatrix');
  var uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
  var uNormalMatrix = gl.getUniformLocation(program, 'uNormalMatrix'); // Return shader objects

  return {
    program: program,
    aVertexPosition: aVertexPosition,
    aVertexNormal: aVertexNormal,
    uTransformMatrix: uTransformMatrix,
    uProjectionMatrix: uProjectionMatrix,
    uNormalMatrix: uNormalMatrix
  };
}

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "./app/animation.js");
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/main.scss */ "./app/style/main.scss");
/**
 * WebGL n stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: 04 - 27 - 2021
 */
;

/**
 * Run animation routine
 * 
 * @param {HTMLCanvas} canvas canvas element
 * @param {Generator} routine function coroutine
 */

function animateRoutine(canvas, routine) {
  // Get opengl context from canvas elem
  var gl = canvas.getContext('webgl'); // Get generator

  var generator = routine(gl); // Animation loop

  function anim() {
    if (generator.next()) {
      requestAnimationFrame(anim);
    }
  }

  requestAnimationFrame(anim);
} // Run animation


var canvas = document.getElementById('webgl-canvas');
animateRoutine(canvas, _animation__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss ***!
  \**********************************************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports
;

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Custom stack template stuff\n * \n * Author:  Anshul Kharbanda\n * Created: [Creation Date]\n */\n* {\n  font-family: 'Segoe UI',  Tahoma, Geneva,  Verdana, sans-serif; }\n\nbody {\n  background-color: #333; }\n\n#app {\n  text-align: center; }\n\n#webgl-canvas {\n  width: 100%;\n  max-width: 1280px; }\n", "",{"version":3,"sources":["webpack://./app/style/main.scss"],"names":[],"mappings":"AAAA;;;;;EAKE;AACF;EACI,8DAEuB,EAAA;;AAG3B;EACI,sBAAsB,EAAA;;AAG1B;EACI,kBAAkB,EAAA;;AAGtB;EACI,WAAW;EACX,iBAAiB,EAAA","sourcesContent":["/**\n * Custom stack template stuff\n * \n * Author:  Anshul Kharbanda\n * Created: [Creation Date]\n */\n* {\n    font-family: 'Segoe UI', \n        Tahoma, Geneva, \n        Verdana, sans-serif;\n}\n\nbody {\n    background-color: #333;\n}\n\n#app {\n    text-align: center;\n}\n\n#webgl-canvas {\n    width: 100%;\n    max-width: 1280px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./node_modules/gl-matrix/esm/common.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-matrix/esm/common.js ***!
  \**********************************************/
/*! namespace exports */
/*! export ARRAY_TYPE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EPSILON [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RANDOM [provided] [no usage info] [missing usage info prevents renaming] */
/*! export equals [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setMatrixArrayType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export toRadian [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSILON": () => /* binding */ EPSILON,
/* harmony export */   "ARRAY_TYPE": () => /* binding */ ARRAY_TYPE,
/* harmony export */   "RANDOM": () => /* binding */ RANDOM,
/* harmony export */   "setMatrixArrayType": () => /* binding */ setMatrixArrayType,
/* harmony export */   "toRadian": () => /* binding */ toRadian,
/* harmony export */   "equals": () => /* binding */ equals
/* harmony export */ });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat4.js ***!
  \********************************************/
/*! namespace exports */
/*! export add [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adjoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clone [provided] [no usage info] [missing usage info prevents renaming] */
/*! export copy [provided] [no usage info] [missing usage info prevents renaming] */
/*! export create [provided] [no usage info] [missing usage info prevents renaming] */
/*! export determinant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export equals [provided] [no usage info] [missing usage info prevents renaming] */
/*! export exactEquals [provided] [no usage info] [missing usage info prevents renaming] */
/*! export frob [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromQuat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromQuat2 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromRotation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromRotationTranslation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromRotationTranslationScale [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromRotationTranslationScaleOrigin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromScaling [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromTranslation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromValues [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromXRotation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromYRotation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromZRotation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export frustum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRotation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getScaling [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTranslation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export identity [provided] [no usage info] [missing usage info prevents renaming] */
/*! export invert [provided] [no usage info] [missing usage info prevents renaming] */
/*! export lookAt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mul [provided] [no usage info] [missing usage info prevents renaming] */
/*! export multiply [provided] [no usage info] [missing usage info prevents renaming] */
/*! export multiplyScalar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export multiplyScalarAndAdd [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ortho [provided] [no usage info] [missing usage info prevents renaming] */
/*! export perspective [provided] [no usage info] [missing usage info prevents renaming] */
/*! export perspectiveFromFieldOfView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rotate [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rotateX [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rotateY [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rotateZ [provided] [no usage info] [missing usage info prevents renaming] */
/*! export scale [provided] [no usage info] [missing usage info prevents renaming] */
/*! export set [provided] [no usage info] [missing usage info prevents renaming] */
/*! export str [provided] [no usage info] [missing usage info prevents renaming] */
/*! export sub [provided] [no usage info] [missing usage info prevents renaming] */
/*! export subtract [provided] [no usage info] [missing usage info prevents renaming] */
/*! export targetTo [provided] [no usage info] [missing usage info prevents renaming] */
/*! export translate [provided] [no usage info] [missing usage info prevents renaming] */
/*! export transpose [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => /* binding */ create,
/* harmony export */   "clone": () => /* binding */ clone,
/* harmony export */   "copy": () => /* binding */ copy,
/* harmony export */   "fromValues": () => /* binding */ fromValues,
/* harmony export */   "set": () => /* binding */ set,
/* harmony export */   "identity": () => /* binding */ identity,
/* harmony export */   "transpose": () => /* binding */ transpose,
/* harmony export */   "invert": () => /* binding */ invert,
/* harmony export */   "adjoint": () => /* binding */ adjoint,
/* harmony export */   "determinant": () => /* binding */ determinant,
/* harmony export */   "multiply": () => /* binding */ multiply,
/* harmony export */   "translate": () => /* binding */ translate,
/* harmony export */   "scale": () => /* binding */ scale,
/* harmony export */   "rotate": () => /* binding */ rotate,
/* harmony export */   "rotateX": () => /* binding */ rotateX,
/* harmony export */   "rotateY": () => /* binding */ rotateY,
/* harmony export */   "rotateZ": () => /* binding */ rotateZ,
/* harmony export */   "fromTranslation": () => /* binding */ fromTranslation,
/* harmony export */   "fromScaling": () => /* binding */ fromScaling,
/* harmony export */   "fromRotation": () => /* binding */ fromRotation,
/* harmony export */   "fromXRotation": () => /* binding */ fromXRotation,
/* harmony export */   "fromYRotation": () => /* binding */ fromYRotation,
/* harmony export */   "fromZRotation": () => /* binding */ fromZRotation,
/* harmony export */   "fromRotationTranslation": () => /* binding */ fromRotationTranslation,
/* harmony export */   "fromQuat2": () => /* binding */ fromQuat2,
/* harmony export */   "getTranslation": () => /* binding */ getTranslation,
/* harmony export */   "getScaling": () => /* binding */ getScaling,
/* harmony export */   "getRotation": () => /* binding */ getRotation,
/* harmony export */   "fromRotationTranslationScale": () => /* binding */ fromRotationTranslationScale,
/* harmony export */   "fromRotationTranslationScaleOrigin": () => /* binding */ fromRotationTranslationScaleOrigin,
/* harmony export */   "fromQuat": () => /* binding */ fromQuat,
/* harmony export */   "frustum": () => /* binding */ frustum,
/* harmony export */   "perspective": () => /* binding */ perspective,
/* harmony export */   "perspectiveFromFieldOfView": () => /* binding */ perspectiveFromFieldOfView,
/* harmony export */   "ortho": () => /* binding */ ortho,
/* harmony export */   "lookAt": () => /* binding */ lookAt,
/* harmony export */   "targetTo": () => /* binding */ targetTo,
/* harmony export */   "str": () => /* binding */ str,
/* harmony export */   "frob": () => /* binding */ frob,
/* harmony export */   "add": () => /* binding */ add,
/* harmony export */   "subtract": () => /* binding */ subtract,
/* harmony export */   "multiplyScalar": () => /* binding */ multiplyScalar,
/* harmony export */   "multiplyScalarAndAdd": () => /* binding */ multiplyScalarAndAdd,
/* harmony export */   "exactEquals": () => /* binding */ exactEquals,
/* harmony export */   "equals": () => /* binding */ equals,
/* harmony export */   "mul": () => /* binding */ mul,
/* harmony export */   "sub": () => /* binding */ sub
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");
;
/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./app/blue.fs":
/*!*********************!*\
  !*** ./app/blue.fs ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("varying lowp vec3 vLighting;\n\nvoid main() {\n    lowp vec3 defaultColor = vec3(0.0, 0.67, 1.0);\n    gl_FragColor = vec4(defaultColor * vLighting, 1.0);\n}");

/***/ }),

/***/ "./app/blue.vs":
/*!*********************!*\
  !*** ./app/blue.vs ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("attribute vec4 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec4 aVertexColor;\n\nuniform mat4 uNormalMatrix;\nuniform mat4 uTransformMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying highp vec4 vColor;\nvarying highp vec3 vLighting;\n\nvoid main() {\n    gl_Position = uProjectionMatrix * uTransformMatrix * aVertexPosition;\n    vColor = aVertexColor;\n\n    // Ambient light\n    highp vec3 ambientLight = vec3(0.2, 0.2, 0.2);\n\n    // Directional light\n    highp vec3 directionalLightColor = vec3(1, 1, 1);\n    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));\n\n    // Get directional light amount\n    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\n    highp float directionalValue = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n    highp vec3 directionalLight = directionalLightColor * directionalValue;\n\n    // Total light amount\n    vLighting = ambientLight + directionalLight;\n}");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 732:31-45 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var regeneratorRuntime = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./app/style/main.scss":
/*!*****************************!*\
  !*** ./app/style/main.scss ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss");
;
            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/webgl-obj-loader/dist/webgl-obj-loader.min.js":
/*!********************************************************************!*\
  !*** ./node_modules/webgl-obj-loader/dist/webgl-obj-loader.min.js ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, top-level-this-exports */
/*! CommonJS bailout: this is used directly at 1:223-227 */
/*! CommonJS bailout: module.exports is used directly at 1:65-79 */
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}("undefined"!=typeof self?self:this,function(){return function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};return t.m=e,t.c=r,t.d=function(exports,e,r){t.o(exports,e)||Object.defineProperty(exports,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=3)}([function(e,exports,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){switch(e){case"BYTE":case"UNSIGNED_BYTE":return 1;case"SHORT":case"UNSIGNED_SHORT":return 2;case"FLOAT":return 4}}Object.defineProperty(exports,"__esModule",{value:!0});var n=exports.Layout=function e(){r(this,e);for(var t=arguments.length,a=Array(t),n=0;n<t;n++)a[n]=arguments[n];this.attributes=a;var s=0,l=0,o=!0,u=!1,c=void 0;try{for(var f,h=a[Symbol.iterator]();!(o=(f=h.next()).done);o=!0){var p=f.value;if(this[p.key])throw new i(p);s%p.sizeOfType!=0&&(s+=p.sizeOfType-s%p.sizeOfType),this[p.key]={attribute:p,size:p.size,type:p.type,normalized:p.normalized,offset:s},s+=p.sizeInBytes,l=Math.max(l,p.sizeOfType)}}catch(e){u=!0,c=e}finally{try{!o&&h.return&&h.return()}finally{if(u)throw c}}s%l!=0&&(s+=l-s%l),this.stride=s;var v=!0,d=!1,y=void 0;try{for(var m,M=a[Symbol.iterator]();!(v=(m=M.next()).done);v=!0){this[m.value.key].stride=this.stride}}catch(e){d=!0,y=e}finally{try{!v&&M.return&&M.return()}finally{if(d)throw y}}},i=function e(t){r(this,e),this.message="found duplicate attribute: "+t.key},s=function e(t,n,i){arguments.length>3&&void 0!==arguments[3]&&arguments[3];r(this,e),this.key=t,this.size=n,this.type=i,this.normalized=!1,this.sizeOfType=a(i),this.sizeInBytes=this.sizeOfType*n};n.POSITION=new s("position",3,"FLOAT"),n.NORMAL=new s("normal",3,"FLOAT"),n.TANGENT=new s("tangent",3,"FLOAT"),n.BITANGENT=new s("bitangent",3,"FLOAT"),n.UV=new s("uv",2,"FLOAT"),n.MATERIAL_INDEX=new s("materialIndex",1,"SHORT"),n.MATERIAL_ENABLED=new s("materialEnabled",1,"UNSIGNED_SHORT"),n.AMBIENT=new s("ambient",3,"FLOAT"),n.DIFFUSE=new s("diffuse",3,"FLOAT"),n.SPECULAR=new s("specular",3,"FLOAT"),n.SPECULAR_EXPONENT=new s("specularExponent",3,"FLOAT"),n.EMISSIVE=new s("emissive",3,"FLOAT"),n.TRANSMISSION_FILTER=new s("transmissionFilter",3,"FLOAT"),n.DISSOLVE=new s("dissolve",1,"FLOAT"),n.ILLUMINATION=new s("illumination",1,"UNSIGNED_SHORT"),n.REFRACTION_INDEX=new s("refractionIndex",1,"FLOAT"),n.SHARPNESS=new s("sharpness",1,"FLOAT"),n.MAP_DIFFUSE=new s("mapDiffuse",1,"SHORT"),n.MAP_AMBIENT=new s("mapAmbient",1,"SHORT"),n.MAP_SPECULAR=new s("mapSpecular",1,"SHORT"),n.MAP_SPECULAR_EXPONENT=new s("mapSpecularExponent",1,"SHORT"),n.MAP_DISSOLVE=new s("mapDissolve",1,"SHORT"),n.ANTI_ALIASING=new s("antiAliasing",1,"UNSIGNED_SHORT"),n.MAP_BUMP=new s("mapBump",1,"SHORT"),n.MAP_DISPLACEMENT=new s("mapDisplacement",1,"SHORT"),n.MAP_DECAL=new s("mapDecal",1,"SHORT"),n.MAP_EMISSIVE=new s("mapEmissive",1,"SHORT")},function(e,exports,t){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=t(0),s=function(){function e(t,n){a(this,e),n=n||{},n.materials=n.materials||{},n.enableWTextureCoord=!!n.enableWTextureCoord,n.indicesPerMaterial=!!n.indicesPerMaterial;var i=this;i.vertices=[],i.vertexNormals=[],i.textures=[],i.indices=[],i.textureStride=n.enableWTextureCoord?3:2,this.name="";var s=[],l=[],o=[],u={},c=[],f={},h=-1,p=0;u.verts=[],u.norms=[],u.textures=[],u.hashindices={},u.indices=[[]],u.materialIndices=[],u.index=0;for(var v=/^v\s/,d=/^vn\s/,y=/^vt\s/,m=/^f\s/,M=/\s+/,b=/^usemtl/,x=t.split("\n"),I=0;I<x.length;I++){var A=x[I].trim();if(A&&!A.startsWith("#")){var _=A.split(M);if(_.shift(),v.test(A))s.push.apply(s,r(_));else if(d.test(A))l.push.apply(l,r(_));else if(y.test(A)){var k=_;_.length>2&&!n.enableWTextureCoord?k=_.slice(0,2):2===_.length&&n.enableWTextureCoord&&k.push(0),o.push.apply(o,r(k))}else if(b.test(A)){var T=_[0];T in f||(c.push(T),f[T]=c.length-1,n.indicesPerMaterial&&f[T]>0&&u.indices.push([])),h=f[T],n.indicesPerMaterial&&(p=h)}else if(m.test(A))for(var w=!1,F=0,S=_.length;F<S;F++){3!==F||w||(F=2,w=!0);var E=_[0]+","+h,g=_[F]+","+h;if(g in u.hashindices)u.indices[p].push(u.hashindices[g]);else{var O=_[F].split("/"),B=O.length-1;if(u.verts.push(+s[3*(O[0]-1)+0]),u.verts.push(+s[3*(O[0]-1)+1]),u.verts.push(+s[3*(O[0]-1)+2]),o.length){var L=n.enableWTextureCoord?3:2;u.textures.push(+o[(O[1]-1)*L+0]),u.textures.push(+o[(O[1]-1)*L+1]),n.enableWTextureCoord&&u.textures.push(+o[(O[1]-1)*L+2])}u.norms.push(+l[3*(O[B]-1)+0]),u.norms.push(+l[3*(O[B]-1)+1]),u.norms.push(+l[3*(O[B]-1)+2]),u.materialIndices.push(h),u.hashindices[g]=u.index,u.indices[p].push(u.hashindices[g]),u.index+=1}3===F&&w&&u.indices[p].push(u.hashindices[E])}}}i.vertices=u.verts,i.vertexNormals=u.norms,i.textures=u.textures,i.vertexMaterialIndices=u.materialIndices,i.indices=n.indicesPerMaterial?u.indices:u.indices[p],i.materialNames=c,i.materialIndices=f,i.materialsByIndex={},n.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}return n(e,[{key:"calculateTangentsAndBitangents",value:function(){var e={};e.tangents=[].concat(r(new Array(this.vertices.length))).map(function(e){return 0}),e.bitangents=[].concat(r(new Array(this.vertices.length))).map(function(e){return 0});var t=void 0;t=Array.isArray(this.indices[0])?[].concat.apply([],this.indices):this.indices;for(var a=this.vertices,n=this.vertexNormals,i=this.textures,s=0;s<t.length;s+=3){var l=t[s+0],o=t[s+1],u=t[s+2],c=a[3*l+0],f=a[3*l+1],h=a[3*l+2],p=i[2*l+0],v=i[2*l+1],d=a[3*o+0],y=a[3*o+1],m=a[3*o+2],M=i[2*o+0],b=i[2*o+1],x=a[3*u+0],I=a[3*u+1],A=a[3*u+2],_=i[2*u+0],k=i[2*u+1],T=d-c,w=y-f,F=m-h,S=x-c,E=I-f,g=A-h,O=M-p,B=b-v,L=_-p,N=k-v,R=O*N-B*L,P=1/(Math.abs(R<1e-4)?1:R),D=(T*N-S*B)*P,C=(w*N-E*B)*P,U=(F*N-g*B)*P,j=(S*O-T*L)*P,z=(E*O-w*L)*P,H=(g*O-F*L)*P,W=n[3*l+0],G=n[3*l+1],V=n[3*l+2],K=n[3*o+0],q=n[3*o+1],X=n[3*o+2],Y=n[3*u+0],J=n[3*u+1],Q=n[3*u+2],Z=D*W+C*G+U*V,ee=D*K+C*q+U*X,te=D*Y+C*J+U*Q,re=D-W*Z,ae=C-G*Z,ne=U-V*Z,ie=D-K*ee,se=C-q*ee,le=U-X*ee,oe=D-Y*te,ue=C-J*te,ce=U-Q*te,fe=Math.sqrt(re*re+ae*ae+ne*ne),he=Math.sqrt(ie*ie+se*se+le*le),pe=Math.sqrt(oe*oe+ue*ue+ce*ce),ve=j*W+z*G+H*V,de=j*K+z*q+H*X,ye=j*Y+z*J+H*Q,me=j-W*ve,Me=z-G*ve,be=H-V*ve,xe=j-K*de,Ie=z-q*de,Ae=H-X*de,_e=j-Y*ye,ke=z-J*ye,Te=H-Q*ye,we=Math.sqrt(me*me+Me*Me+be*be),Fe=Math.sqrt(xe*xe+Ie*Ie+Ae*Ae),Se=Math.sqrt(_e*_e+ke*ke+Te*Te);e.tangents[3*l+0]+=re/fe,e.tangents[3*l+1]+=ae/fe,e.tangents[3*l+2]+=ne/fe,e.tangents[3*o+0]+=ie/he,e.tangents[3*o+1]+=se/he,e.tangents[3*o+2]+=le/he,e.tangents[3*u+0]+=oe/pe,e.tangents[3*u+1]+=ue/pe,e.tangents[3*u+2]+=ce/pe,e.bitangents[3*l+0]+=me/we,e.bitangents[3*l+1]+=Me/we,e.bitangents[3*l+2]+=be/we,e.bitangents[3*o+0]+=xe/Fe,e.bitangents[3*o+1]+=Ie/Fe,e.bitangents[3*o+2]+=Ae/Fe,e.bitangents[3*u+0]+=_e/Se,e.bitangents[3*u+1]+=ke/Se,e.bitangents[3*u+2]+=Te/Se}this.tangents=e.tangents,this.bitangents=e.bitangents}},{key:"makeBufferData",value:function(e){var t=this.vertices.length/3,r=new ArrayBuffer(e.stride*t);r.numItems=t;for(var a=new DataView(r),n=0,s=0;n<t;n++){s=n*e.stride;var l=!0,o=!1,u=void 0;try{for(var c,f=e.attributes[Symbol.iterator]();!(l=(c=f.next()).done);l=!0){var h=c.value,p=s+e[h.key].offset;switch(h.key){case i.Layout.POSITION.key:a.setFloat32(p,this.vertices[3*n],!0),a.setFloat32(p+4,this.vertices[3*n+1],!0),a.setFloat32(p+8,this.vertices[3*n+2],!0);break;case i.Layout.UV.key:a.setFloat32(p,this.textures[2*n],!0),a.setFloat32(p+4,this.vertices[2*n+1],!0);break;case i.Layout.NORMAL.key:a.setFloat32(p,this.vertexNormals[3*n],!0),a.setFloat32(p+4,this.vertexNormals[3*n+1],!0),a.setFloat32(p+8,this.vertexNormals[3*n+2],!0);break;case i.Layout.MATERIAL_INDEX.key:a.setInt16(p,this.vertexMaterialIndices[n],!0);break;case i.Layout.AMBIENT.key:var v=this.vertexMaterialIndices[n],d=this.materialsByIndex[v];if(!d)break;a.setFloat32(p,d.ambient[0],!0),a.setFloat32(p+4,d.ambient[1],!0),a.setFloat32(p+8,d.ambient[2],!0);break;case i.Layout.DIFFUSE.key:var y=this.vertexMaterialIndices[n],m=this.materialsByIndex[y];if(!m)break;a.setFloat32(p,m.diffuse[0],!0),a.setFloat32(p+4,m.diffuse[1],!0),a.setFloat32(p+8,m.diffuse[2],!0);break;case i.Layout.SPECULAR.key:var M=this.vertexMaterialIndices[n],b=this.materialsByIndex[M];if(!b)break;a.setFloat32(p,b.specular[0],!0),a.setFloat32(p+4,b.specular[1],!0),a.setFloat32(p+8,b.specular[2],!0);break;case i.Layout.SPECULAR_EXPONENT.key:var x=this.vertexMaterialIndices[n],I=this.materialsByIndex[x];if(!I)break;a.setFloat32(p,I.specularExponent,!0);break;case i.Layout.EMISSIVE.key:var A=this.vertexMaterialIndices[n],_=this.materialsByIndex[A];if(!_)break;a.setFloat32(p,_.emissive[0],!0),a.setFloat32(p+4,_.emissive[1],!0),a.setFloat32(p+8,_.emissive[2],!0);break;case i.Layout.TRANSMISSION_FILTER.key:var k=this.vertexMaterialIndices[n],T=this.materialsByIndex[k];if(!T)break;a.setFloat32(p,T.transmissionFilter[0],!0),a.setFloat32(p+4,T.transmissionFilter[1],!0),a.setFloat32(p+8,T.transmissionFilter[2],!0);break;case i.Layout.DISSOLVE.key:var w=this.vertexMaterialIndices[n],F=this.materialsByIndex[w];if(!F)break;a.setFloat32(p,F.dissolve,!0);break;case i.Layout.ILLUMINATION.key:var S=this.vertexMaterialIndices[n],E=this.materialsByIndex[S];if(!E)break;a.setInt16(p,E.illumination,!0);break;case i.Layout.REFRACTION_INDEX.key:var g=this.vertexMaterialIndices[n],O=this.materialsByIndex[g];if(!O)break;a.setFloat32(p,O.refractionIndex,!0);break;case i.Layout.SHARPNESS.key:var B=this.vertexMaterialIndices[n],L=this.materialsByIndex[B];if(!L)break;a.setFloat32(p,L.sharpness,!0);break;case i.Layout.ANTI_ALIASING.key:var N=this.vertexMaterialIndices[n],R=this.materialsByIndex[N];if(!R)break;a.setInt16(p,R.antiAliasing,!0)}}}catch(e){o=!0,u=e}finally{try{!l&&f.return&&f.return()}finally{if(o)throw u}}}return r}},{key:"makeIndexBufferData",value:function(){var e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}},{key:"addMaterialLibrary",value:function(e){for(var t in e.materials)if(t in this.materialIndices){var r=e.materials[t],a=this.materialIndices[r.name];this.materialsByIndex[a]=r}}}]),e}();exports.default=s},function(e,exports,t){"use strict";function r(e){return Array.isArray(e)?e:Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=exports.Material=function e(t){a(this,e),this.name=t,this.ambient=[0,0,0],this.diffuse=[0,0,0],this.specular=[0,0,0],this.emissive=[0,0,0],this.transmissionFilter=[0,0,0],this.dissolve=0,this.specularExponent=0,this.transparency=0,this.illumination=0,this.refractionIndex=1,this.sharpness=0,this.mapDiffuse=null,this.mapAmbient=null,this.mapSpecular=null,this.mapSpecularExponent=null,this.mapDissolve=null,this.antiAliasing=!1,this.mapBump=null,this.mapDisplacement=null,this.mapDecal=null,this.mapEmissive=null,this.mapReflections=[]};exports.MaterialLibrary=function(){function e(t){a(this,e),this.data=t,this.currentMaterial=null,this.materials={},this.parse()}return n(e,[{key:"parse_newmtl",value:function(e){var t=e[0];this.currentMaterial=new i(t),this.materials[t]=this.currentMaterial}},{key:"parseColor",value:function(e){if("spectral"!=e[0]&&"xyz"!=e[0]){if(3==e.length)return e.map(parseFloat);var t=parseFloat(e[0]);return[t,t,t]}}},{key:"parse_Ka",value:function(e){this.currentMaterial.ambient=this.parseColor(e)}},{key:"parse_Kd",value:function(e){this.currentMaterial.diffuse=this.parseColor(e)}},{key:"parse_Ks",value:function(e){this.currentMaterial.specular=this.parseColor(e)}},{key:"parse_Ke",value:function(e){this.currentMaterial.emissive=this.parseColor(e)}},{key:"parse_Tf",value:function(e){this.currentMaterial.transmissionFilter=this.parseColor(e)}},{key:"parse_d",value:function(e){this.currentMaterial.dissolve=parseFloat(e.pop())}},{key:"parse_illum",value:function(e){this.currentMaterial.illumination=parseInt(e[0])}},{key:"parse_Ni",value:function(e){this.currentMaterial.refractionIndex=parseFloat(e[0])}},{key:"parse_Ns",value:function(e){this.currentMaterial.specularExponent=parseInt(e[0])}},{key:"parse_sharpness",value:function(e){this.currentMaterial.sharpness=parseInt(e[0])}},{key:"parse_cc",value:function(e,t){t.colorCorrection="on"==e[0]}},{key:"parse_blendu",value:function(e,t){t.horizontalBlending="on"==e[0]}},{key:"parse_blendv",value:function(e,t){t.verticalBlending="on"==e[0]}},{key:"parse_boost",value:function(e,t){t.boostMipMapSharpness=parseFloat(e[0])}},{key:"parse_mm",value:function(e,t){t.modifyTextureMap.brightness=parseFloat(e[0]),t.modifyTextureMap.contrast=parseFloat(e[1])}},{key:"parse_ost",value:function(e,t,r){for(;e.length<3;)e.push(r);t.u=parseFloat(e[0]),t.v=parseFloat(e[1]),t.w=parseFloat(e[2])}},{key:"parse_o",value:function(e,t){this.parse_ost(e,t.offset,0)}},{key:"parse_s",value:function(e,t){this.parse_ost(e,t.scale,1)}},{key:"parse_t",value:function(e,t){this.parse_ost(e,t.turbulence,0)}},{key:"parse_texres",value:function(e,t){t.textureResolution=parseFloat(e[0])}},{key:"parse_clamp",value:function(e,t){t.clamp="on"==e[0]}},{key:"parse_bm",value:function(e,t){t.bumpMultiplier=parseFloat(e[0])}},{key:"parse_imfchan",value:function(e,t){t.imfChan=e[0]}},{key:"parse_type",value:function(e,t){t.reflectionType=e[0]}},{key:"parseOptions",value:function(e){var t={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null},r=void 0,a=void 0,n={};for(e.reverse();e.length;){var i=e.pop();i.startsWith("-")?(r=i.substr(1),n[r]=[]):n[r].push(i)}for(r in n)if(n.hasOwnProperty(r)){a=n[r];var s=this["parse_"+r];s&&s.bind(this)(a,t)}return t}},{key:"parseMap",value:function(e){var t=void 0,a=void 0;if(e[0].startsWith("-"))t=e.pop(),a=e;else{var n=r(e);t=n[0],a=n.slice(1)}return a=this.parseOptions(a),a.filename=t,a}},{key:"parse_map_Ka",value:function(e){this.currentMaterial.mapAmbient=this.parseMap(e)}},{key:"parse_map_Kd",value:function(e){this.currentMaterial.mapDiffuse=this.parseMap(e)}},{key:"parse_map_Ks",value:function(e){this.currentMaterial.mapSpecular=this.parseMap(e)}},{key:"parse_map_Ke",value:function(e){this.currentMaterial.mapEmissive=this.parseMap(e)}},{key:"parse_map_Ns",value:function(e){this.currentMaterial.mapSpecularExponent=this.parseMap(e)}},{key:"parse_map_d",value:function(e){this.currentMaterial.mapDissolve=this.parseMap(e)}},{key:"parse_map_aat",value:function(e){this.currentMaterial.antiAliasing="on"==e[0]}},{key:"parse_map_bump",value:function(e){this.currentMaterial.mapBump=this.parseMap(e)}},{key:"parse_bump",value:function(e){this.parse_map_bump(e)}},{key:"parse_disp",value:function(e){this.currentMaterial.mapDisplacement=this.parseMap(e)}},{key:"parse_decal",value:function(e){this.currentMaterial.mapDecal=this.parseMap(e)}},{key:"parse_refl",value:function(e){this.currentMaterial.mapReflections.push(this.parseMap(e))}},{key:"parse",value:function(){var e=this.data.split(/\r?\n/),t=!0,a=!1,n=void 0;try{for(var i,s=e[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var l=i.value;if((l=l.trim())&&!l.startsWith("#")){var o=l.split(/\s/),u=void 0,c=o,f=r(c);u=f[0],o=f.slice(1);var h=this["parse_"+u];h&&h.bind(this)(o)}}}catch(e){a=!0,n=e}finally{try{!t&&s.return&&s.return()}finally{if(a)throw n}}delete this.data,this.currentMaterial=null}}]),e}()},function(e,exports,t){e.exports=t(4)},function(e,exports,t){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.version=exports.deleteMeshBuffers=exports.initMeshBuffers=exports.downloadMeshes=exports.downloadModels=exports.Layout=exports.MaterialLibrary=exports.Material=exports.Mesh=void 0;var r=t(1),a=function(e){return e&&e.__esModule?e:{default:e}}(r),n=t(2),i=t(0),s=t(5);exports.Mesh=a.default,exports.Material=n.Material,exports.MaterialLibrary=n.MaterialLibrary,exports.Layout=i.Layout,exports.downloadModels=s.downloadModels,exports.downloadMeshes=s.downloadMeshes,exports.initMeshBuffers=s.initMeshBuffers,exports.deleteMeshBuffers=s.deleteMeshBuffers,exports.version="1.1.3"},function(e,exports,t){"use strict";function r(e,t){var r=["mapDiffuse","mapAmbient","mapSpecular","mapDissolve","mapBump","mapDisplacement","mapDecal","mapEmissive"];t.endsWith("/")||(t+="/");var a=[];for(var n in e.materials)if(e.materials.hasOwnProperty(n)){n=e.materials[n];var i=!0,s=!1,l=void 0;try{for(var o,u=r[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var c=o.value;(function(e){var r=n[e];if(!r)return"continue";var i=t+r.filename;a.push(fetch(i).then(function(e){if(!e.ok)throw new Error;return e.blob()}).then(function(e){var t=new Image;return t.src=URL.createObjectURL(e),r.texture=t,new Promise(function(e){return t.onload=e})}).catch(function(){}))})(c)}}catch(e){s=!0,l=e}finally{try{!i&&u.return&&u.return()}finally{if(s)throw l}}}return Promise.all(a)}function a(e){var t=[],a=!0,n=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var f=s.value;!function(e){var a=[];if(!e.obj)throw new Error('"obj" attribute of model object not set. The .obj file is required to be set in order to use downloadModels()');var n={};n.indicesPerMaterial=!!e.indicesPerMaterial,n.calcTangentsAndBitangents=!!e.calcTangentsAndBitangents;var i=e.name;if(!i){var s=e.obj.split("/");i=s[s.length-1].replace(".obj","")}if(a.push(Promise.resolve(i)),a.push(fetch(e.obj).then(function(e){return e.text()}).then(function(e){return new u.default(e,n)})),e.mtl){var l=e.mtl;"boolean"==typeof l&&(l=e.obj.replace(/\.obj$/,".mtl")),a.push(fetch(l).then(function(e){return e.text()}).then(function(t){var a=new c.MaterialLibrary(t);if(!1!==e.downloadMtlTextures){var n=e.mtlTextureRoot;return n||(n=l.substr(0,l.lastIndexOf("/"))),Promise.all([Promise.resolve(a),r(a,n)])}return Promise.all(Promise.resolve(a))}).then(function(e){return e[0]}))}t.push(Promise.all(a))}(f)}}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}return Promise.all(t).then(function(e){var t={},r=!0,a=!1,n=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done);r=!0){var o=i.value,u=l(o,3),c=u[0],f=u[1],h=u[2];f.name=c,h&&f.addMaterialLibrary(h),t[c]=f}}catch(e){a=!0,n=e}finally{try{!r&&s.return&&s.return()}finally{if(a)throw n}}return t})}function n(e,t,r){void 0===r&&(r={});var a=[];for(var n in e){(function(t){if(!e.hasOwnProperty(t))return"continue";var r=e[t];a.push(fetch(r).then(function(e){return e.text()}).then(function(e){return[t,new u.default(e)]}))})(n)}Promise.all(a).then(function(e){var a=!0,n=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var u=s.value,c=l(u,2),f=c[0],h=c[1];r[f]=h}}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}return t(r)})}function i(e,t){t.normalBuffer=f(e,e.ARRAY_BUFFER,t.vertexNormals,3),t.textureBuffer=f(e,e.ARRAY_BUFFER,t.textures,t.textureStride),t.vertexBuffer=f(e,e.ARRAY_BUFFER,t.vertices,3),t.indexBuffer=f(e,e.ELEMENT_ARRAY_BUFFER,t.indices,1)}function s(e,t){e.deleteBuffer(t.normalBuffer),e.deleteBuffer(t.textureBuffer),e.deleteBuffer(t.vertexBuffer),e.deleteBuffer(t.indexBuffer)}Object.defineProperty(exports,"__esModule",{value:!0});var l=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var s,l=e[Symbol.iterator]();!(a=(s=l.next()).done)&&(r.push(s.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&l.return&&l.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();exports.downloadModels=a,exports.downloadMeshes=n,exports.initMeshBuffers=i,exports.deleteMeshBuffers=s;var o=t(1),u=function(e){return e&&e.__esModule?e:{default:e}}(o),c=t(2),f=(t(0),function(e,t,r,a){var n=e.createBuffer(),i=t===e.ARRAY_BUFFER?Float32Array:Uint16Array;return e.bindBuffer(t,n),e.bufferData(t,new i(r),e.STATIC_DRAW),n.itemSize=a,n.numItems=r.length/a,n})}])});

/***/ }),

/***/ "./app/mesh.obj":
/*!**********************!*\
  !*** ./app/mesh.obj ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var webgl_obj_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webgl-obj-loader */ "./node_modules/webgl-obj-loader/dist/webgl-obj-loader.min.js");
/* harmony import */ var webgl_obj_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webgl_obj_loader__WEBPACK_IMPORTED_MODULE_0__);

  ;
  const source = "#\n# object Teapot001\n#\n\nv  7.0000 0.0000 12.0000\nv  4.9700 -4.9700 12.0000\nv  4.9811 -4.9811 12.4922\nv  7.0156 0.0000 12.4922\nv  5.3250 -5.3250 12.0000\nv  7.5000 0.0000 12.0000\nv  0.0000 -7.0000 12.0000\nv  0.0000 -7.0156 12.4922\nv  0.0000 -7.5000 12.0000\nv  -5.1387 -4.9700 12.0000\nv  -5.0022 -4.9811 12.4922\nv  -5.3250 -5.3250 12.0000\nv  -7.0000 0.0000 12.0000\nv  -7.0156 0.0000 12.4922\nv  -7.5000 0.0000 12.0000\nv  -4.9700 4.9700 12.0000\nv  -4.9811 4.9811 12.4922\nv  -5.3250 5.3250 12.0000\nv  0.0000 7.0000 12.0000\nv  0.0000 7.0156 12.4922\nv  0.0000 7.5000 12.0000\nv  4.9700 4.9700 12.0000\nv  4.9811 4.9811 12.4922\nv  5.3250 5.3250 12.0000\nv  6.5453 -6.5453 8.1094\nv  9.2188 0.0000 8.1094\nv  7.1000 -7.1000 4.5000\nv  10.0000 0.0000 4.5000\nv  0.0000 -9.2188 8.1094\nv  0.0000 -10.0000 4.5000\nv  -6.5453 -6.5453 8.1094\nv  -7.1000 -7.1000 4.5000\nv  -9.2188 0.0000 8.1094\nv  -10.0000 0.0000 4.5000\nv  -6.5453 6.5453 8.1094\nv  -7.1000 7.1000 4.5000\nv  0.0000 9.2188 8.1094\nv  0.0000 10.0000 4.5000\nv  6.5453 6.5453 8.1094\nv  7.1000 7.1000 4.5000\nv  6.2125 -6.2125 1.9219\nv  8.7500 0.0000 1.9219\nv  5.3250 -5.3250 0.7500\nv  7.5000 0.0000 0.7500\nv  0.0000 -8.7500 1.9219\nv  0.0000 -7.5000 0.7500\nv  -6.2125 -6.2125 1.9219\nv  -5.3250 -5.3250 0.7500\nv  -8.7500 0.0000 1.9219\nv  -7.5000 0.0000 0.7500\nv  -6.2125 6.2125 1.9219\nv  -5.3250 5.3250 0.7500\nv  0.0000 8.7500 1.9219\nv  0.0000 7.5000 0.7500\nv  6.2125 6.2125 1.9219\nv  5.3250 5.3250 0.7500\nv  4.5595 -4.5595 0.2344\nv  6.4219 0.0000 0.2344\nv  0.0000 0.0000 0.0000\nv  0.0000 -6.4219 0.2344\nv  -4.5595 -4.5595 0.2344\nv  -6.4219 0.0000 0.2344\nv  -4.5595 4.5595 0.2344\nv  0.0000 6.4219 0.2344\nv  4.5595 4.5595 0.2344\nv  -8.0000 0.0000 10.1250\nv  -7.7500 -1.1250 10.6875\nv  -12.5938 -1.1250 10.4766\nv  -12.0625 0.0000 9.9844\nv  -14.2500 -1.1250 9.0000\nv  -13.5000 0.0000 9.0000\nv  -7.5000 0.0000 11.2500\nv  -13.1250 0.0000 10.9688\nv  -15.0000 0.0000 9.0000\nv  -7.7500 1.1250 10.6875\nv  -12.5938 1.1250 10.4766\nv  -14.2500 1.1250 9.0000\nv  -13.1719 -1.1250 6.2695\nv  -12.6875 0.0000 6.7500\nv  -9.7500 -1.1250 3.7500\nv  -13.6563 0.0000 5.7891\nv  -9.5000 0.0000 3.0000\nv  -13.1719 1.1250 6.2695\nv  -9.7500 1.1250 3.7500\nv  8.5000 0.0000 7.1250\nv  8.5000 -2.4750 5.0625\nv  12.6875 -1.7062 8.1094\nv  11.9375 0.0000 9.0000\nv  15.0000 -0.9375 12.0000\nv  13.5000 0.0000 12.0000\nv  8.5000 0.0000 3.0000\nv  13.4375 0.0000 7.2187\nv  16.5000 0.0000 12.0000\nv  8.5000 2.4750 5.0625\nv  12.6875 1.7062 8.1094\nv  15.0000 0.9375 12.0000\nv  15.6328 -0.7500 12.3340\nv  14.1250 0.0000 12.2813\nv  15.0000 -0.5625 12.0000\nv  14.0000 0.0000 12.0000\nv  17.1406 0.0000 12.3867\nv  16.0000 0.0000 12.0000\nv  15.6328 0.7500 12.3340\nv  15.0000 0.5625 12.0000\nv  1.1552 -1.1552 14.9063\nv  1.6250 0.0000 14.9063\nv  0.0000 0.0000 15.7500\nv  0.7100 -0.7100 13.5000\nv  1.0000 0.0000 13.5000\nv  0.0000 -1.6250 14.9063\nv  0.0000 -1.0000 13.5000\nv  -1.1552 -1.1552 14.9063\nv  -0.7100 -0.7100 13.5000\nv  -1.6250 0.0000 14.9063\nv  -1.0000 0.0000 13.5000\nv  -1.1552 1.1552 14.9063\nv  -0.7100 0.7100 13.5000\nv  0.0000 1.6250 14.9063\nv  0.0000 1.0000 13.5000\nv  1.1552 1.1552 14.9063\nv  0.7100 0.7100 13.5000\nv  2.9288 -2.9288 12.7500\nv  4.1250 0.0000 12.7500\nv  4.6150 -4.6150 12.0000\nv  6.5000 0.0000 12.0000\nv  0.0000 -4.1250 12.7500\nv  0.0000 -6.5000 12.0000\nv  -2.9288 -2.9288 12.7500\nv  -4.6150 -4.6150 12.0000\nv  -4.1250 0.0000 12.7500\nv  -6.5000 0.0000 12.0000\nv  -2.9288 2.9288 12.7500\nv  -4.6150 4.6150 12.0000\nv  0.0000 4.1250 12.7500\nv  0.0000 6.5000 12.0000\nv  2.9288 2.9288 12.7500\nv  4.6150 4.6150 12.0000\n# 137 vertices\n\nvn -0.9995 -0.0000 0.0317\nvn -0.7067 0.7067 0.0319\nvn -0.0966 0.0966 0.9906\nvn -0.1416 0.0000 0.9899\nvn 0.5936 -0.5936 0.5435\nvn 0.8400 0.0000 0.5425\nvn -0.0010 0.9996 0.0283\nvn -0.0008 0.1421 0.9899\nvn 0.0000 -0.8400 0.5425\nvn 0.7268 0.6636 -0.1773\nvn 0.0816 0.2165 0.9729\nvn -0.5949 -0.5971 0.5381\nvn 0.9994 -0.0148 0.0317\nvn 0.1496 -0.0134 0.9886\nvn -0.8403 0.0004 0.5422\nvn 0.7067 -0.7067 0.0319\nvn 0.0966 -0.0966 0.9906\nvn -0.5936 0.5936 0.5435\nvn 0.0000 -0.9995 0.0317\nvn -0.0000 -0.1416 0.9899\nvn -0.0000 0.8400 0.5425\nvn -0.7067 -0.7067 0.0319\nvn -0.0966 -0.0966 0.9906\nvn 0.5936 0.5936 0.5435\nvn 0.6738 -0.6738 0.3034\nvn 0.9532 -0.0000 0.3025\nvn 0.7028 -0.7028 -0.1107\nvn 0.9939 -0.0000 -0.1105\nvn -0.0000 -0.9532 0.3025\nvn -0.0000 -0.9939 -0.1105\nvn -0.6738 -0.6738 0.3034\nvn -0.7028 -0.7028 -0.1107\nvn -0.9532 0.0000 0.3025\nvn -0.9939 0.0000 -0.1105\nvn -0.6738 0.6738 0.3034\nvn -0.7028 0.7028 -0.1107\nvn 0.0000 0.9532 0.3025\nvn 0.0000 0.9939 -0.1105\nvn 0.6738 0.6738 0.3034\nvn 0.7028 0.7028 -0.1107\nvn 0.5792 -0.5792 -0.5735\nvn 0.8198 0.0000 -0.5726\nvn 0.4157 -0.4157 -0.8089\nvn 0.5888 -0.0000 -0.8083\nvn 0.0000 -0.8198 -0.5726\nvn -0.0000 -0.5888 -0.8083\nvn -0.5792 -0.5792 -0.5735\nvn -0.4157 -0.4157 -0.8089\nvn -0.8198 -0.0000 -0.5726\nvn -0.5888 0.0000 -0.8083\nvn -0.5792 0.5792 -0.5735\nvn -0.4157 0.4157 -0.8089\nvn -0.0000 0.8198 -0.5726\nvn 0.0000 0.5888 -0.8083\nvn 0.5792 0.5792 -0.5735\nvn 0.4157 0.4157 -0.8089\nvn 0.2016 -0.2016 -0.9585\nvn 0.2850 -0.0000 -0.9585\nvn 0.0000 -0.0000 -1.0000\nvn -0.0000 -0.2850 -0.9585\nvn -0.2016 -0.2016 -0.9585\nvn -0.2850 0.0000 -0.9585\nvn -0.2016 0.2016 -0.9585\nvn 0.0000 0.2850 -0.9585\nvn 0.2016 0.2016 -0.9585\nvn 0.0384 0.0031 -0.9993\nvn -0.0182 -0.9619 0.2727\nvn -0.0190 -0.9786 0.2047\nvn 0.2817 0.0145 -0.9594\nvn -0.2938 -0.9475 0.1264\nvn 0.9324 0.0422 -0.3590\nvn -0.0473 -0.0015 0.9989\nvn -0.4420 -0.0127 0.8969\nvn -0.9859 -0.0106 0.1669\nvn -0.0177 0.9631 0.2685\nvn -0.0097 0.9839 0.1786\nvn -0.2735 0.9565 0.1013\nvn -0.1217 -0.9875 -0.0998\nvn 0.8176 0.0138 0.5756\nvn -0.3352 -0.7946 -0.5061\nvn 0.6216 0.0294 0.7828\nvn -0.7747 -0.0079 -0.6322\nvn -0.5711 -0.0076 -0.8208\nvn -0.1055 0.9904 -0.0889\nvn -0.3009 0.8200 -0.4869\nvn -0.4862 0.0074 0.8738\nvn 0.3271 -0.9145 -0.2382\nvn 0.1595 -0.9869 0.0246\nvn -0.6970 -0.0236 0.7167\nvn -0.0062 -0.9245 0.3812\nvn -0.7234 -0.0562 0.6881\nvn 0.6538 0.0025 -0.7567\nvn 0.7677 0.0173 -0.6406\nvn 0.6465 0.0447 -0.7616\nvn 0.3456 0.9087 -0.2343\nvn 0.1845 0.9828 0.0081\nvn 0.0506 0.9476 0.3154\nvn 0.2319 -0.5821 0.7793\nvn 0.0415 -0.0704 0.9967\nvn 0.3158 0.9477 -0.0454\nvn 0.9011 -0.0135 -0.4334\nvn 0.9533 0.0371 0.2997\nvn -0.3219 0.0032 0.9468\nvn 0.3655 0.5783 0.7294\nvn 0.3394 -0.9333 -0.1174\nvn 0.6774 -0.6773 0.2871\nvn 0.9576 -0.0001 0.2882\nvn 0.0000 0.0000 1.0000\nvn 0.5955 -0.5952 0.5396\nvn 0.8436 -0.0002 0.5370\nvn -0.0001 -0.9576 0.2882\nvn -0.0002 -0.8436 0.5370\nvn -0.6773 -0.6774 0.2871\nvn -0.5952 -0.5955 0.5396\nvn -0.9576 0.0001 0.2882\nvn -0.8436 0.0002 0.5370\nvn -0.6774 0.6773 0.2871\nvn -0.5955 0.5952 0.5396\nvn 0.0001 0.9576 0.2882\nvn 0.0002 0.8436 0.5370\nvn 0.6773 0.6774 0.2871\nvn 0.5952 0.5955 0.5396\nvn 0.1942 -0.1942 0.9616\nvn 0.2754 0.0000 0.9613\nvn 0.2121 -0.2121 0.9539\nvn 0.3011 0.0000 0.9536\nvn 0.0000 -0.2754 0.9613\nvn 0.0000 -0.3011 0.9536\nvn -0.1942 -0.1942 0.9616\nvn -0.2121 -0.2121 0.9539\nvn -0.2754 -0.0000 0.9613\nvn -0.3011 -0.0000 0.9536\nvn -0.1942 0.1942 0.9616\nvn -0.2121 0.2121 0.9539\nvn -0.0000 0.2754 0.9613\nvn -0.0000 0.3011 0.9536\nvn 0.1942 0.1942 0.9616\nvn 0.2121 0.2121 0.9539\n# 138 vertex normals\n\nvt 2.0000 2.0000 0.0000\nvt 1.5000 2.0000 0.0000\nvt 1.5000 1.9500 0.0000\nvt 2.0000 1.9500 0.0000\nvt 1.5000 1.9000 0.0000\nvt 2.0000 1.9000 0.0000\nvt 1.0000 2.0000 0.0000\nvt 1.0000 1.9500 0.0000\nvt 1.0000 1.9000 0.0000\nvt 0.5000 2.0000 0.0000\nvt 0.5000 1.9500 0.0000\nvt 0.5000 1.9000 0.0000\nvt 0.0000 2.0000 0.0000\nvt 0.0000 1.9500 0.0000\nvt 0.0000 1.9000 0.0000\nvt 1.5000 1.4500 0.0000\nvt 2.0000 1.4500 0.0000\nvt 1.5000 1.0000 0.0000\nvt 2.0000 1.0000 0.0000\nvt 1.0000 1.4500 0.0000\nvt 1.0000 1.0000 0.0000\nvt 0.5000 1.4500 0.0000\nvt 0.5000 1.0000 0.0000\nvt 0.0000 1.4500 0.0000\nvt 0.0000 1.0000 0.0000\nvt 1.5000 0.7000 0.0000\nvt 2.0000 0.7000 0.0000\nvt 1.5000 0.4000 0.0000\nvt 2.0000 0.4000 0.0000\nvt 1.0000 0.7000 0.0000\nvt 1.0000 0.4000 0.0000\nvt 0.5000 0.7000 0.0000\nvt 0.5000 0.4000 0.0000\nvt 0.0000 0.7000 0.0000\nvt 0.0000 0.4000 0.0000\nvt 1.5000 0.2000 0.0000\nvt 2.0000 0.2000 0.0000\nvt 1.5000 0.0000 0.0000\nvt 1.0000 0.2000 0.0000\nvt 1.0000 0.0000 0.0000\nvt 0.5000 0.2000 0.0000\nvt 0.5000 0.0000 0.0000\nvt 0.0000 0.2000 0.0000\nvt 0.0000 0.0000 0.0000\nvt 0.7500 1.0000 0.0000\nvt 0.7500 0.7500 0.0000\nvt 1.0000 0.7500 0.0000\nvt 0.7500 0.5000 0.0000\nvt 1.0000 0.5000 0.0000\nvt 0.5000 0.7500 0.0000\nvt 0.5000 0.5000 0.0000\nvt 0.2500 1.0000 0.0000\nvt 0.2500 0.7500 0.0000\nvt 0.2500 0.5000 0.0000\nvt 0.0000 0.7500 0.0000\nvt 0.0000 0.5000 0.0000\nvt 0.7500 0.2500 0.0000\nvt 1.0000 0.2500 0.0000\nvt 0.7500 0.0000 0.0000\nvt 0.5000 0.2500 0.0000\nvt 0.2500 0.2500 0.0000\nvt 0.2500 0.0000 0.0000\nvt 0.0000 0.2500 0.0000\nvt 0.7500 0.4500 0.0000\nvt 0.5000 0.4500 0.0000\nvt 0.7500 0.9000 0.0000\nvt 0.5000 0.9000 0.0000\nvt 1.0000 0.4500 0.0000\nvt 1.0000 0.9000 0.0000\nvt 0.2500 0.4500 0.0000\nvt 0.0000 0.4500 0.0000\nvt 0.2500 0.9000 0.0000\nvt 0.0000 0.9000 0.0000\nvt 0.7500 0.9500 0.0000\nvt 0.5000 0.9500 0.0000\nvt 1.0000 0.9500 0.0000\nvt 0.2500 0.9500 0.0000\nvt 0.0000 0.9500 0.0000\n# 78 texture coords\n\ng Teapot001\nf 1/1/1 2/2/2 3/3/3 4/4/4 \nf 4/4/4 3/3/3 5/5/5 6/6/6 \nf 2/2/2 7/7/7 8/8/8 3/3/3 \nf 3/3/3 8/8/8 9/9/9 5/5/5 \nf 7/7/7 10/10/10 11/11/11 8/8/8 \nf 8/8/8 11/11/11 12/12/12 9/9/9 \nf 10/10/10 13/13/13 14/14/14 11/11/11 \nf 11/11/11 14/14/14 15/15/15 12/12/12 \nf 13/1/13 16/2/16 17/3/17 14/4/14 \nf 14/4/14 17/3/17 18/5/18 15/6/15 \nf 16/2/16 19/7/19 20/8/20 17/3/17 \nf 17/3/17 20/8/20 21/9/21 18/5/18 \nf 19/7/19 22/10/22 23/11/23 20/8/20 \nf 20/8/20 23/11/23 24/12/24 21/9/21 \nf 22/10/22 1/13/1 4/14/4 23/11/23 \nf 23/11/23 4/14/4 6/15/6 24/12/24 \nf 6/6/6 5/5/5 25/16/25 26/17/26 \nf 26/17/26 25/16/25 27/18/27 28/19/28 \nf 5/5/5 9/9/9 29/20/29 25/16/25 \nf 25/16/25 29/20/29 30/21/30 27/18/27 \nf 9/9/9 12/12/12 31/22/31 29/20/29 \nf 29/20/29 31/22/31 32/23/32 30/21/30 \nf 12/12/12 15/15/15 33/24/33 31/22/31 \nf 31/22/31 33/24/33 34/25/34 32/23/32 \nf 15/6/15 18/5/18 35/16/35 33/17/33 \nf 33/17/33 35/16/35 36/18/36 34/19/34 \nf 18/5/18 21/9/21 37/20/37 35/16/35 \nf 35/16/35 37/20/37 38/21/38 36/18/36 \nf 21/9/21 24/12/24 39/22/39 37/20/37 \nf 37/20/37 39/22/39 40/23/40 38/21/38 \nf 24/12/24 6/15/6 26/24/26 39/22/39 \nf 39/22/39 26/24/26 28/25/28 40/23/40 \nf 28/19/28 27/18/27 41/26/41 42/27/42 \nf 42/27/42 41/26/41 43/28/43 44/29/44 \nf 27/18/27 30/21/30 45/30/45 41/26/41 \nf 41/26/41 45/30/45 46/31/46 43/28/43 \nf 30/21/30 32/23/32 47/32/47 45/30/45 \nf 45/30/45 47/32/47 48/33/48 46/31/46 \nf 32/23/32 34/25/34 49/34/49 47/32/47 \nf 47/32/47 49/34/49 50/35/50 48/33/48 \nf 34/19/34 36/18/36 51/26/51 49/27/49 \nf 49/27/49 51/26/51 52/28/52 50/29/50 \nf 36/18/36 38/21/38 53/30/53 51/26/51 \nf 51/26/51 53/30/53 54/31/54 52/28/52 \nf 38/21/38 40/23/40 55/32/55 53/30/53 \nf 53/30/53 55/32/55 56/33/56 54/31/54 \nf 40/23/40 28/25/28 42/34/42 55/32/55 \nf 55/32/55 42/34/42 44/35/44 56/33/56 \nf 44/29/44 43/28/43 57/36/57 58/37/58 \nf 58/37/58 57/36/57 59/38/59 \nf 43/28/43 46/31/46 60/39/60 57/36/57 \nf 57/36/57 60/39/60 59/40/59 \nf 46/31/46 48/33/48 61/41/61 60/39/60 \nf 60/39/60 61/41/61 59/42/59 \nf 48/33/48 50/35/50 62/43/62 61/41/61 \nf 61/41/61 62/43/62 59/44/59 \nf 50/29/50 52/28/52 63/36/63 62/37/62 \nf 62/37/62 63/36/63 59/38/59 \nf 52/28/52 54/31/54 64/39/64 63/36/63 \nf 63/36/63 64/39/64 59/40/59 \nf 54/31/54 56/33/56 65/41/65 64/39/64 \nf 64/39/64 65/41/65 59/42/59 \nf 56/33/56 44/35/44 58/43/58 65/41/65 \nf 65/41/65 58/43/58 59/44/59 \nf 66/21/66 67/45/67 68/46/68 69/47/69 \nf 69/47/69 68/46/68 70/48/70 71/49/71 \nf 67/45/67 72/23/72 73/50/73 68/46/68 \nf 68/46/68 73/50/73 74/51/74 70/48/70 \nf 72/23/72 75/52/75 76/53/76 73/50/73 \nf 73/50/73 76/53/76 77/54/77 74/51/74 \nf 75/52/75 66/25/66 69/55/69 76/53/76 \nf 76/53/76 69/55/69 71/56/71 77/54/77 \nf 71/49/71 70/48/70 78/57/78 79/58/79 \nf 79/58/79 78/57/78 80/59/80 34/40/81 \nf 70/48/70 74/51/74 81/60/82 78/57/78 \nf 78/57/78 81/60/82 82/42/83 80/59/80 \nf 74/51/74 77/54/77 83/61/84 81/60/82 \nf 81/60/82 83/61/84 84/62/85 82/42/83 \nf 77/54/77 71/56/71 79/63/79 83/61/84 \nf 83/61/84 79/63/79 34/44/81 84/62/85 \nf 85/42/86 86/59/87 87/64/88 88/65/89 \nf 88/65/89 87/64/88 89/66/90 90/67/91 \nf 86/59/87 91/40/92 92/68/93 87/64/88 \nf 87/64/88 92/68/93 93/69/94 89/66/90 \nf 91/44/92 94/62/95 95/70/96 92/71/93 \nf 92/71/93 95/70/96 96/72/97 93/73/94 \nf 94/62/95 85/42/86 88/65/89 95/70/96 \nf 95/70/96 88/65/89 90/67/91 96/72/97 \nf 90/67/91 89/66/90 97/74/98 98/75/99 \nf 98/75/99 97/74/98 99/45/100 100/23/101 \nf 89/66/90 93/69/94 101/76/102 97/74/98 \nf 97/74/98 101/76/102 102/21/103 99/45/100 \nf 93/73/94 96/72/97 103/77/104 101/78/102 \nf 101/78/102 103/77/104 104/52/105 102/25/103 \nf 96/72/97 90/67/91 98/75/99 103/77/104 \nf 103/77/104 98/75/99 100/23/101 104/52/105 \nf 105/48/106 106/49/107 107/21/108 \nf 106/49/107 105/48/106 108/59/109 109/40/110 \nf 110/51/111 105/48/106 107/45/108 \nf 105/48/106 110/51/111 111/42/112 108/59/109 \nf 112/54/113 110/51/111 107/23/108 \nf 110/51/111 112/54/113 113/62/114 111/42/112 \nf 114/56/115 112/54/113 107/52/108 \nf 112/54/113 114/56/115 115/44/116 113/62/114 \nf 116/48/117 114/49/115 107/21/108 \nf 114/49/115 116/48/117 117/59/118 115/40/116 \nf 118/51/119 116/48/117 107/45/108 \nf 116/48/117 118/51/119 119/42/120 117/59/118 \nf 120/54/121 118/51/119 107/23/108 \nf 118/51/119 120/54/121 121/62/122 119/42/120 \nf 106/56/107 120/54/121 107/52/108 \nf 120/54/121 106/56/107 109/44/110 121/62/122 \nf 109/21/110 108/45/109 122/48/123 123/49/124 \nf 123/49/124 122/48/123 124/59/125 125/40/126 \nf 108/45/109 111/23/112 126/51/127 122/48/123 \nf 122/48/123 126/51/127 127/42/128 124/59/125 \nf 111/23/112 113/52/114 128/54/129 126/51/127 \nf 126/51/127 128/54/129 129/62/130 127/42/128 \nf 113/52/114 115/25/116 130/56/131 128/54/129 \nf 128/54/129 130/56/131 131/44/132 129/62/130 \nf 115/21/116 117/45/118 132/48/133 130/49/131 \nf 130/49/131 132/48/133 133/59/134 131/40/132 \nf 117/45/118 119/23/120 134/51/135 132/48/133 \nf 132/48/133 134/51/135 135/42/136 133/59/134 \nf 119/23/120 121/52/122 136/54/137 134/51/135 \nf 134/51/135 136/54/137 137/62/138 135/42/136 \nf 121/52/122 109/25/110 123/56/124 136/54/137 \nf 136/54/137 123/56/124 125/44/126 137/62/138 \n# 112 polygons - 16 triangles\n";
  const mesh = new webgl_obj_loader__WEBPACK_IMPORTED_MODULE_0__.Mesh(source);
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mesh);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./app/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map