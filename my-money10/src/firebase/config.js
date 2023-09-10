import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDF4FWbaNi_VSzMTseUiYXClMgbROpthfQ",
    authDomain: "mymoney-a99cf.firebaseapp.com",
    projectId: "mymoney-a99cf",
    storageBucket: "mymoney-a99cf.appspot.com",
    messagingSenderId: "1011605127668",
    appId: "1:1011605127668:web:7b444bdb716c7c332f79a1",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
