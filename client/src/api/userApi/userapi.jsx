import apiClient from "../ApiClient/ApiClinet";
import axios from "axios";


export const registerUser =(formData)=>{
  return apiClient.post('users/register',formData)
}

export const loginUser =(data)=>{
  return apiClient.post('users/login',data,{
    withCredentials:true
  });
};

export const logoutUser =()=>{
  return apiClient.post("users/logout")
}

export const refreshAccessToken = () => {
  return axios.post(
    `${import.meta.env.VITE_SERVER_URI}/users/refresh-token`,
    {},
    { withCredentials: true } // send cookies
  );
};

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
