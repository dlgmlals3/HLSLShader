// Author : SimonLee
// Title : Noise_4_ShowDevel
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float scale){
    pos *= scale;
    return smoothstep(0.0, 0.5, abs( ( sin (pos.x*3.1415) ) ) );
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;	
    vec3 color = vec3(0.);
    
    
	float t = 4.;
    st += noise(st * 5.) * t;
	color = vec3(1.) * smoothstep(.13, .14, noise(st));
    color += smoothstep(.15, .2, noise(st * 10.));
    color -= smoothstep(.35, .4, noise(st * 10.));
    

    gl_FragColor = vec4(1. -color, 1.0);
}
