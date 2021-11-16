// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";
// Import pointer lock controls
import {  PointerLockControls } from "./src/PointerLockControls.js";
// import { OrbitControls } from './src/OrbitControls.js';
import { GLTFLoader } from "./src/GLTFLoader.js";
import { Sky } from './src/Sky.js';
import { LightProbeGenerator } from './src/LightProbeGenerator.js';
// Establish variables
let camera, scene, renderer, controls, material;
let sky, sun;

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
        				sky.scale.setScalar( 10000 );
        				scene.add( sky );

        				const skyUniforms = sky.material.uniforms;

        				skyUniforms[ 'turbidity' ].value = 10;
        				skyUniforms[ 'rayleigh' ].value = 1;
        				skyUniforms[ 'mieCoefficient' ].value = 0.1;
        				skyUniforms[ 'mieDirectionalG' ].value = 10;

                				const parameters = {
                					elevation: 5,
                					azimuth: 180,
                          exposure:0.05,
                				};
        /// GUI
        //
        // const effectController = {
				// 	turbidity: 10,
				// 	rayleigh: 3,
				// 	mieCoefficient: 0.005,
				// 	mieDirectionalG: 0.7,
				// 	elevation: 2,
				// 	azimuth: 180,
				// 	exposure: renderer.toneMappingExposure
				// };
        //

			}



// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {
  // Establish the camera
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
  camera.position.y = 50;


  // Define basic scene parameters
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0xffffff, 10, 750);




  // Define scene lighting
  const light = new THREE.HemisphereLight(0xeeeeff, 0x50505C, 1);
  light.position.set(0, 0, 0);
  scene.add(light);

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

    			// probe
  				lightProbe = new THREE.LightProbe();
  				scene.add( lightProbe );

  				// light
  				directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
  				directionalLight.position.set( 10, 10, 10 );
  				scene.add( directionalLight );

  // Generate the ground
  // let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
  // floorGeometry.rotateX(-Math.PI / 2);

  // // Vertex displacement pattern for ground
  // let position = floorGeometry.attributes.position;
  //
  // for (let i = 0, l = position.count; i < l; i++) {
  //   vertex.fromBufferAttribute(position, i);
  //
  //   vertex.x += Math.random() * 2 - 1;
  //   vertex.y += Math.random() * 2;
  //   vertex.z += Math.random() * 2 - 1;
  //
  //   position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  // }
  //
  // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
  //
  // position = floorGeometry.attributes.position;
  // const colorsFloor = [];
  //
  // for (let i = 0, l = position.count; i < l; i++) {
  //   color.setHSL(Math.random() * 1 + 1, 1, Math.random() * 1 + 1);
  //   colorsFloor.push(color.r, color.g, color.b);
  // }
  //
  // floorGeometry.setAttribute(
  //   "color",
  //   new THREE.Float32BufferAttribute(colorsFloor, 3)
  // );
  //
  // const floorMaterial = new THREE.MeshBasicMaterial({
  //   vertexColors: true
  // });
  //
  // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  //
  // // Insert completed floor into the scene
  // scene.add(floor);

// Variable for GLTF data
var mesh;
//3D file Loader

const loader = new GLTFLoader().load("./assets/city.glb",
  function(gltf) {
    // Scan loaded model for mesh and apply defined material if mesh is present
    // gltf.scene.traverse(function(child) {  });

    // Set position and scale
    mesh = gltf.scene;
    mesh.position.set(0, 0, 1);
    mesh.scale.set(3, 3, 3);
    // Add model to scene
    scene.add(mesh);
  },
  undefined,
  function(error) {
    console.error(error);
  }
);

  // First Image (red and purple glitch map)
  // Load image as texture
  const texture = new THREE.TextureLoader().load( './assets/glitch_map.jpg' );
  // Immediately use the texture for material creation
  const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
  // Create plane geometry
  const geometry = new THREE.PlaneGeometry( 320, 160 );
  // Apply image texture to plane geometry
  const plane = new THREE.Mesh( geometry, material );
  // Position plane geometry
  plane.position.set(0 , 150 , -150);
  // Place plane geometry
  scene.add( plane );


  //
  // // Second Image (Text with image and white background)
  // // Load image as texture
  // const texture2 = new THREE.TextureLoader().load( './assets/bouy.jpg' );
  // // immediately use the texture for material creation
  // const material2 = new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide } );
  // // Create plane geometry
  // const geometry2 = new THREE.PlaneGeometry( 200, 100 );
  // // Apply image texture to plane geometry
  // const plane2 = new THREE.Mesh( geometry2, material2 );
  // // Position plane geometry
  // plane2.position.set(0 , 100 , -200);
  // // Place plane geometry
  // scene.add( plane2 );






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
