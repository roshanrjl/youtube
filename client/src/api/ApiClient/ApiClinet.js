// src/api/apiClient.js
import axios from "axios";
import { Localstorage } from "../../utils/index";
import { login, logout } from "../../redux/authSlice";
import { refreshAccessToken } from "../userApi/userapi"; // plain axios call

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true, // send cookies
  timeout: 120000,
});

// -------------------- REQUEST INTERCEPTOR --------------------
// Attach access token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = Localstorage.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- RESPONSE INTERCEPTOR --------------------
// Auto-refresh token on 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token API (plain axios)
        const res = await refreshAccessToken();
        const newAccessToken = res.data.accessToken;

        // Save to localStorage
        Localstorage.set("accessToken", newAccessToken);

        // Update Redux auth state
        store.dispatch(
          login.fulfilled({ user: Localstorage.get("user"), token: newAccessToken })
        );

        // Update headers for retry
        apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return apiClient(originalRequest);
      } catch (err) {
        // Refresh failed → log out user
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
