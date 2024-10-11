import { createContext, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

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
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, register, login, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
