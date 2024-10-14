import axios from "./axios.js";

export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const updateRequest = (user) => axios.put("/profile", user);

export const editCartRequest = (data) =>
  axios.put("/checkout/edit-cart", { products: data });

export const getCartRequest = () => axios.get("/checkout/get-cart");

export const getCheckoutSessionRequest = () =>
  axios.get("/checkout/create-checkout-session");
