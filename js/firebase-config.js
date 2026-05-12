import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5GTITJSsFLcXKgzxg6EFzL15WxEw7zGc",
  authDomain: "the-yellow-roar.firebaseapp.com",
  projectId: "the-yellow-roar",
  storageBucket: "the-yellow-roar.firebasestorage.app",
  messagingSenderId: "162222881156",
  appId: "1:162222881156:web:0c525583bd562f978005d1",
  measurementId: "G-G8NP6SXG6M"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

window.firebaseDb = db;
console.log("Firebase Firestore initialized");
