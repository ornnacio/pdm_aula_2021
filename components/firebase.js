import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMTSiv5DDRG79qp8zh1HJr3G0siuw7Pzg",
  authDomain: "exercicios-pdm.firebaseapp.com",
  projectId: "exercicios-pdm",
  storageBucket: "exercicios-pdm.appspot.com",
  messagingSenderId: "110892933474",
  appId: "1:110892933474:web:24802a41636c077e330c3b"
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
