import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "./firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Google Sign In
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async ( name,email , pass) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth , email , pass)
       await updateProfile(result.user , {
        displayName: name
       })
       return result.user
    } catch (error) {
      throw error
    }
  }

  const handleLogin = (email ,pass) => {
    try {
      setLoading(true)
      return signInWithEmailAndPassword(auth , email , pass)
    } catch (error) {
      throw error
    }
  }

  // Log Out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const data = {
    user ,
    loading ,
    googleSignIn,
    setUser,
    logOut,
    handleLogin , 
    handleRegister
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;