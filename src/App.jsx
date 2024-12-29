import React from 'react';
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const canvasRef = useRef(null); 

  useEffect(() => {
    
    const canvas = canvasRef.current;

    
    const scene = new THREE.Scene();

    const image = new Image();
    const texture = new THREE.Texture(image);

    
    image.onload = () => {
      texture.needsUpdate = true;
    };

    
    image.src = '/lapiz-ore.png';

    
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5; 
    scene.add(camera);

    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);

    
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / sizes.width) * 2 - 1;
      mouseY = -(event.clientY / sizes.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    
    const tick = () => {
      mesh.rotation.x = mouseY * Math.PI;
      mesh.rotation.y = mouseX * Math.PI;

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    };

    tick();

    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default ThreeCanvas;