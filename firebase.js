// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// If you're using analytics in web (not usually needed in RN):
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYjToFuVDbnkbEVBHyUPruOzwOgtaeow8",
  authDomain: "app-project-fef04.firebaseapp.com",
  projectId: "app-project-fef04",
  storageBucket: "app-project-fef04.appspot.com", // ✅ fixed .firebasestorage.app -> .appspot.com
  messagingSenderId: "203298090968",
  appId: "1:203298090968:web:acb67d442bcfab9441ccad",
  measurementId: "G-JHBN8R9PZ3"
};

// Initialize Firebase only if no apps are initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// You typically don't use analytics in React Native
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
