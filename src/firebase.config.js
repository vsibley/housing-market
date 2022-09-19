import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrqrjjWSdzrhPM5gZmzjT28GCdkuLfeeo",
  authDomain: "housing-listings-app.firebaseapp.com",
  projectId: "housing-listings-app",
  storageBucket: "housing-listings-app.appspot.com",
  messagingSenderId: "259983615512",
  appId: "1:259983615512:web:7a445f0a4087687e5a056d",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
