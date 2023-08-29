// Author: Simon.Lee
// Title: Gradient Noise by Ken Perlin
// Site : https://graphicsimon.tistory.com/23

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p) {
    p = 50. * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x  + p.y));
}

float random(vec2 st) 
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.2333))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = vec2(floor(st));
    vec2 f = fract(st);
    
    vec2 u = f * f * (3. - 2. * f);
    
    float ret = mix( mix( hash( i + vec2(0.0, 0.0 ) ), 
                          hash( i + vec2(1.0, 0.0 ) ), u.x),
                     mix( hash( i + vec2(0.0, 1.0) ),
                    	  hash( i + vec2(1.0, 1.0) ), u.x), u.y);                     
    return ret;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;	
    vec3 color = vec3(0.);
    float f = 0.;
    
    
    if (st.x < 0.) 
    {
        st += vec2(u_time / 3., 0);
    	f = noise(32.0 * st);
        
    }
    else 
    {
        st += vec2(u_time / 3., 0);
        st *= 8.0;
        mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
		f  = 0.5000 * noise( st ); st = m * st;
		f += 0.2500 * noise( st ); st = m * st;
		f += 0.1250 * noise( st ); st = m * st;
		f += 0.0625 * noise( st ); st = m * st;
    }
    
   	f = 0.5 + 0.5 * f;
    f *= smoothstep(0., 0.005, abs(st.x - 0.6));
    
    color = vec3(f, f, f);
    
    gl_FragColor = vec4(color, 1.0);
}