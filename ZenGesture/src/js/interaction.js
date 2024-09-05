// src/js/interaction.js
import { mapRange } from './utils.js';

export function handleInteractions(predictions, scene) {
    if (predictions.length > 0) {
        // Extract the first prediction
        const hand = predictions[0];
        const landmarks = hand.landmarks;

        // Calculate the average X and Y positions of the hand landmarks
        const avgX = landmarks.reduce((sum, point) => sum + point[0], 0) / landmarks.length;
        const avgY = landmarks.reduce((sum, point) => sum + point[1], 0) / landmarks.length;

        // Normalize the hand positions to control the model
        const normX = mapRange(avgX, 0, window.innerWidth, -1, 1);
        const normY = mapRange(avgY, 0, window.innerHeight, 1, -1);

        // Find the first mesh and apply transformations
        scene.traverse((object) => {
            if (object.isMesh) {
                object.rotation.y += normX * 0.1;
                object.rotation.x += normY * 0.1;
            }
        });
    }
}
