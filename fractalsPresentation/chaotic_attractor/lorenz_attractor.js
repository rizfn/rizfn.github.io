import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Lorenz attractor parameters
const sigma = 10;
const rho = 28;
const beta = 8 / 3;

// Initial conditions
let x = 0.1, y = 0, z = 0;

// Time step
const dt = 0.01;

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(52.06301, -64.77522, 31.76629); // Adjusted camera position
// camera.lookAt(0, 0, 25); // Adjusted camera look-at point

// Create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Increase resolution
document.body.appendChild(renderer.domElement);

// Create the geometry and material for the line
const geometry = new THREE.BufferGeometry();
const material = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });

// Create an array to store the points
const points = [];

// Function to update the Lorenz attractor
function updateLorenz() {
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;

    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    points.push(x, y, z);

    if (points.length > 30000) {
        points.splice(0, 3);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
}

// Create the line object and add it to the scene
const line = new THREE.Line(geometry, material);
scene.add(line);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 25); // Hardcoded center

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    updateLorenz();
    controls.update();

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure resolution is updated on resize
});

// Start the animation
animate();