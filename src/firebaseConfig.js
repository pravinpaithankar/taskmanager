// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; // Import getStorage from firebase/storage


// Your Firebase configuration (replace with your Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyC6PqvOVSpsoRNP3WRFWcHCEgYfKSXBWlw",
    authDomain: "task-manager-ec0f6.firebaseapp.com",
    projectId: "task-manager-ec0f6",
    storageBucket: "task-manager-ec0f6.appspot.com",
    messagingSenderId: "37834653088",
    appId: "1:37834653088:web:dcb994db6c16b110db78c5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
