// Author: SimonLee
// Title: Noise
// Site : https://graphicsimon.tistory.com/22

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.141592

float random(vec2 st) 
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.2333))) * 43758.5453123);
}

float line(vec2 st, float thickness, float blur, bool reverse) 
{
    if (reverse) {
    	st.x = st.x * -1. + 1.;    
    }
    
	return smoothstep(st.x-thickness-blur, st.x-thickness+blur, st.y) -
        smoothstep(st.x+thickness-blur, st.x+thickness+blur, st.y);
}

float noise (in vec2 st) 
{
	vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1., 0.));
    float c = random(i + vec2(0., 1.));
    float d = random(i + vec2(1., 1));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + 
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;	
    
    vec3 color = vec3(0.);
    vec2 pos = vec2(st * 5.);
    
    vec2 i = floor(st);
    vec2 f = fract(st);

    color = vec3(noise(pos));
    gl_FragColor = vec4(color, 1.0);
}