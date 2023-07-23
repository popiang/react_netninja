import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWzTEim9ACi4aDN7RJ1jT8nfq-KIBFefI",
    authDomain: "thedojosite-eaf33.firebaseapp.com",
    projectId: "thedojosite-eaf33",
    storageBucket: "thedojosite-eaf33.appspot.com",
    messagingSenderId: "621361853519",
    appId: "1:621361853519:web:3c3f8e206fec4db552263a",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };