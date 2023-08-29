// Author : SimonLee
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
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
	vec2 pos = st;
    
    //pos = st.yx * vec2(10.,3.);
    pos = st.xy * vec2(8., 2.);
    
    // Add noise
    pos = rotate2d( noise(pos) ) * pos;

    // Draw lines
    float pattern = 0.;
    pattern = lines(pos.xy, 3.);
	//pattern = Line(0.5, pos.y, 0.05);
    
    vec3 color = vec3(pattern);
    
    gl_FragColor = vec4(color, 1.0);
}
