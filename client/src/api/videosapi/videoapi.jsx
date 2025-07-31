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

export const getAllVideos = () => {
  return apiClient.get("video/");
};

export const publishAVideo = () => {
  return apiClient.post("video/");
};

export const getVideoById = (videoId) => {
  return apiClient.post(`video/${videoId}`);
};

export const updateVideo = (videoId) => {
  return apiClient.patch(`video/${videoId}`);
};

export const deleteVideo = () => {
  return apiClient.delete();
};

export const togglePublishStatus = (videoId) => {
  return apiClient.get(`video/${videoId}`);
};
