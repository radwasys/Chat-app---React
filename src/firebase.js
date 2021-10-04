import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8118_Zy0JuU8dvcrnFG2IzO3bGrXW_Pk",
  authDomain: "react-chat-app-5b4a9.firebaseapp.com",
  databaseURL:
    "https://react-chat-app-5b4a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-chat-app-5b4a9",
  storageBucket: "react-chat-app-5b4a9.appspot.com",
  messagingSenderId: "514628091404",
  appId: "1:514628091404:web:5fe732a5cba61d053d7829",
  measurementId: "G-HNG2P46522",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
