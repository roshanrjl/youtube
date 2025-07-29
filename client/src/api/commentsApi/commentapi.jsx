import axios from "axios";
import { LocalStorage } from "../../utils";

// Create Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Set token in request header automatically
apiClient.interceptors.request.use(
  function (config) {
    const token = LocalStorage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);