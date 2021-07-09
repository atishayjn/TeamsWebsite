import firebase from "firebase";

// Firebase Configurations
let firebaseConfig = {
  apiKey: "AIzaSyDJGpwBgePelbOJlXh4Chd--4Rksf6HWDY",
  authDomain: "crew-58cfb.firebaseapp.com",
  projectId: "crew-58cfb",
  storageBucket: "crew-58cfb.appspot.com",
  messagingSenderId: "197315189699",
  appId: "1:197315189699:web:eff0de85e7a47074ecbb76",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
