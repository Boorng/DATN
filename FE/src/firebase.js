// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSPr7FJ692WjdggB6-WAsJtrsCSJbuing",
    authDomain: "datn-57e13.firebaseapp.com",
    projectId: "datn-57e13",
    storageBucket: "datn-57e13.appspot.com",
    messagingSenderId: "98968924911",
    appId: "1:98968924911:web:c6e515a991343be935e11a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
