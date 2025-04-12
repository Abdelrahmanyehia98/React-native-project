// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC940IWlniuTeise8dSB-wmLzR9G5OpEL8",
  authDomain: "realstate-bf6c7.firebaseapp.com",
  projectId: "realstate-bf6c7",
  storageBucket: "realstate-bf6c7.firebasestorage.app",
  messagingSenderId: "125989558156",
  appId: "1:125989558156:web:31ac1c125e3fc0cf0228a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;