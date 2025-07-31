import axios from "axios";
import { Localstorage } from "../../utils";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = Localstorage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const registerUser =(formData)=>{
  return apiClient.post('users/register',formData)
}

export const loginUser =()=>{
  return apiClient.post("users/login")
}

export const logoutUser =()=>{
  return apiClient.post("users/logout")
}

export const refreshAccessToken =()=>{
  return apiClient.post("users/refresh-token")
}

export const changeCurrentPassword =()=>{
  return apiClient.post("users/change-password")
}

export const getCurrentUser =()=>{
  return apiClient.get("users/current-user")
}

export const updateAccountDetails =()=>{
  return apiClient.patch("users/update-account")
}

export const updateUserAvatar =()=>{
  return apiClient.patch("users/avatar")
}

export const updateUserCoverImage =()=>{
  return apiClient.patch("users/cover-image")
}

export const getUserChannelProfile =(username)=>{
  return apiClient.get(`users/c/${username}`)
}

export const getWatchHistory =()=>{
  return apiClient.get("users/history")
}
