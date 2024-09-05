const fs = require('fs');
const path = require('path');

// Utility function to create directories if they don't exist
function createDirIfNotExist(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }
}

// Utility function to create files with content
function createFile(filePath, content) {
    fs.writeFileSync(filePath, content.trim());
    console.log(`File created: ${filePath}`);
}

// Project structure creation
function setupProject() {
    // Define directories
    const directories = [
        'public',
        'public/assets',
        'src/js',
    ];

    // Create directories
    directories.forEach((dir) => createDirIfNotExist(dir));

    // Define files and their content
    const files = {
        'public/index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Hand Pose Recognition</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div id="container"></div>
    <video id="video" autoplay playsinline style="display: none;"></video>
    <script src="../src/js/app.js" type="module"></script>
</body>
</html>
        `,
        'public/style.css': `
body {
    margin: 0;
    overflow: hidden;
    font-family: Arial, sans-serif;
    background-color: #000;
}

#container {
    width: 100vw;
    height: 100vh;
    position: relative;
}

canvas {
    display: block;
}
        `,
        'src/js/app.js': `
import { initScene, animate } from './scene.js';
import { initHandPose, updateHandPose } from './handpose.js';
import { loadModels } from './modelLoader.js';
import { handleInteractions } from './interaction.js';

const scene = initScene();
const handPose = initHandPose();

loadModels(scene).then(() => {
    animate(scene, handPose, updateHandPose, handleInteractions);
});
        `,
        'src/js/handpose.js': `
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';

let model = null;
let video = null;

export async function initHandPose() {
    model = await handpose.load();
    console.log('Handpose model loaded.');

    video = document.getElementById('video');
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;

    return model;
}

export async function updateHandPose() {
    if (model && video.readyState === 4) {
        const predictions = await model.estimateHands(video);
        if (predictions.length > 0) {
            console.log(predictions);
        }
        return predictions;
    }
    return [];
}
        `,
        'src/js/scene.js': `
import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    scene.camera = camera;
    scene.renderer = renderer;

    return scene;
}

export function animate(scene, handPose, updateHandPose, handleInteractions) {
    const renderer = scene.renderer;
    const camera = scene.camera;

    const animateLoop = async () => {
        requestAnimationFrame(animateLoop);

        const predictions = await updateHandPose();

        handleInteractions(predictions, scene);

        renderer.render(scene, camera);
    };
    animateLoop();
}
        `,
        'src/js/modelLoader.js': `
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadModels(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
            (gltf) => {
                gltf.scene.position.set(0, 0, 0);
                scene.add(gltf.scene);
                console.log('3D model loaded.');
                resolve();
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the model.', error);
                reject(error);
            }
        );
    });
}
        `,
        'src/js/interaction.js': `
import { mapRange } from './utils.js';

export function handleInteractions(predictions, scene) {
    if (predictions.length > 0) {
        const hand = predictions[0];
        const landmarks = hand.landmarks;

        const avgX = landmarks.reduce((sum, point) => sum + point[0], 0) / landmarks.length;
        const avgY = landmarks.reduce((sum, point) => sum + point[1], 0) / landmarks.length;

        const normX = mapRange(avgX, 0, window.innerWidth, -1, 1);
        const normY = mapRange(avgY, 0, window.innerHeight, 1, -1);

        scene.traverse((object) => {
            if (object.isMesh) {
                object.rotation.y += normX * 0.1;
                object.rotation.x += normY * 0.1;
            }
        });
    }
}
        `,
        'src/js/utils.js': `
export function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
        `,
    };

    // Create files with content
    Object.entries(files).forEach(([filePath, content]) => {
        createFile(filePath, content);
    });

    console.log('Project setup complete.');
}

// Run the setup
setupProject();
