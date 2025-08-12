import { initializeApp } from "firebase/app";

import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv8HgC15klIbs0u2HNFcx_tHPmrEBIiRg",
  authDomain: "bookhive-a88ac.firebaseapp.com",
  projectId: "bookhive-a88ac",
  storageBucket: "bookhive-a88ac.firebasestorage.app",
  messagingSenderId: "887884562795",
  appId: "1:887884562795:web:aa2c76f5258d6dbaf40c2e",
  measurementId: "G-3KSNMDT7CY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();  // <-- export this
