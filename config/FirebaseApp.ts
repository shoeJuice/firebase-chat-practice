import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
} from "firebase/auth";

import { emulators } from "../firebase.json";

// @ts-ignore
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

process.env.NODE_ENV === "development" &&
  connectFirestoreEmulator(firestoreDB, "localhost", emulators.firestore.port);

auth.setPersistence(browserSessionPersistence);

process.env.NODE_ENV === "development" &&
  connectAuthEmulator(auth, "http://localhost:" + emulators.auth.port);

/**
 * Retrieve the Firestore instance for the current Firebase app. Note,
 * if the current app is being tested on a local server, the instance
 * will be connected to a local Firestore emulator. Use the config file
 * to set up the address for the Firestore Emulator.
 *
 * @returns {Firestore} The Firestore service for the current Firebase app.
 */
export const getFirestoreDB = () => {
  return firestoreDB;
};

/**
 * Retrieve the Authentication instance for the current Firebase app. Note,
 * if the current app is being tested on a local server, the instance
 * will be connected to a local Authentication emulator. Use the config file
 * to set up the address for the Authentication Emulator.
 *
 * @returns {Auth} The Authentication service for the current Firebase app.
 */
export const getFirebaseAuth = () => {
  return auth;
};

export const provider = new GoogleAuthProvider();
