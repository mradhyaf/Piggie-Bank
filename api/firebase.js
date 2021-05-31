import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlTZSYfpZXxNTFso4-qfs9x2ZtHdZyj9c",
  authDomain: "the-high-ground.firebaseapp.com",
  databaseURL: "https://the-high-ground-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-high-ground",
  storageBucket: "the-high-ground.appspot.com",
  messagingSenderId: "568942251304",
  appId: "1:568942251304:web:b1704840076ff23a91141d",
  measurementId: "G-7X1DZF51PT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;