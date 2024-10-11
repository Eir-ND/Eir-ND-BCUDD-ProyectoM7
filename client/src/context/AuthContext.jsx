import { createContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const register = async (formData) => {
    try {
      setErrors([]);

      const result = await registerRequest(formData);
      setUser(result.data);
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const login = async (formData) => {
    try {
      setErrors([]);

      const result = await loginRequest(formData);
      setUser(result.data);
      console.log(result.data);

      setIsAuthenticated(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);

        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, register, login, loading, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
