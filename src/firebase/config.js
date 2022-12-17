// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArPwub1C64UWnhs6o9j18lE0O_JgCJckM",
    authDomain: "react-journal-d2bed.firebaseapp.com",
    projectId: "react-journal-d2bed",
    storageBucket: "react-journal-d2bed.appspot.com",
    messagingSenderId: "563305068478",
    appId: "1:563305068478:web:20e78f607ce6553af12bef"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); // --> Funcionalidades de Autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); // --> Configuracion de la base de datos
