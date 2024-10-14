import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});

export default instance;
