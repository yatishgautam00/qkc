// firebase.js
// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdNlO5MefBiPepcx9GFOzHrJgnaxFqMP8",
  authDomain: "crytography.firebaseapp.com",
  projectId: "crytography",
  storageBucket: "crytography.firebasestorage.app",
  messagingSenderId: "225284633894",
  appId: "1:225284633894:web:ae1c7904ac4ea984c03de7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in your app
export { app, db, auth };
