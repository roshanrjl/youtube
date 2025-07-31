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

export const getVideoComments = (videoId)=>{
 return  apiClient.get(`comment/${videoId}`)
}

export const addComment = (videoId)=>{
return apiClient.post(`comment/${videoId}`)
}

export const updateComment = (commentId)=>{
  return apiClient.patch(`comment/${commentId}`)
}

export const deleteComment = (commentId)=>{
  return apiClient.delete(`comment/${commentId}`)
}




















