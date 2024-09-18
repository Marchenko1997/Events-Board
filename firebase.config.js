import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyAUyESn_yo7yvQbksNbQ5_ITzN3K01I9wY",
  authDomain: "events-cc686.firebaseapp.com",
  databaseURL:
    "https://events-cc686-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "events-cc686",
  storageBucket: "events-cc686.appspot.com",
  messagingSenderId: "473403008352",
  appId: "1:473403008352:web:40ae14397bcc00b1826a05",
  measurementId: "G-9GFD14Y5MG",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

