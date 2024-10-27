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


// this is really bad :(
vec3 getColour(float d1, float d2, float d3) {
    // vec3 slugColour1 = vec3(1.0, 0.3, 0.0);
    vec3 slugColour1 = vec3(1.0, 0.0, 0.0);
    // vec3 slugColour2 = 1.0 - slugColour1;
    vec3 slugColour2 = vec3(0.0, 1.0, 0.0);
    vec3 slugColour3 = vec3(0.0, 0.0, 1.0);

    // float dt = d1 + d2;
    // vec3 c = (1.0-d1/dt) * slugColour + (1.0-d2/dt) * (1.0-slugColour);

    // d1 = min(d1, 0.0000001);
    // d2 = min(d2, 0.0000001);
    
    float dt = abs(d1) + abs(d2) + abs(d3);
    // vec3 c = (1.0-d1/dt) * slugColour1 + (1.0-d2/dt) * slugColour2;

    // normalize distances
    d1 = abs(d1);
    d2 = abs(d2);
    d3 = abs(d3);
    // float maxn = max(d1, max(d2, d3));
    // float minn = min(d1, min(d2, d3));
    // d1 = (d1 - minn) / (maxn - minn);
    // d2 = (d2 - minn) / (maxn - minn);
    // d3 = (d3 - minn) / (maxn - minn);

    // GAMMA CORRECTED
    float g = 2.2;
    vec3 c1 = vec3(pow(slugColour1.r, g),
                    pow(slugColour1.g, g),
                    pow(slugColour1.b, g));
    vec3 c2 = vec3(pow(slugColour2.r, g),
                    pow(slugColour2.g, g),
                    pow(slugColour2.b, g));
    vec3 c3 = vec3(pow(slugColour3.r, g),
                    pow(slugColour3.g, g),
                    pow(slugColour3.b, g));
    vec3 c = (1.0-d1/dt) * c1 + (1.0-d2/dt) * c2 + (1.0-d3/dt)*c3;
    c = vec3(pow(c.r, 1.0/g),
             pow(c.g, 1.0/g),
             pow(c.b, 1.0/g));
    
    return c;
}

void main() {
    float d1 = circle(pos, 0.5);
    float speed = 1.2;
    float d2 = circle(pos - vec2(1.3* sin(speed*time), -0.2*cos(speed*5.0*time)), 0.2);
    // float d2 = circle(pos - vec2(0.9, 0.0), 0.2);
    float d3 = circle(pos - vec2(0.0, -cos(speed*time)), 0.2);
    // float d3 = circle(pos-vec2(999.0, 999.0), 0.2);

    float k = 0.1;
    float dist = smin(smin(d1, d2, k), d3, k);
    // float dist = smin(circle(pos, 0.5), circle(pos - vec2(0.5* sin(time), -0.5*cos(5.0*time)), 0.2), 0.1);
    // float edge = clamp(9999.0 * dist * dist, 0.0, 1.0);
    // TODO I don't really need to use PI here...
    float edge = -cos(99.0 * M_PI * clamp(dist, -0.01, 0.01));

    // you can mess with this if you want to colour outside the lines
    float mask = step(0.0, dist);

    // colours
    vec3 borderColour = vec3(1.0);
    vec3 innerColour = getColour(d1, d2, d3);
    vec3 colour = mix(innerColour, borderColour, mask);
    colour *= edge;

    gl_FragColor = vec4(colour, 1.0);
}