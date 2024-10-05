uniform float time;
in vec2 pos;

void main() {
    
    if (pos.x * pos.x + pos.y * pos.y > 0.25) {
        discard;
    }

    gl_FragColor = vec4(sin(time) * sign(pos.y), cos(time) * sign(pos.x), sin(time) * sign(pos.x * pos.x + pos.y * pos.y - 0.1), 1.0);
}