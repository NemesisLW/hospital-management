import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDxtc6rXy1zZ136xPxEbY28HSYWCfUvEPM",
  authDomain: "saas-template-2f0e2.firebaseapp.com",
  projectId: "saas-template-2f0e2",
  storageBucket: "saas-template-2f0e2.appspot.com",
  messagingSenderId: "348423932252",
  appId: "1:348423932252:web:475248f2101d82b58b1999",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
