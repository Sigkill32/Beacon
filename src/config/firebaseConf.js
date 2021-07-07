import firebase from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBw1oAW2Y1xhrytTDMvdCZNhjmoCLdSAfg",
  authDomain: "chatapp-a619e.firebaseapp.com",
  databaseURL: "https://chatapp-a619e.firebaseio.com",
  projectId: "chatapp-a619e",
  storageBucket: "chatapp-a619e.appspot.com",
  messagingSenderId: "850066423229",
  appId: "1:850066423229:web:70ae9c3a500d5fd0d426d4"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export { db, firebaseAppAuth, providers, withFirebaseAuth, firebaseApp };
