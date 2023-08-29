// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    float ran = fract(sin(dot(st, vec2(12.9898, 78.233))) * 23458.2342);
    return ran;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
  	st *= 10.;
    vec2 fpos = fract(st);
    vec2 ipos = floor(st);
    
    vec3 color = vec3(random(fpos));
    gl_FragColor = vec4(color,1.0);
}