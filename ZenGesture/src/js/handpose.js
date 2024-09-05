// src/js/handpose.js
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';

let model = null;
let video = null;

export async function initHandPose() {
    // Load the handpose model from TensorFlow.js
    model = await handpose.load();
    console.log('Handpose model loaded.');

    // Setup webcam video feed
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
