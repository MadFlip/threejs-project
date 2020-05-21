import * as THREE from 'three/build/three.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, hlight, directionalLight, light, light2, controls;

function init() {
   scene = new THREE.Scene();
  //  scene.background = new THREE.Color(0x000000);
   camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
   camera.rotation.y = 45/180*Math.PI;
   camera.position.x = 320;
   camera.position.y = 200;
   camera.position.z = 360;

   renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
   renderer.setClearColor( 0xffffff, 0);
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement)

   controls = new OrbitControls(camera, renderer.domElement);
   controls.autoRotate = true;

   hlight = new THREE.AmbientLight(0x404040, 5);
   scene.add(hlight);

   directionalLight = new THREE.DirectionalLight(0x404040, 5);
   directionalLight.position.set(0,1,0);
   directionalLight.castShadow = true;
   scene.add(directionalLight);

   light = new THREE.PointLight(0x404040, 4);
   light.position.set(0, -800, 0);
   scene.add(light);

   light2 = new THREE.PointLight(0x404040, 5);
   light2.position.set(550, 1000, 550);
   scene.add(light2);

   let loader = new GLTFLoader();
   loader.load('object/scene.gltf', (gltf) => {
       gltf.scene.children[0].scale.set(1, 1, 1);
       scene.add(gltf.scene);
       animate();
   });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function updateCanvasSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
window.addEventListener('resize', updateCanvasSize);
