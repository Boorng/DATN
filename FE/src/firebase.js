// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoHMrwz64IWOStOgXa0dZwXWoP5W98xz0",
    authDomain: "testdatn-c3ffd.firebaseapp.com",
    projectId: "testdatn-c3ffd",
    storageBucket: "testdatn-c3ffd.appspot.com",
    messagingSenderId: "722627106589",
    appId: "1:722627106589:web:1b0052e13df6ad614d33f4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
