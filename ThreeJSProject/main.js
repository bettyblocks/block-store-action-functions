import './style.css'
import * as THREE from 'three';

import torus from './objects/torus';
import plane from './objects/plane';

// 3D Objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.pixelRatio = window.devicePixelRatio;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// reder === draw
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xFFFFFF);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
pointLight.position.set(500,500,0);

scene.add(pointLight, ambientLight, plane, torus);



function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera)

}

animate();