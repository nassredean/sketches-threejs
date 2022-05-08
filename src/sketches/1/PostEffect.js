import * as THREE from "three";

export default class PostEffect {
  constructor(texture) {
    this.uniforms = {
      // time elapsed since start
      time: {
        type: "f",
        value: 0,
      },

      resolution: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },

      // render target texture
      texture: {
        type: "t",
        value: texture,
      },
    };
    this.obj = this.createObj(texture);
    this.time = 1;
  }

  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: require("./postEffect.vs.glsl").default,
        fragmentShader: require("./postEffect.fs.glsl").default,
      })
    );
  }

  render(time) {
    this.uniforms.time.value += time * this.time;
  }

  resize() {
    this.uniforms.resolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  }
}
