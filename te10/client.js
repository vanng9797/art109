// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";
// Import pointer lock controls
import {
  PointerLockControls
} from "./src/PointerLockControls.js";
// import { OrbitControls } from './src/OrbitControls.js';
import {
  GLTFLoader
} from "./src/GLTFLoader.js";
import {
  Sky
} from './src/Sky.js';

// Establish variables
let camera, scene, renderer, controls, material, material0, material1, material2;
let sky, sun;

let mesh, mesh0, mesh1, mesh2;

let lightProbe;
let directionalLight;

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

function initSky() {

  // Add Sky

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 1;
  skyUniforms['mieCoefficient'].value = 0.1;
  skyUniforms['mieDirectionalG'].value = 10;

  const parameters = {
    elevation: 5,
    azimuth: 180,
    exposure: 0.05,
  };

}



// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {
  // Establish the camera
  camera = new THREE.PerspectiveCamera(57, window.innerWidth / window.innerHeight, 100, 20000);
  camera.position.y = 5000;
  camera.position.x = -500;
  camera.position.z = 0;
  // Define basic scene parameters
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x00000);
  scene.fog = new THREE.Fog(0xfdf2e9, 1, 1500);




  // Define scene lighting
  const light = new THREE.HemisphereLight(0xeeeeff, 0x50505C, 1);
  light.position.set(0, 0, 0);
  scene.add(light);

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-5000, 5000, 0);
  scene.add(directionalLight);
  //
  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xaed6f1, 0);
  ambientLight.position.set(-500, -500, 0);
  scene.add(ambientLight);



  // Define controls
  controls = new PointerLockControls(camera, document.body);




  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Listen
  instructions.addEventListener("click", function() {
    controls.lock();
  });
  // Remove overlays and begin controls on click
  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );



  // Generate the ground
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
  floorGeometry.rotateX(-Math.PI / 2);

  // Vertex displacement pattern for ground
  let position = floorGeometry.attributes.position;
  //



  // Generate objects (cubes)
    const boxGeometry = new THREE.BoxGeometry(15, 15, 15).toNonIndexed();

    position = boxGeometry.attributes.position;
    const colorsBox = [];

    for (let i = 0, l = position.count; i < l; i++) {
      color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      colorsBox.push(color.r, color.g, color.b);
    }

    boxGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsBox, 3)
    );

    for (let i = 0; i < 500; i++) {
      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xe8daef ,
        flatShading: true,
        vertexColors: true
      });
      boxMaterial.color.setHSL(
        Math.random() * 0.5 + 0.3,
        0.75,
        Math.random() * 0.7 + 0.5
      );

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 200 - 10) * 20-1000;
      box.position.y = Math.floor(Math.random() * 200) * 20 - 1000;
      box.position.z = Math.floor(Math.random() * 200 - 10) * 20-1500;

      // Insert completed boxes into the scene
      scene.add(box);
      objects.push(box);
    }




  //Cubes
  const geometry0 = new THREE.BoxGeometry(30, 30, 30);
  const material0 = new THREE.MeshStandardMaterial({
    roughness: 0,
    opacity: 0.80,
    transparent: true,
  });

  mesh0 = new THREE.Mesh(geometry0, material0);
  mesh0.position.set(0, 0, 1);
  mesh0.scale.set(3, 3, 3);
  mesh0.material.color.set(0xf4d03f);
  scene.add(mesh0);

  const geometry1 = new THREE.BoxGeometry(30, 30, 30);
  const material1 = new THREE.MeshStandardMaterial({
    roughness: 0,
    opacity: 0.80,
    transparent: true,
  });

  mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.position.set(300, 100, 1);
  mesh1.scale.set(3, 3, 3);
  mesh1.material.color.set(0x3498db);
  scene.add(mesh1);

  const geometry2 = new THREE.BoxGeometry(30, 30, 30);
  const material2 = new THREE.MeshStandardMaterial({
    roughness: 0,
    opacity: 0.80,
    transparent: true,
  });

  mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(600, 250, 1);
  mesh2.scale.set(3, 3, 3);
  mesh2.material.color.set(0xe74c3c);
  scene.add(mesh2);

  //transparent image

  // makeInstance(geometry, 'white', Math.PI * 0.5, './assets/welcome.png');


  // First Image (red and purple glitch map)
  // Load image as

  const texture = new THREE.TextureLoader().load('./assets/welcome.png');
  // Immediately use the texture for material creation
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });
  // Create plane geometry
  const geometry = new THREE.PlaneGeometry(1080 * 1.2, 720 * 1.2);
  // Apply image texture to plane geometry
  const plane = new THREE.Mesh(geometry, material);
  // Position plane geometry
  plane.position.set(1500, 1500, 0);
  plane.rotation.setFromVector3(new THREE.Vector3(0, -Math.PI / 2, 0));
  // Place plane geometry
  scene.add(plane);


  // Define Rendered and html document placement
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  initSky();
  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);
  render();
  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.render(scene, camera);

}


function render() {

  const time = performance.now() * 0.001;


  mesh0.position.y = Math.sin(time) * 20;
  mesh0.rotation.x = time * 0.45;
  mesh0.rotation.z = time * 0.50;

  mesh1.position.y = Math.sin(time) * 25 + 100;
  mesh1.rotation.x = time * 0.5 + 250;
  mesh1.rotation.z = time * 0.55;

  mesh2.position.y = Math.sin(time) * 30 + 250;
  mesh2.rotation.x = time * 0.55 + 500;
  mesh2.rotation.z = time * 0.60;

  // box.rotation.z = time * 0.60;

  renderer.render(scene, camera);
}
