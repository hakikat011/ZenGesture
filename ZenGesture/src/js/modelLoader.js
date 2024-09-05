// src/js/modelLoader.js
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
