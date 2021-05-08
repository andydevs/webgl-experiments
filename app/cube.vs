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