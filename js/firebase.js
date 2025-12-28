// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYWk16O1PhSWda5eCWhSmf-_kG_xSKB-E",
  authDomain: "siget-ifpa.firebaseapp.com",
  projectId: "siget-ifpa",
  storageBucket: "siget-ifpa.firebasestorage.app",
  messagingSenderId: "601260622916",
  appId: "1:601260622916:web:d6ef3ef5ecedc5465b2811",
  measurementId: "G-HL7DMHMMZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
