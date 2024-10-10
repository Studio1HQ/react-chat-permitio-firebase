import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase auth persistence set to localStorage.");
  })
  .catch((error) => {
    console.error("Error setting Firebase persistence:", error);
  });
