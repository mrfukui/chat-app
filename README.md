# chat-app

## Description:

This is a chat app built for mobile devices using React Native. Users will be able to use a chat interface, share images, share location, and share audio.

## Screenshots of Application:

![Screenshots](<img/Screenshot%20(225).png><img/Screenshot%20(228).png>)

## Features:

- Users can enter a username and choose a background color for their chat screen
- users can send and receive messages in real time
- Users can look at messages offline
- Users can send and receive text, images, location, and audio

## Technologies Used:

- HTML5
- JavaScript
- React Native
- Expo
- Google Firestore Database

## Get Started:

### 1. Clone the repository with the command "git clone http://github.com/mrfukui/chat-app.git" in your chosen IDE

### 2. Navigate to the project with the command "cd chat-app"

### 3. Install the Expo CLI globally with the command "npm install -g expo-cli" if Expo is not already installed

### 4. Run the command "npm install" to install the required dependencies

### 5. Database configuration

- If you do not already have one, create a google account. Navigate to the Firebase website and click on "Get Started" to create a new project.
- Create the project with the default settings and a name of your choosing.
- Go to the dashboard and on the left side of the screen click "Build" and then "Firestore Database."
- Create a database and choose "Start in production mode." Continue with the default settings.
- Within the database dashboard, click "Rules" and change "false" to "true" in the code
- Back in the project dashboard, click on the settings button in the top left corner and go to "project settings." Then under the "general" tab click on the Firestore for Web button. You will be presented with code for the firebase configuration. Copy the constant "firebaseConfig" code to replace the "firebaseConfig" code within the chat-app in the "App.js" file.
- Within the project dashboard, click on "Authentication" and then the "sign-in method" tab. Enable Anonymous sign ins.
- Within the project dashboard, click on "Storage" and then click "Start now." Then once again in the "rules" tab, change "false" to "true" in the code

### 6. Create an expo account

### 7. Download the expo app onto your mobile device or download Android Studio to simulate the app

### 8. In your IDE's terminal run the command "npm run start" and either scan the QR code with your mobile device or press "a" to open the app in the simulated android that is open in your Android Studio

## Acknowledgments:

-CareerFoundry for guidance in building this app.
