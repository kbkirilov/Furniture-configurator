import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { texture } from "three/webgpu";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 250;
camera.position.y = 150;

// setting up lighting
const toplight = new THREE.DirectionalLight('white', 1)
toplight.position.set(0, 350, 0);
toplight.castShadow = true;
scene.add(toplight);

// setting HDRI lighting
const rgbeLoader = new RGBELoader();
rgbeLoader.load('hdri/photo_studio_broadway_hall_2k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  //scene.background = texture;
  scene.environment = texture;
})

// add the custom 3d model
let object;

// Object to store references to individual mesh parts
const meshParts = [];
let part1, part2, part3 // Adjust the number and names based on your model

const loader = new GLTFLoader();

loader.load(
  'models/gltf-ready/buzzi-float-blender-export-v2.gltf',
  function (gltf) {
    object = gltf.scene;
    scene.add(object);

    // Initialize an index to track the parts
    let index = 0;

    // Access and store each mesh part of the model
    object.traverse((child) => {
      if (child.isMesh) {
        meshParts[index] = child; // Store in array
        index++; // Increment index

        // Assign specific parts to their variables based on order
        if (meshParts.length === 1) {
          part1 = child;
        } else if (meshParts.length === 2) {
          part2 = child;
        } else if (meshParts.length === 3) {
          part3 = child;
        }

        // Log the stored part (optional)
        console.log("Stored part at index ", meshParts.length - 1);
      }
    });

    // function to change material
    function changeMaterial(part, color) {
        const material = new THREE.MeshStandardMaterial({color: new THREE.Color(parseInt(color))});
        if (part) {
          part.material = material;
          part.material.needsUpdate = true;
        }
    }
    // Add event listeners to thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', (event) => {
        const partNumber = parseInt(event.target.dataset.part);
        const color = event.target.dataset.color;

        // Change the material of the respective part
        if (partNumber === 1) changeMaterial(part1, color);
        if (partNumber === 2) changeMaterial(part2, color);
        if (partNumber === 3) changeMaterial(part3, color);
      });
    });

  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total*100) + '% loaded');
  },
  function (error) {
    console.error(error);
  },
)

// Function to update the right panel with information about each mesh part
function updateRightPanelInfo() {
  const part1Info = document.getElementById("mesh-part1-info");
  const part2Info = document.getElementById("mesh-part2-info");
  const part3Info = document.getElementById("mesh-part3-info");

  // Assuming these parts exist in the mesh and have properties you want to show
  if (object) {
    part1Info.textContent = `Name: ${meshParts[0].name}`;
    part2Info.textContent = `Name: ${object.children[1].name}`;
    part3Info.textContent = `Name: ${object.children[2].name}`;
  }
}

// Get the right panel element
const rightPanel = document.getElementById("right-panel");

// Function to resize canvas based on window size minus the right panel width
function resizeCanvas() {
    const rightPanelWidth = rightPanel.offsetWidth; // Get the width of the right panel
    const canvasWidth = window.innerWidth - rightPanelWidth; // Calculate available width for canvas
    const canvasHeight = window.innerHeight; // Full window height for canvas

    // Update the renderer and camera aspect ratio
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasWidth, canvasHeight); // Set the new size of the renderer
}

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor('#ededed');
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Set initial renderer size
resizeCanvas(); // Call it to set the size on load
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 250;
controls.minDistance = 180;
controls.target.set(0, 30, 0);
controls.minPolarAngle = Math.PI / 22;
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false;
controls.update;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render loop
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
