import { initializeApp, FirebaseApp } from "firebase/app";
import {
  initializeApp as initializeAdminApp,
  auth as getAdminAuth,
} from "firebase-admin";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Purely for testing purposes, since Jest doesn't support modules yet.
const { emulators } = require("../firebase.json");

// @ts-ignore
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

process.env.NODE_ENV === "development" &&
  connectFirestoreEmulator(firestoreDB, "localhost", emulators.firestore.port);

process.env.NODE_ENV === "development" &&
  connectAuthEmulator(auth, "http://localhost:" + emulators.auth.port);
  
auth.setPersistence(browserSessionPersistence);

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

export const providers = {
  Google: new GoogleAuthProvider(),
  Github: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
};

// @ts-ignore
export const firebaseAdminConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG);
