import firebase from "firebase";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7fBkFKqGOYEQEwaMrYMRohPHuzW6ZEI8",
  authDomain: "cooking-ninja-b9eab.firebaseapp.com",
  projectId: "cooking-ninja-b9eab",
  storageBucket: "cooking-ninja-b9eab.appspot.com",
  messagingSenderId: "1098094846867",
  appId: "1:1098094846867:web:285e6b7b41dd77f89c7e66",
  measurementId: "G-FWJ4PWE331"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
