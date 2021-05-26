import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAPjTWrGjwv8hCYC3XE4tU6NwwlGVNuyQ",
  authDomain: "pdm-aula-2021-e8589.firebaseapp.com",
  projectId: "pdm-aula-2021-e8589",
  storageBucket: "pdm-aula-2021-e8589.appspot.com",
  messagingSenderId: "129683323901",
  appId: "1:129683323901:web:618cd8b28c96f9cf9c7794",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
