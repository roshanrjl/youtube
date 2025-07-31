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

export const toggleCommentLike= (commentId)=>{
  return apiClient.get(`like/toggle/comment/${commentId}`)
}
export const toggleTweetLike= (tweetId)=>{
  return apiClient.get(`like/toggle/Tweet/${tweetId}`)
}
export const toggleVideoLike= (videoId)=>{
  return apiClient.get(`like/toggle/video/${videoId}`)
}
export const getLikedVideos= ()=>{
  return apiClient.get("like/")
}
