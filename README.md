

# ZenGesture

**ZenGesture** is a web-based application that integrates hand pose recognition with Three.js for interactive 3D experiences. The project uses TensorFlow.js's Handpose model to detect and track hand gestures in real-time, allowing users to interact with 3D models through simple hand movements.

![starwars](https://github.com/user-attachments/assets/7fb0f638-b0f3-4c97-8ec4-7d25302d9518)



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

## Features

- **Real-Time Hand Pose Recognition:** Uses TensorFlow.js to detect hand gestures through a webcam.
- **Interactive 3D Objects:** Allows users to manipulate and interact with 3D models via hand gestures.
- **Chill Vibes:** ZenGesture offers a smooth, relaxed user experience, inspired by the calmness of Jedi-like gestures.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/ZenGesture.git
   cd ZenGesture
   ```

2. **Install Dependencies:**

   Install the necessary packages using npm:

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   Start the development server using Parcel:

   ```bash
   npm start
   ```

   This will open the project in your default browser at `http://localhost:1234`.

4. **Build for Production:**

   To create a production build, use the following command:

   ```bash
   npm run build
   ```

## Usage

Once the project is running:

- **Hand Pose Detection:** The app uses your webcam to detect and track hand poses in real-time.
- **3D Model Interaction:** Use hand gestures to rotate, move, or scale 3D models.

### Keyboard Shortcuts

- Press `R` to reset the scene.
- Use mouse controls to zoom and pan (if enabled).

## Customization

- **Adding New Models:** You can replace or add 3D models by updating the `modelLoader.js` file. Place your 3D models in the `public/assets` folder and update the file path.
- **Modifying Hand Interactions:** You can adjust how hand gestures interact with the 3D models by editing `interaction.js`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Enjoy your experience with **ZenGesture**—feel the calm and power of gesture-based control!
