import * as THREE from "three";
import { useEffect, useRef } from "react";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // scene setup
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //////////////Create some arbitrary objects in our scence
    //Let's create a red box
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xf06565 });
    const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    const boxObject = new THREE.Mesh(boxGeometry, redMaterial);
    boxObject.position.z = -10;
    scene.add(boxObject);

    ///And a blue plane behind it
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x7074ff });
    const plane = new THREE.PlaneBufferGeometry(
      window.innerWidth,
      window.innerHeight
    );
    const planeObject = new THREE.Mesh(plane, blueMaterial);
    planeObject.position.z = -15;
    scene.add(planeObject);

    const render = function () {
      requestAnimationFrame(render);

      //Make the box rotate on box axises
      boxObject.rotation.y += 0.01;
      boxObject.rotation.x += 0.01;

      //Finally, draw to the screen
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
