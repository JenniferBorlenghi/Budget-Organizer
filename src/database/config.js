// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR8ireBdudmQLOV0tcealgSuIg_Whm9TM",
  authDomain: "budget-portfolio.firebaseapp.com",
  projectId: "budget-portfolio",
  storageBucket: "budget-portfolio.appspot.com",
  messagingSenderId: "296845566403",
  appId: "1:296845566403:web:36633bc91faba5d71a5d76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// db from firestore
export const db = getFirestore(app);
