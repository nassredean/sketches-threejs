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


  vec2 edgeUVS = abs(v_position - 0.5);
  float edge = step(0.49, (max(edgeUVS.x, edgeUVS.y) * 2.0));
  
  vec3 color = vec3(edge + rd);


  gl_FragColor = vec4(color, 1.0);
}
