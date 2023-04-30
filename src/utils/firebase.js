// Import the functions you need from the SDKs you need
import { initializeApp, database } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNQZy1Nfu79MQEdJOhEbpiepy6sViKNXc",
  authDomain: "socialswap-ba261.firebaseapp.com",
  projectId: "socialswap-ba261",
  storageBucket: "socialswap-ba261.appspot.com",
  messagingSenderId: "289000043610",
  appId: "1:289000043610:web:20c0ef11b0ffa84b3f1463",
  measurementId: "G-NYKTR9PGZ1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDatabase = database();
