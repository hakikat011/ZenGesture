// src/js/app.js
import { initScene, animate } from './scene.js';
import { initHandPose, updateHandPose } from './handpose.js';
import { loadModels } from './modelLoader.js';
import { handleInteractions } from './interaction.js';

// Initialize Three.js Scene
const scene = initScene();

// Initialize Hand Pose Recognition
const handPose = initHandPose();

// Load 3D Models
loadModels(scene).then(() => {
    // Start Animation Loop
    animate(scene, handPose, updateHandPose, handleInteractions);
});
