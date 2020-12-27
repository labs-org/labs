import firebase from "firebase/app";
import "firebase/storage";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBkCe1ehB7pHZdr1G6pBF-q7xHQ5NRl7oo",
    authDomain: "labs-7b5d3.firebaseapp.com",
    projectId: "labs-7b5d3",
    storageBucket: "labs-7b5d3.appspot.com",
    messagingSenderId: "235697143911",
    appId: "1:235697143911:web:72f6af61e79f7dcfd194c2",
    measurementId: "G-YS9NZZ1J12"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

const storage = firebase.storage();
export { storage, firebase as default};