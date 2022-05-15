import * as THREE from "three";
import { useEffect, useRef } from "react";
import Cube from './Cube';

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("blue"), 1.0);
    mountRef.current.appendChild(renderer.domElement);

    // Add our box with custom shaders to the scene
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const planeGeo = new THREE.PlaneGeometry(1, 1);
    const cube = new Cube(planeGeo);
    scene.add(cube.obj)

    const render = function() {
      requestAnimationFrame(render);

      // rotation of cube
      // cube.obj.rotation.y += 0.01;
      // cube.obj.rotation.x += 0.01;

      // update uniforms
      cube.uniforms.u_time.value = clock.getElapsedTime();

      renderer.render(scene, camera);
    };

    let onWindowResize = function() {
      const aspectRatio = window.innerWidth / window.innerHeight;
      let width, height;
      if (aspectRatio >= 1) {
        width = 1;
        height = (window.innerHeight / window.innerWidth) * width;
      } else {
        width = aspectRatio;
        height = 1;
      }
      camera.left = -width;
      camera.right = width;
      camera.top = height;
      camera.bottom = -height;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (cube.uniforms.u_resolution !== undefined) {
        cube.uniforms.u_resolution.value.x = window.innerWidth;
        cube.uniforms.u_resolution.value.y = window.innerHeight;
      }
    };

    window.addEventListener("resize", onWindowResize, false);
    render();

    return () => mountRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

function Sketch() {
  return <Scene />;
}

export default Sketch;
