uniform float u_time;

varying vec2 v_uv;
varying vec2 v_position;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  // get the distance of the fragment from the center of the geometry face
  float d = distance(v_position, vec2(0.5, 0.5));

  // remap the distance and flip for a subtle gradient
  float rd = map(d, 0.0, 0.7, 1.0, 0.0);

  vec3 color = vec3(rd);


  // Edge detection
  // float ddxy = dFdx(v_position.x) + dFdy(v_position.y);
  // vec2 ddxy = 1.0 - (v_position / fwidth(v_position));
  vec2 ddxy = fwidth(v_position);

  vec2 e1 = (v_position / ddxy);



  /* if (d < 0.5) { */
  /*   color = vec3(d); */
  /* } */

  // vec3 color = vec3(v_position, 0.0);
  // vec3 color = vec3(v_position + vec2(0.5, 0.5), 0.0);
  // gl_FragColor = vec4(e1, 0.0, 1.0);
  gl_FragColor = vec4(e1, 0.0, 1.0);

  // gl_FragColor = vec4(1.0, 0.0, sin(u_time * 10.0) + 0.5, 1.0).rgba;
}
