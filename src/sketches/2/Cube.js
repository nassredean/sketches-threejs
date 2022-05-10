import * as THREE from "three";
import VS from './cube.vs.glsl';
import FS from './cube.fs.glsl';

export default class Cube {
  constructor(geometry) {
    this.uniforms = {
      u_time: { value: 0.0 },
    };
    this.obj = this.createObj(geometry);
  }

  createObj(geometry) {
    return new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: VS,
        fragmentShader: FS,
      })
    );
  }

  render(time) {
    this.uniforms.time.value += time;
  }
}
