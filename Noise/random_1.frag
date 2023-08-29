// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    float randomness = 7.;
    float val = fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 424231.552 * fract(u_time));
    return val;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
  	
    vec3 color = vec3(random(st));    
    gl_FragColor = vec4(color,1.0);
}