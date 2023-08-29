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

vec2 truchetPattern(in vec2 _st, in float _index) 
{
	_index = fract(((_index - 0.5) * 2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    }
    else if (_index > 0.5) {
        _st = vec2(1.0 - _st.x, _st.y);
    }
    else if (_index > 0.25) {
        _st = 1.0 - vec2(1.0 - _st.x, _st.y);
    }
    return _st;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
  	st *= 10.;
    vec2 fpos = fract(st);
    vec2 ipos = floor(st);
    vec2 tile = truchetPattern(fpos, random(ipos));
    float color = 0.0;
    
    color = smoothstep(tile.x - 0.3, tile.x, tile.y) -
        smoothstep(tile.x, tile.x + 0.3, tile.y);
    
    gl_FragColor = vec4(vec3(color),1.0);
}