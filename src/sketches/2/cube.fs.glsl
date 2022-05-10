varying vec2 v_uv;
uniform float u_time;

void main() {
  gl_FragColor = vec4(1.0, 0.0, sin(u_time * 10.0) + 0.5, 1.0).rgba;
}
