import * as THREE from "three";
import { useEffect, useRef } from "react";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const rtScene = new THREE.Scene();
    const rtCamera = new THREE.PerspectiveCamera(
      45, // fov
      window.innerWidth / window.innerHeight, // ascpect ratio
      1, // near plane
      10000 // far plane
    );


    const clock = new THREE.Clock();
    clock.start();

    mountRef.current.appendChild(renderer.domElement);

    const animate = function () {
      const time = clock.getDelta();

      // draw render target scene to render target
      renderer.setRenderTarget(renderTarget);
      renderer.render(rtScene, rtCamera);
      renderer.setRenderTarget(null);

      // render the scene to the canvas
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    let onWindowResize = function () {
      rtCamera.aspect = window.innerWidth / window.innerHeight;
      rtCamera.updateProjectionMatrix();
      renderTarget.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);
    animate();

    return () => mountRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

function Sketch() {
  return <Scene />;
}

export default Sketch;
