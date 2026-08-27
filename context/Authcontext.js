"use client"
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // user == accessToken
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // get toekn from local storage.
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  // set token into local storage.
  const setToken = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  useEffect(() => {
    setUser(getToken());
    setLoading(false);
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setToken, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
