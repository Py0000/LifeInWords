// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firbase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZsl-Mmols7N4xW41FEnG27IH8q-h-YWo",
  authDomain: "lifeinwords-41758.firebaseapp.com",
  projectId: "lifeinwords-41758",
  storageBucket: "lifeinwords-41758.appspot.com",
  messagingSenderId: "790498091330",
  appId: "1:790498091330:web:a466888f74649d3a3768db",
  measurementId: "G-JXYBMCHYS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize the authentication service provided by firebase
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Initialize the firestore database 
export const db = getFirestore(app);
