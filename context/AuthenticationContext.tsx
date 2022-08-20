import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth, providers } from "../config/FirebaseApp";
import nookies from 'nookies';

const AuthenticationContext = createContext<any>({});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isSubscribed = onAuthStateChanged(getFirebaseAuth(), (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    setLoading(false);
  }, []);

  const login = async (provider: any) => {
    return await signInWithPopup(getFirebaseAuth(), provider).catch(
      (error) => {
        console.log(error.message);
      }
    );
  };

  const loginWithGoogle = async () => {
    return await signInWithPopup(getFirebaseAuth(), providers.Google)
      .then(async(credentials) => {
        const token = await credentials.user.getIdToken();
        nookies.set(undefined, 'token', token, {path: '/'});
        router.push("/rooms");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(getFirebaseAuth()).then(() => {
      nookies.destroy(undefined, 'token', {path: '/'});
      router.push("./");
    })
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, login, logout, loginWithGoogle }}
    >
      {loading ? null : children}
    </AuthenticationContext.Provider>
  );
};
