import * as THREE from "three";
import { useEffect, useRef } from "react";

import PostEffect from "./PostEffect";

const PostEffectCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("white"), 1.0);

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

    const postEffect = new PostEffect(renderTarget.texture);
    scene.add(postEffect.obj);

    const clock = new THREE.Clock();
    clock.start();

    mountRef.current.appendChild(renderer.domElement);

    const animate = function () {
      const time = clock.getDelta();

      // draw render target scene to render target
      renderer.setRenderTarget(renderTarget);
      renderer.render(rtScene, rtCamera);
      renderer.setRenderTarget(null);

      // update the post effect
      postEffect.render(time);

      // render the scene to the canvas
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    let onWindowResize = function () {
      rtCamera.aspect = window.innerWidth / window.innerHeight;
      rtCamera.updateProjectionMatrix();
      renderTarget.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
      postEffect.resize();
    };

    window.addEventListener("resize", onWindowResize, false);
    animate();

    return () => mountRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

function Sketch() {
  return <PostEffectCanvas />;
}

export default Sketch;
