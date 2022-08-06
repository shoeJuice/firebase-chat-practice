import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
import { auth, provider } from "../config/FirebaseApp"

const AuthenticationContext = createContext<any>({});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
        const isSubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
            } else {
                setUser(null);
            }
        })
        setLoading(false);
    }, []);

    const login = () => {
        return signInWithPopup(auth, provider).catch(error => {
            console.log(error.message);
        })
    }

    const logout = async() => {
        setUser(null);
        await signOut(auth);
    }

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthenticationContext.Provider>
  );
};