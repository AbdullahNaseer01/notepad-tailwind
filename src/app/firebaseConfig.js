// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl_ShoJcK3gfyrbyQVgOslNeixNNyBmWI",
  authDomain: "task-management-app-16ef6.firebaseapp.com",
  projectId: "task-management-app-16ef6",
  storageBucket: "task-management-app-16ef6.appspot.com",
  messagingSenderId: "328893447976",
  appId: "1:328893447976:web:2f164d9d82722974cb9a1d",
  measurementId: "G-ZGBT8W3HG6"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
const analytics = getAnalytics(app);