// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzCiqRxeYVxyDhHxt6VGwFP_QPZioUJV8",
    authDomain: "shop2-a65de.firebaseapp.com",
    databaseURL: "https://shop2-a65de-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shop2-a65de",
    storageBucket: "shop2-a65de.appspot.com",
    messagingSenderId: "20022224924",
    appId: "1:20022224924:web:47c18f1567a378b56417d9"
  };

// Initialize Firebase
//export const firestore = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
//export const firestore = firebase.firestore();