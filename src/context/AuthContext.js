
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

import { isAllowedUser } from "../utils/domainValidation";

import {
  signInWithGoogle,
  signOutFromGoogle,
} from "../auth/googleAuth";

const AuthContext = createContext(null);

const DOMAIN_ERROR =
  "Access restricted. Please login using your official domain email.";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          if (currentUser && !isAllowedUser(currentUser)) {
            await signOut(auth);
            await signOutFromGoogle();

            if (isMounted) {
              setUser(null);
            }

            return;
          }

          if (isMounted) {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Authentication error:", error);

          if (isMounted) {
            setUser(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const login = async () => {
    const loggedUser = await signInWithGoogle();

    if (!isAllowedUser(loggedUser)) {
      await signOut(auth);
      await signOutFromGoogle();

      throw new Error(DOMAIN_ERROR);
    }

    setUser(loggedUser);

    return loggedUser;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await signOutFromGoogle();

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
