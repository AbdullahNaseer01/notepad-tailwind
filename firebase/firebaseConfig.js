// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl_ShoJcK3gfyrbyQVgOslNeixNNyBmWI",
  authDomain: "task-management-app-16ef6.firebaseapp.com",
  projectId: "task-management-app-16ef6",
  storageBucket: "task-management-app-16ef6.appspot.com",
  messagingSenderId: "328893447976",
  appId: "1:328893447976:web:2f164d9d82722974cb9a1d",
  measurementId: "G-ZGBT8W3HG6"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const auth = getAuth(app)
// const analytics = getAnalytics(app);