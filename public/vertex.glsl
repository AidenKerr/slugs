uniform float ratio;

out vec2 pos;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    pos = gl_Position.xy;
    pos *= vec2(ratio, 1.0);
}
