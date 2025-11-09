import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEOL_pz2w5Qbdaejm0ZkKNah3GUvg9MEw",
    authDomain: "e-commerce-auth-906d6.firebaseapp.com",
    projectId: "e-commerce-auth-906d6",
    storageBucket: "e-commerce-auth-906d6.firebasestorage.app",
    messagingSenderId: "39815165873",
    appId: "1:39815165873:web:da72bf3646743ebb22af90"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};


export const googleSignOut = () => {
    return signOut(auth);
};