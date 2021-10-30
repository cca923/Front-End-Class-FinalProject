import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCACYq_Rhagu_xH3Y4YTVmmUtcALouG-zk",
  authDomain: "re-live-resume-your-life.firebaseapp.com",
  projectId: "re-live-resume-your-life",
  storageBucket: "re-live-resume-your-life.appspot.com",
  messagingSenderId: "98825307413",
  appId: "1:98825307413:web:da951dba76de127714151c",
  measurementId: "G-P5ZR9TC76P",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
