uniform float time;
in vec2 pos;
#define M_PI 3.1415926535897932384626433832795

float circle( vec2 p, float r ) {
    return length(p) - r;
}

float smin(float a, float b, float k) {
    if (k <= 0.0001) return min(a,b);
    k *= 4.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min(a,b) - h*h*k*(1.0/4.0);
}

void main() {
    float dist = smin(circle(pos, 0.5), circle(pos - vec2(2.0* sin(time), -0.2*cos(5.0*time)), 0.2), 0.1);
    // float dist = smin(circle(pos, 0.5), circle(pos - vec2(0.5* sin(time), -0.5*cos(5.0*time)), 0.2), 0.1);
    // float edge = clamp(9999.0 * dist * dist, 0.0, 1.0);
    float edge = -cos(99.0 * M_PI * clamp(dist, -0.01, 0.01));

    float mask = step(0.0, dist);
    vec3 colour = mix(vec3(1.0, 0.3, 0.0), vec3(1.0), mask);

    colour *= edge;

    gl_FragColor = vec4(colour, 1.0);
}