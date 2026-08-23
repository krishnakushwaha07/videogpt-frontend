import api from "@/axios/api";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false); // VERY IMPORTANT
      }
    };

    getUser();
  }, []);

  const logoutUser = async () => {
    try {
      await api.get("/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
