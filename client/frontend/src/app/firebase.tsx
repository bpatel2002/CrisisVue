import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFmOeB3cJ7QxtTJ0F44SNaREoPGtdeG38",
    authDomain: "mass-shooting-digital-library.firebaseapp.com",
    projectId: "mass-shooting-digital-library",
    storageBucket: "mass-shooting-digital-library.appspot.com",
    messagingSenderId: "808156494521",
    appId: "1:808156494521:web:b0d3e5413186fd3075f968",
    measurementId: "G-K2MNBWG96H"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export {auth};