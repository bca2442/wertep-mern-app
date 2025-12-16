// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // (Optional)

// Your web app's Firebase configuration
// NOTE: Replace the placeholders with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* * IMPORTANT: Firebase Storage Rules (Required for security)
 * * Go to the 'Storage' section in your Firebase console and set the rules 
 * to allow read/write access only if the file size is within limits (e.g., 2MB)
 * * Example Rules:
 * rules_version = '2';
 * service firebase.storage {
 * match /b/{bucket}/o {
 * match /{allPaths=**} {
 * allow read;
 * // Allow write if the user is authenticated AND the file size is under 2MB
 * allow write: if request.resource.size < 2 * 1024 * 1024 
 * && request.resource.contentType.matches('image/.*');
 * }
 * }
 * }
*/