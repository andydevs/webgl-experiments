varying lowp vec3 vLighting;

void main() {
    lowp vec3 defaultColor = vec3(0.0, 0.67, 1.0);
    gl_FragColor = vec4(defaultColor * vLighting, 1.0);
}