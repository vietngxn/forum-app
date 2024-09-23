import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLH1suR9p8r0KprRW1lEDwGiDbhGsAxSc",
    authDomain: "iuh-forum.firebaseapp.com",
    projectId: "iuh-forum",
    storageBucket: "iuh-forum.appspot.com",
    messagingSenderId: "404170284138",
    appId: "1:404170284138:web:f7daec61fd6cbd47c67e13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
