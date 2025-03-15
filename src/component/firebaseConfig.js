// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsiCNxd-FVwe0SqSfQrETTwQH5kLkOwT4",
  authDomain: "viober-3e7c4.firebaseapp.com",
  projectId: "viober-3e7c4",
  storageBucket: "viober-3e7c4.firebasestorage.app",
  messagingSenderId: "224960498346",
  appId: "1:224960498346:web:f953442cf565785f159ed3",
  measurementId: "G-3Y85HS5L7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };