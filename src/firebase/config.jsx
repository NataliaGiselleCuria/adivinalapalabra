// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfnkksp4hIjT9jMXQQm8pVR6RR0FAVpLM",
  authDomain: "adivina-la-palabra-673fa.firebaseapp.com",
  projectId: "adivina-la-palabra-673fa",
  storageBucket: "adivina-la-palabra-673fa.appspot.com",
  messagingSenderId: "351762128864",
  appId: "1:351762128864:web:6f06dbca7009788629d585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

