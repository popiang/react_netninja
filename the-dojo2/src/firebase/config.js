import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChYWRjb3U7YAlysFqPn6z-d72qIsrMfaM",
    authDomain: "thedojosite2-f1813.firebaseapp.com",
    projectId: "thedojosite2-f1813",
    storageBucket: "thedojosite2-f1813.appspot.com",
    messagingSenderId: "984648711722",
    appId: "1:984648711722:web:d1d348070807d227398d53",
};

//* init firebase
firebase.initializeApp(firebaseConfig);

//* init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//* timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
