import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";

// @ts-ignore
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
export default app;
export const firebaseAuth = auth;
export const provider = new GoogleAuthProvider();