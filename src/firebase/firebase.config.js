// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB80EZijrFtkVDLTWs3-Ua3Z01_0YbpLE",
  authDomain: "dragon-news-auth-bbbef.firebaseapp.com",
  projectId: "dragon-news-auth-bbbef",
  storageBucket: "dragon-news-auth-bbbef.firebasestorage.app",
  messagingSenderId: "591243701039",
  appId: "1:591243701039:web:be52d0d933413283f5cfda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
