import { createContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  updateRequest,
  editCartRequest,
  getCartRequest,
  getCheckoutSessionRequest,
  // getUserRequest,
} from "../api/auth";
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

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const update = async (user) => {
    try {
      setErrors([]);

      await updateRequest(user);
      // setUser(result.data);
      // return result;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  // const findOne = async (id) => {
  //   try {
  //     const result = await getUserRequest(id);
  //     return result.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const editCart = async (data) => {
    try {
      const result = await editCartRequest(data);

      await getCart();

      return result.data.msg;
    } catch (error) {
      console.log(error);

      return;
    }
  };

  const getCart = async () => {
    try {
      const result = await getCartRequest();
      console.log(result.data);
    } catch (error) {
      console.log(error);

      return;
    }
  };

  const getCheckoutSession = async () => {
    const result = await getCheckoutSessionRequest();
    console.log(result.data);

    return;
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
      value={{
        user,
        register,
        login,
        loading,
        logout,
        update,
        editCart,
        getCart,
        // findOne,
        isAuthenticated,
        getCheckoutSession,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
