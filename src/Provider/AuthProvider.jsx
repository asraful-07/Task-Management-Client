import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bioDataInfo, setBioDataInfo] = useState({});

  const handleRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const manageProfile = async (name, image) => {
    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });

        setUser((prevUser) => ({
          ...prevUser,
          displayName: name,
          photoURL: image,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // forgot password
  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const handleLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // revived class data and pass
  const handleGetBioDataInfo = (data) => {
    return setBioDataInfo(data);
  };

  const info = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    manageProfile,
    user,
    loading,
    setUser,
    forgotPassword,
    handleLogout,
    handleGetBioDataInfo,
    bioDataInfo,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
