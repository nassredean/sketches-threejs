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
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add our box with custom shaders to the scene
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const cube = new Cube(boxGeo);
    scene.add(cube.obj)

    const render = function () {
      requestAnimationFrame(render);
      cube.obj.rotation.y += 0.01;
      cube.obj.rotation.x += 0.01;
      // update time uniform
      cube.uniforms.u_time.value = clock.getElapsedTime();
      // animation loop
      renderer.render(scene, camera);
    };

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
