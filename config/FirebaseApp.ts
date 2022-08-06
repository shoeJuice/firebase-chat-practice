import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// @ts-ignore
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

export default initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();