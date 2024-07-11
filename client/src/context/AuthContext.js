import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [paymentData, setPaymentData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = async () => {
    try {
      const response = await axios.get("/user/checkUserAuth", { withCredentials: true });
      if (response.status === 200 && response.data) {
        setUser(response.data);
        setIsAuthenticated(true)
      } else {
        setUser(null);
        setIsAuthenticated(false)
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  const login = (userParam) => {
    setUser(userParam);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, setIsAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
