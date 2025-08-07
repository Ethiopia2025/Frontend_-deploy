// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqBhUGmGMdp9jOG3StYo2MfKN9CGUIXP8",
  authDomain: "ethiopia-e67f1.firebaseapp.com",
  projectId: "ethiopia-e67f1",
  storageBucket: "ethiopia-e67f1.firebasestorage.app",
  messagingSenderId: "1092797158042",
  appId: "1:1092797158042:web:a2eb08966a2849f5998523",
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


