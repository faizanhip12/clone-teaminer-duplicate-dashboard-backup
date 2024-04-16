
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfFoN-u9BQ7pxm8nAnE-Mz7RXPQlEiDMs",
  authDomain: "notification-d4d56.firebaseapp.com",
  projectId: "notification-d4d56",
  storageBucket: "notification-d4d56.appspot.com",
  messagingSenderId: "936449005846",
  appId: "1:936449005846:web:4705edc1ff35eb58d69837"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
