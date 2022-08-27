import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth, providers } from "../config/FirebaseApp";
import nookies from 'nookies';

const AuthenticationContext = createContext<any>({});

export const useAuthentication = () => useContext(AuthenticationContext);

/**
 * The context provider for the authentication context. Normally,
 * all front-end logic that makes use of the client's authentication state
 * should be placed here.
 */
export const AuthenticationProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Rerendered")
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

  const registerWithEmailAndPassword = async (email: string, password: string, username: string) => {
    return await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
    .then(async(credentials) => {
      let authInstance = getFirebaseAuth();
      const token = await credentials.user.getIdToken();
      onAuthStateChanged(authInstance, (user) => {
        if (user) {
        updateProfile(user, {displayName: username});
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        }
      })
      nookies.set(undefined, 'token', token, {path: '/'});
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const login = async (email: any, password: any) => {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
    .then(async(credentials) => {
      const token = await credentials.user.getIdToken();
      nookies.set(undefined, 'token', token, {path: '/'});
      router.push("/rooms");
    })
    .catch(
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
      router.push("./login");
    })
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, login, logout, loginWithGoogle, roomName, setRoomName, loading, registerWithEmailAndPassword }}
    >
      {loading ? null : children}
    </AuthenticationContext.Provider>
  );
};
