import { createContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const register = async (formData) => {
    try {
      const result = await registerRequest(formData);
      setUser(result.data);
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <AuthContext.Provider value={{ user, register, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
