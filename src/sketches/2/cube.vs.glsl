varying vec2 v_uv;
varying vec2 v_position;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  v_uv = uv;
  v_position.x = map(position.x, -1.0, 1.0, 0.0, 1.0);
  v_position.y = map(position.y, -1.0, 1.0, 0.0, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

