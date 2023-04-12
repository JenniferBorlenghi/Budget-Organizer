// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAbrBMdG-Je3FoUqNz7TqsuHKXAUIN6qM",
  authDomain: "budget-organizer-11039.firebaseapp.com",
  projectId: "budget-organizer-11039",
  storageBucket: "budget-organizer-11039.appspot.com",
  messagingSenderId: "174721444856",
  appId: "1:174721444856:web:c60552ef0a6559049b440d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// db from firestore
export const db = getFirestore(app);
