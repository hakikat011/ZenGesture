// src/js/scene.js
import * as THREE from 'three';

export function initScene() {
    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Adjust scene and camera when window is resized
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add lighting
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

        // Get hand pose predictions
        const predictions = await updateHandPose();

        // Handle interactions between hand poses and 3D objects
        handleInteractions(predictions, scene);

        // Render the scene
        renderer.render(scene, camera);
    };
    animateLoop();
}
