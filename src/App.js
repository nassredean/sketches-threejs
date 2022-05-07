import * as THREE from "three";
import { useEffect, useRef } from "react";

import Title from "./components/Title";
import PostEffect from "./object3d/PostEffect";

import "./App.css";

function Page({ children }) {
  return <div className="page">{children}</div>;
}

const PostEffectCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
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
    const clock = new THREE.Clock();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    clock.start();

    const postEffect = new PostEffect(renderTarget.texture);
    scene.add(postEffect.obj)

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

//     let onWindowResize = function () {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

    // window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div className="post-effect-canvas" ref={mountRef}></div>;
};

function App() {
  return (
    <>
      <PostEffectCanvas />
      <Page>
        <Title />
      </Page>
    </>
  );
}

export default App;
